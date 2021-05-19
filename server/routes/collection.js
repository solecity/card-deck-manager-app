// libraries
import express from "express";

// controller
import { getCollections, getCollection } from "../controllers/collection.js";

const router = express.Router();

router.get("/", getCollections);
router.get("/:id", getCollection);

export default router;
