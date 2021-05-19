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
import { checkAuth } from "../middleware/checkAuth.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", checkAuth, adminAuthorization, getUsers);
router.get("/:id", checkAuth, validateId, getUser);

router.post("/", createUser);

router.patch("/:id", checkAuth, validateId, updateUser);

router.delete("/:id", checkAuth, adminAuthorization, validateId, deleteUser);

export default router;
