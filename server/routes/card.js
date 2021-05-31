// libraries
import express from "express";

// controller
import {
  getCards,
  getUserCards,
  getCard,
  createCard,
  updateCard,
  deleteCard
} from "../controllers/card.js";

// schema validator
import { validateCard } from "../config/schemas/card.js";

// middleware
import { checkAuth } from "../middleware/checkAuth.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import { validateId } from "../middleware/validateId.js";
import { validateSchema } from "../middleware/validateSchema.js";

const router = express.Router();

router.get("/", checkAuth, adminAuthorization, getCards);

router.get("/user/:id", checkAuth, validateId, getUserCards);

router.get("/:id", checkAuth, validateId, getCard);

router.post("/", checkAuth, validateSchema(validateCard), createCard);

router.put(
  "/:id",
  checkAuth,
  validateSchema(validateCard),
  validateId,
  updateCard
);

router.delete("/:id", checkAuth, validateId, deleteCard);

export default router;
