import { Router } from "express";
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactControllers";

const router = Router();

router.get("/", getContacts);        // Get all
router.get("/:id", getContact);      // Get one
router.post("/", createContact);     // Create
router.put("/:id", updateContact);   // Update
router.delete("/:id", deleteContact);// Delete

export default router;
