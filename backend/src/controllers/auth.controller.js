import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";

const cookieOptions = {
  httpOnly: false,
  sameSite: "lax",
  secure: false
};

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt
});

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya esta registrado"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const userSaved = await new User({ username, email, password: passwordHash }).save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, cookieOptions);
    res.json(publicUser(userSaved));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Contrasena incorrecta" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, cookieOptions);
    res.json(publicUser(userFound));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (_req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(publicUser(userFound));
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });
    res.json(publicUser(userFound));
  });
};
