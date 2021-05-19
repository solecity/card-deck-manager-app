// libraries
import express from "express";

// controller
import { getCards, getCard } from "../controllers/card.js";

const router = express.Router();

router.get("/", getCards);
router.get("/:id", getCard);

export default router;
