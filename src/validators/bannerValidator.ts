import { body } from "express-validator";

export const createBannerValidator = [
  body("link")
    .optional() // or use .notEmpty() if you want it required
    .isString()
    .withMessage("Link must be a string")
    .isLength({ max: 255 })
    .withMessage("Link must not exceed 255 characters"),
];

export const updateBannerValidator = [
  body("link")
    .optional()
    .isString()
    .withMessage("Link must be a string")
    .isLength({ max: 255 })
    .withMessage("Link must not exceed 255 characters"),
];
