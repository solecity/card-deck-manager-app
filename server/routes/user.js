// libraries
import express from "express";

// controller
import {
  getUsers,
  getUser,
  createUser,
  updateUserPassword,
  updateUserType,
  deleteUser
} from "../controllers/user.js";

// schema validator
import { validateUser } from "../config/schemas/user.js";

// middleware
import { checkAuth } from "../middleware/checkAuth.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import { validateId } from "../middleware/validateId.js";
import { validateSchema } from "../middleware/validateSchema.js";

const router = express.Router();

router.get("/", checkAuth, adminAuthorization, getUsers);

router.get("/:id", checkAuth, validateId, getUser);

router.post("/", validateSchema(validateUser), createUser);

router.patch(
  "/:id",
  checkAuth,
  validateSchema(validateUser),
  validateId,
  updateUserPassword
);

router.patch(
  "/:id",
  checkAuth,
  adminAuthorization,
  validateSchema(validateUser),
  validateId,
  updateUserType
);

router.delete("/:id", checkAuth, adminAuthorization, validateId, deleteUser);

export default router;
