import express from "express";
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packageControllers";
import { createUpload } from "../middlewares/upload";
import { validateRequest } from "../middlewares/validateRequest";
import { createPackageValidator } from "../validators/packageValidator";

const router = express.Router();

const packageUpload = createUpload("packages");


// Routes
router.post("/", packageUpload.single("coverImage"), createPackageValidator,
validateRequest, createPackage);
router.get("/", getPackages);
router.get("/:id", getPackageById);
router.patch("/:id", packageUpload.single("coverImage"),updatePackage);
router.delete("/:id", deletePackage);

export default router;
