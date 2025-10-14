import { Request, Response } from "express";
import Blog from "../models/blog";
import { generateSlug } from "../utils/slugify";

export const createBlogController = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const slug = generateSlug(title);

    const newBlog = await Blog.create({
      title,
      content,
      coverImage,
      slug,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error: any) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({ error: "Error creating blog" });
  }
};

// Get all blogs (sorted newest first)
export const getBlogsController = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(blogs);
  } catch (error: any) {
    console.error("❌ Error getting blogs:", error);
    res.status(500).json({ error: "Error getting blogs" });
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
