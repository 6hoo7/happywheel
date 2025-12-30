import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// 📍 Lấy thông tin người dùng hiện tại từ JWT token
export const getUserProfile = async (req, res) => {
    try {
        console.log(">>> Authorization header:", req.headers.authorization);
        // 🔐 Lấy token từ header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Thiếu token xác thực" });
        }

        // 🧠 Giải mã token để lấy user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // 🔍 Tìm user trong DB
        const user = await User.findById(userId).select("name picture");

        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// controllers/auth.js
export const signOut = async (req, res) => {
    try {
        // 1) Passport logout (nếu bạn dùng passport session)
        // (Trong code bạn đang authenticate với session: false, nhưng thêm vào để an toàn)
        if (typeof req.logout === "function") {
            try {
                req.logout(function (err) {
                    if (err) console.warn("Passport logout error:", err);
                });
            } catch (err) {
                // fallback cho các phiên bản passport cũ
                try { req.logout(); } catch { }
            }
        }

        // 2) Clear cookie nếu bạn dùng express-session hoặc lưu token cookie
        res.clearCookie("connect.sid", {
            path: "/",
            httpOnly: true,
            sameSite: "lax"
        });

        res.clearCookie("token", {
            path: "/",
            httpOnly: true,
            sameSite: "lax"
        });

        // 3) Không cần revoke token Google/Facebook
        // vì bạn KHÔNG dùng refresh token của provider để duy trì session server-side.

        // 4) Trả về client
        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công (server đã xoá session/token)."
        });

    } catch (error) {
        console.error("SignOut error:", error);
        return res.status(500).json({ success: false, message: "Lỗi server khi đăng xuất" });
    }
};
