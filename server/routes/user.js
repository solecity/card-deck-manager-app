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

// schema validator
import { validateUser } from "../config/schemas/user.js";

// middleware
import { checkAuth } from "../middleware/checkAuth.js";
import { checkAuthType } from "../middleware/checkAuthType.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import { validateId } from "../middleware/validateId.js";
import { validateSchema } from "../middleware/validateSchema.js";

const router = express.Router();

router.get("/", checkAuth, adminAuthorization, getUsers);

router.get("/:id", checkAuth, validateId, getUser);

router.post("/", checkAuthType, validateSchema(validateUser), createUser);

router.put(
  "/:id",
  checkAuth,
  validateSchema(validateUser),
  validateId,
  updateUser
);

router.delete("/:id", checkAuth, adminAuthorization, validateId, deleteUser);

export default router;
