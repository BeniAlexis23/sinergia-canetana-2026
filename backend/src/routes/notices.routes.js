import { Router } from "express";
import {
  createNotice,
  deleteNotice,
  getAdminNotice,
  getAdminNotices,
  getPublicNotice,
  getPublicNotices,
  updateNotice
} from "../controllers/notices.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { noticeSchema } from "../schemas/notice.schema.js";
import upload from "../multer.js";

const router = Router();

router.get("/noticias", getPublicNotices);
router.get("/noticias/:id", getPublicNotice);
router.get("/notices", authRequired, getAdminNotices);
router.get("/notices/:id", authRequired, getAdminNotice);
router.post("/notices", authRequired, upload.single("imageUrl"), validateSchema(noticeSchema), createNotice);
router.put("/notices/:id", authRequired, upload.single("imageUrl"), updateNotice);
router.delete("/notices/:id", authRequired, deleteNotice);

export default router;
