// import express from "express";
// import {
//     facebookLogin,
//     facebookCallback,
//     initFacebookAuth,
// } from "../controllers/authFacebook.js";

// const router = express.Router();

// // Khởi tạo passport trong app (chỉ gọi 1 lần trong server.js)
// initFacebookAuth(router);

// // Bắt đầu đăng nhập với Facebook
// router.get("/facebook", facebookLogin);

// // Callback sau khi Facebook redirect
// router.get("/facebook/callback", facebookCallback);

// export default router;

import express from "express";
import {
    facebookLogin,
    facebookCallback,
    initFacebookAuth,
} from "../controllers/authFacebook.js";

const router = express.Router();

initFacebookAuth(router);

router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);

export default router;
