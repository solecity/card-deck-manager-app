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
import { checkAuth } from "../middleware/checkAuth.js";
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", checkAuth, getCards);
router.get("/:id", checkAuth, validateId, getCard);

router.post("/", checkAuth, createCard);

router.delete("/:id", checkAuth, validateId, deleteCard);

export default router;
