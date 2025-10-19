import express from "express";
import multer from "multer";
import path from "path";
import { verifyAdmin } from "../middlewares/authMiddleware";
import { createBanner, deleteBanner, getBannerById, getBanners, updateBanner } from "../controllers/bannerControllers";
import { createUpload } from "../middlewares/upload";
import { createBannerValidator, updateBannerValidator } from "../validators/bannerValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const bannerUpload = createUpload("banners");

// Public (GET only)
router.get("/", getBanners);

// Admin Protected Routes
router.post("/", verifyAdmin, bannerUpload.single("image"),createBannerValidator, validateRequest, createBanner);
router.get("/:id", verifyAdmin, bannerUpload.single("image"),createBannerValidator, validateRequest, getBannerById);
router.put("/:id", verifyAdmin, bannerUpload.single("image"),updateBannerValidator,validateRequest, updateBanner);
router.delete("/:id", verifyAdmin, deleteBanner);

export default router;
