// import express from "express";
// import { getGoogleAuthURL, googleCallback } from "../controller/auth.js";

// const router = express.Router();

// // Step 1: Lấy URL Google Login
// router.get("/google", getGoogleAuthURL);

// // Step 2: Callback Google trả về
// router.get("/google/callback", googleCallback);

// export default router;  // ✅ Quan trọng

import express from "express";
import { getGoogleAuthURL, googleCallback } from "../controllers/authGoogle.js";

const router = express.Router();

router.get("/google/url", getGoogleAuthURL);
router.get("/google/callback", googleCallback);

export default router;
