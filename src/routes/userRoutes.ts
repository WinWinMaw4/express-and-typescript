// routes/userRoutes.ts
import { Router } from "express";
import { verifyAdmin } from "../middlewares/authMiddleware";
import { changePasswordValidator, updateUserValidator } from "../validators/userValidator";
import { validateRequest } from "../middlewares/validateRequest";
import { changePassword, updateUserInfo } from "../controllers/userControllers";

const router = Router();

router.patch("/:id", verifyAdmin, updateUserValidator, validateRequest, updateUserInfo);
router.patch("/:id/change-password", verifyAdmin, changePasswordValidator, validateRequest, changePassword);

export default router;
