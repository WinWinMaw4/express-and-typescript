// validation/userValidation.ts
import { body } from "express-validator";

export const updateUserValidator = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
];

export const changePasswordValidator = [
  body("oldPassword").exists().withMessage("Old password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];
