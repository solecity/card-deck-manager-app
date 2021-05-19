// libraries
import express from "express";

// controller
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.js";

// middleware
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", validateId, getUser);

router.post("/", createUser);

router.patch("/:id", validateId, updateUser);

router.delete("/:id", validateId, deleteUser);

export default router;
