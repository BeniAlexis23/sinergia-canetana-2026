import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo invalido"),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres")
});

export const loginSchema = z.object({
  email: z.string().email("Correo invalido"),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres")
});
