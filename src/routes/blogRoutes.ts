import { Router } from "express";
import { upload } from "../middlewares/upload";
import { createBlogController, getBlogDetailController, getBlogsController } from "../controllers/blogControllers";
// import {
//   createBlogController,
//   getBlogDetailController,
//   getBlogsController,
// } from "../controllers/blogController";

const router = Router();

router.get("/", getBlogsController);
router.get("/:slug", getBlogDetailController);
router.post("/", upload.single("coverImage"), createBlogController);

export default router;
