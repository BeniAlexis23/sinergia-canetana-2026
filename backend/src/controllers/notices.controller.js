import Notice from "../models/notice.model.js";

export const getPublicNotices = async (_req, res) => {
  const notices = await Notice.find().sort({ date: -1 });
  res.json(notices);
};

export const getPublicNotice = async (req, res) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) return res.status(404).json({ message: "Noticia no encontrada" });
  res.json(notice);
};

export const getAdminNotices = async (req, res) => {
  const notices = await Notice.find({ user: req.user.id }).sort({ date: -1 }).populate("user");
  res.json(notices);
};

export const getAdminNotice = async (req, res) => {
  const notice = await Notice.findOne({ _id: req.params.id, user: req.user.id }).populate("user");
  if (!notice) return res.status(404).json({ message: "Noticia no encontrada" });
  res.json(notice);
};

export const createNotice = async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  const notice = await new Notice({
    ...req.body,
    imageUrl,
    date: req.body.date || Date.now(),
    user: req.user.id
  }).save();

  res.json(notice);
};

export const updateNotice = async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
  const notice = await Notice.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { ...req.body, imageUrl },
    { new: true }
  );

  if (!notice) return res.status(404).json({ message: "Noticia no encontrada" });
  res.json(notice);
};

export const deleteNotice = async (req, res) => {
  const notice = await Notice.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!notice) return res.status(404).json({ message: "Noticia no encontrada" });
  res.sendStatus(204);
};
