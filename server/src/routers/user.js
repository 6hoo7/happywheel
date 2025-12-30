import express from "express";
import { getUserProfile, signOut } from "../controllers/user.js";
const router = express.Router();

router.get("/profile", getUserProfile);
router.get("/signout", signOut);

export default router;
