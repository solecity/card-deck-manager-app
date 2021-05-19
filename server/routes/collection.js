// libraries
import express from "express";

// controller
import {
  getCollections,
  getCollection,
  createCollection,
  deleteCollection
} from "../controllers/collection.js";

const router = express.Router();

router.get("/", getCollections);
router.get("/:id", getCollection);

router.post("/", createCollection);

router.delete("/:id", deleteCollection);

export default router;
