import jwt from "jsonwebtoken";
import User from "../models/user.js";
import client from "../config/googleClient.js";

export const getGoogleAuthURL = (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "profile", "email"],
  });
  res.redirect(authorizeUrl);
};

export const googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ message: "Thiếu mã code từ Google" });

    // 🔹 Lấy token từ Google
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // 🔹 Xác thực và lấy thông tin người dùng
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: providerId, email, name, picture } = payload;

    // 🔍 Kiểm tra xem user này đã tồn tại chưa
    let user = await User.findOne({ provider: "google", providerId });

    if (!user) {
      try {
        user = await User.create({
          provider: "google",
          providerId,
          email,
          name,
          picture,
        });
      } catch (err) {
        // Nếu lỗi trùng provider + providerId
        if (err.code === 11000) {
          return res.status(400).json({ message: "Tài khoản Google đã tồn tại!" });
        }
        throw err;
      }
    }

    // 🧠 Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Redirect về client kèm token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  } catch (error) {
    console.error("Google login error:", error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
  }
};
