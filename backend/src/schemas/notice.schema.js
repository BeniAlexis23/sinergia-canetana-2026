import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(4, "El titulo es requerido"),
  summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  content: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  category: z.string().optional(),
  date: z.string().optional()
});
