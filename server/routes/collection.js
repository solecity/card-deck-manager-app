// libraries
import express from "express";

// controller
import {
  getCollections,
  getCollection,
  createCollection,
  deleteCollection
} from "../controllers/collection.js";

// middleware
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", getCollections);
router.get("/:id", validateId, getCollection);

router.post("/", createCollection);

router.delete("/:id", validateId, deleteCollection);

export default router;
