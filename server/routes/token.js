// libraries
import express from "express";

// controller
import { login } from "../controllers/token.js";

const router = express.Router();

router.post("/", login);

export default router;
