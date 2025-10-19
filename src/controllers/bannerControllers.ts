import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Banner from "../models/banner";

export const createBanner = async (req: Request, res: Response) => {
  try {
    const { link } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Store relative path (for frontend use)
const imagePath = `/uploads/banners/${req.file.filename}`;

    const banner = await Banner.create({
      link,
      image: imagePath, // stored as /uploads/banners/xxxx.png
    });

    res.status(201).json({
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBanners = async (_req: Request, res: Response) => {
  try {
    const banners = await Banner.findAll({
      order: [["createdAt", "DESC"]], // 👈 sort by createdAt descending
    });

    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find banner by primary key (ID)
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json(banner);
  } catch (error) {
    console.error("Error fetching banner detail:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};


export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { link } = req.body;

    const banner = await Banner.findByPk(id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (req.file) {
      // Delete old file
      const oldPath = path.join(process.cwd(), "uploads", "banners", path.basename(banner.image));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      // ✅ Save new image relative path
      banner.image = `/uploads/banners/${req.file.filename}`;
    }

    banner.link = link || banner.link;
    await banner.save();

    res.json({
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    // const imagePath = path.join(__dirname, "../../uploads", banner.image);
            const imagePath = path.join(process.cwd(), "uploads", "banners", path.basename(banner.image));
    
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await banner.destroy();
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
