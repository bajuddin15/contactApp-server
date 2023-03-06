import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "../controllers/contact.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createContact);
router.route("/").get(protect, getAllContacts);
router.route("/:id").delete(protect, deleteContact).put(protect, updateContact);

export default router;
