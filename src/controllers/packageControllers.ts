/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Package from "../models/package";

// Create package
export const createPackage = async (req: Request, res: Response) => {
  try {
    const { title, price, description } = req.body;
    const coverImage = req.file ? `/uploads/packages/${req.file.filename}` : null;

    if (!title || !price || !description) {
      return res.status(400).json({ error: "Title, price, and description are required" });
    }

    const newPackage = await Package.create({
      title,
      price,
      description,
      coverImage,
    });

    res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error: any) {
    console.error("❌ Error creating package:", error);
    res.status(500).json({ error: "Error creating package" });
  }
};

// Get all packages
export const getPackages = async (_req: Request, res: Response) => {
  try {
    const packages = await Package.findAll({ order: [["createdAt", "ASC"]] });
    res.status(200).json(packages);
  } catch (error: any) {
    console.error("❌ Error getting packages:", error);
    res.status(500).json({ error: "Error getting packages" });
  }
};

// Get single package by ID
export const getPackageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findByPk(id);

    if (!pkg) return res.status(404).json({ error: "Package not found" });

    res.status(200).json(pkg);
  } catch (error: any) {
    console.error("❌ Error getting package:", error);
    res.status(500).json({ error: "Error getting package" });
  }
};

// Update package
export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;

    const pkg = await Package.findByPk(id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });

    let coverImage = pkg.coverImage;
    if (req.file) {
      // Delete old file
      if (pkg.coverImage) {
        const oldPath = path.join(process.cwd(), "uploads", "packages", path.basename(pkg.coverImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      coverImage = `/uploads/packages/${req.file.filename}`;
    }

    await pkg.update({
      title: title || pkg.title,
      price: price || pkg.price,
      description: description || pkg.description,
      coverImage,
    });

    res.status(200).json({
      message: "Package updated successfully",
      package: pkg,
    });
  } catch (error: any) {
    console.error("❌ Error updating package:", error);
    res.status(500).json({ error: "Error updating package" });
  }
};

// Delete package
export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findByPk(id);

    if (!pkg) return res.status(404).json({ error: "Package not found" });

    // Delete image if exists
    if (pkg.coverImage) {
      const filePath = path.join(process.cwd(), "uploads", "packages", path.basename(pkg.coverImage));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pkg.destroy();
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting package:", error);
    res.status(500).json({ error: "Error deleting package" });
  }
};
