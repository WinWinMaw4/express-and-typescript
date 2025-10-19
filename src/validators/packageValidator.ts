import { body } from "express-validator";
import { Request } from "express";

// ✅ Create Package Validator
export const createPackageValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  // ✅ Custom validator for uploaded file
  body("coverImage").custom((value, { req }) => {
    const file = (req as Request).file;

    if (!file) {
      throw new Error("Cover image is required");
    }

    // Allowed file types
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Only JPG, PNG, and WEBP images are allowed");
    }

    // Limit size (optional): 2MB max
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error("Image must be smaller than 2MB");
    }

    return true;
  }),
];
