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
import { checkAuth } from "../middleware/checkAuth.js";
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", checkAuth, getCollections);
router.get("/:id", checkAuth, validateId, getCollection);

router.post("/", checkAuth, createCollection);

router.delete("/:id", checkAuth, validateId, deleteCollection);

export default router;
