import express from "express";
import { getActiveGifts } from "../controllers/getGifts.js";

const router = express.Router();

router.get("/gifts", getActiveGifts);

export default router;
