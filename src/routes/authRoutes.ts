import express from "express";
import { login, registerAdmin } from "../controllers/authControllers";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", login);

export default router;
