// libraries
import express from "express";

// controller
import {
  getCards,
  getCard,
  createCard,
  deleteCard
} from "../controllers/card.js";

// middleware
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", getCards);
router.get("/:id", validateId, getCard);

router.post("/", createCard);

router.delete("/:id", validateId, deleteCard);

export default router;
