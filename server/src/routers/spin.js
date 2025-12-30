import express from "express";
import { spinWheel } from "../controllers/spin.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/spin", jwtAuth, spinWheel);

export default router;
