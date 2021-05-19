// libraries
import express from "express";

// controller
import {
  getCards,
  getCard,
  createCard,
  deleteCard
} from "../controllers/card.js";

const router = express.Router();

router.get("/", getCards);
router.get("/:id", getCard);

router.post("/", createCard);

router.delete("/:id", deleteCard);

export default router;
