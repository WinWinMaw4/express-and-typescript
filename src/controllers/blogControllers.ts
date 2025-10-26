const fs = require("fs");
import { Request, Response } from "express";
import Blog from "../models/blog";
import { generateSlug } from "../utils/slugify";
import path from "path";
import { Op } from "sequelize";

export const createBlogController = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const coverImage = req.file ? `/uploads/blogs/${req.file.filename}` : null;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }


    const newBlog = await Blog.create({
      title,
      content,
      coverImage,
      slug:"",
    });

    // After getting id, generate slug
const slug = generateSlug(title, newBlog.id);

// Update blog with slug
await newBlog.update({ slug });

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error: any) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({ error: "Error creating blog" });
  }
};


// Get all blogs (sorted newest first) with optional pagination & search
export const getBlogsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const search = (req.query.search as string) || "";
    const latest = req.query.latest === "true";

    // If it's a latest request → no pagination but still allow search (optional)
    if (latest) {
      const blogs = await Blog.findAll({
        where: search
          ? { title: { [Op.iLike]: `%${search}%` } }
          : undefined,
        order: [["createdAt", "DESC"]],
        limit: 3,
      });
      return res.status(200).json({ blogs });
    }

    // Pagination request
    const whereCondition = search
      ? { title: { [Op.iLike]: `%${search}%` } }
      : undefined;

    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      totalPages,
      currentPage: page,
      totalItems: count,
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get blog detail by slug
export const getBlogDetailController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ where: { slug } });

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json(blog);
  } catch (error: any) {
    console.error("❌ Error getting blog detail:", error);
    res.status(500).json({ error: "Error getting blog detail" });
  }
};

// update blog
export const updateBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // assuming you identify blog by ID for editing
    const { title, content } = req.body;

    // Find existing blog
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Handle new cover image
    let coverImage = blog.coverImage; // default: keep old
    if (req.file) {
      // Delete old file if exists
      if (blog.coverImage) {
        const oldImagePath = path.join(process.cwd(), "uploads", "blogs", path.basename(blog.coverImage));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      coverImage = `/uploads/blogs/${req.file.filename}`;
    }

    // Update slug if title changed, append -id to ensure uniqueness
    const slug =
  title && title !== blog.title
    ? generateSlug(title, blog.id) 
    : blog.slug;

    // Update blog
    await blog.update({
      title: title || blog.title,
      content: content || blog.content,
      coverImage,
      slug,
    });

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error: any) {
    console.error("❌ Error updating blog:", error);
    res.status(500).json({ error: "Error updating blog" });
  }
};

// Delete blog
export const deleteBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the blog by ID
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete cover image file if exists
    if (blog.coverImage) {
      const imagePath = path.join(process.cwd(), "uploads", "blogs", path.basename(blog.coverImage));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the blog record from the database
    await blog.destroy();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting blog:", error);
    res.status(500).json({ error: "Error deleting blog" });
  }
};

