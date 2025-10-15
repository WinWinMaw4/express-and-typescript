import { Router } from "express";
import { upload } from "../middlewares/upload";
import { createBlogController, getBlogDetailController, getBlogsController, updateBlogController } from "../controllers/blogControllers";
import { createBlogValidator } from "../validators/blogValidator";
import { validateRequest } from "../middlewares/validateRequest";


const router = Router();

router.get("/", getBlogsController);
router.get("/:slug", getBlogDetailController);
router.post("/", upload.single("coverImage"),createBlogValidator, validateRequest, createBlogController);
router.patch(
  "/:id",
  upload.single("coverImage"),
  createBlogValidator, // you can use same validator for title/content
  validateRequest,
  updateBlogController
);
export default router;
