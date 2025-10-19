// controllers/userController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

// Update user info
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const {id} = req.params; // assuming user ID is in JWT middleware
    const { name, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    return res.json({ message: "User info updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const errors: Record<string, string> = {};

    // Check user exists
    const user = await User.findByPk(id);
    if (!user) {
      errors.general = "User not found";
      return res.status(404).json({ errors });
    }

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      errors.oldPassword = "Old password is incorrect";
    }

    // Validate new password length
    if (!newPassword || newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: { general: "Server error" } });
  }
};