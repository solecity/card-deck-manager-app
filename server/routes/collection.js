// libraries
import express from "express";

// controller
import {
  getCollections,
  getUserCollections,
  getCollection,
  createCollection,
  updateCollection,
  updateCollectionCards,
  deleteCollection
} from "../controllers/collection.js";

// schema validator
import { validateCollection } from "../config/schemas/collection.js";

// middleware
import { checkAuth } from "../middleware/checkAuth.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import { validateId } from "../middleware/validateId.js";
import { validateSchema } from "../middleware/validateSchema.js";

const router = express.Router();

router.get("/", checkAuth, adminAuthorization, getCollections);

router.get("/user", checkAuth, getUserCollections);

router.get("/:id", checkAuth, validateId, getCollection);

router.post(
  "/",
  checkAuth,
  validateSchema(validateCollection),
  createCollection
);

router.put(
  "/:id",
  checkAuth,
  validateSchema(validateCollection),
  validateId,
  updateCollection
);

router.patch("/:id", checkAuth, validateId, updateCollectionCards);

router.delete("/:id", checkAuth, validateId, deleteCollection);

export default router;
