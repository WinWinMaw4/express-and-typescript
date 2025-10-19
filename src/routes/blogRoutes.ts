import { Router } from "express";
import { createUpload } from "../middlewares/upload";
import { createBlogController, deleteBlogController, getBlogDetailController, getBlogsController, updateBlogController } from "../controllers/blogControllers";
import { createBlogValidator } from "../validators/blogValidator";
import { validateRequest } from "../middlewares/validateRequest";


const router = Router();

const blogUpload = createUpload("blogs");


router.get("/", getBlogsController);
router.get("/:slug", getBlogDetailController);
router.post("/", blogUpload.single("coverImage"),createBlogValidator, validateRequest, createBlogController);
router.patch(
  "/:id",
  blogUpload.single("coverImage"),
  createBlogValidator, // you can use same validator for title/content
  validateRequest,
  updateBlogController
);
router.delete("/:id", deleteBlogController);

export default router;
