import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

dotenv.config();

// 1️⃣ Cấu hình Passport Facebook Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ["id", "displayName", "photos", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const provider = "facebook";
                const providerId = profile.id;
                const name = profile.displayName;
                const email = profile.emails?.[0]?.value || null;
                const picture = profile.photos?.[0]?.value || null;

                // 🔍 Tìm user đã có chưa
                let user = await User.findOne({ provider, providerId });

                if (!user) {
                    try {
                        user = await User.create({
                            provider,
                            providerId,
                            name,
                            email,
                            picture,
                        });
                    } catch (err) {
                        if (err.code === 11000) {
                            console.error("❌ Tài khoản Facebook đã tồn tại!");
                            return done(new Error("Tài khoản Facebook đã tồn tại!"), null);
                        }
                        throw err;
                    }
                }

                return done(null, user);
            } catch (err) {
                console.error("Facebook auth error:", err);
                return done(err, null);
            }
        }
    )
);

// 2️⃣ Khởi tạo Passport middleware
export const initFacebookAuth = (app) => {
    app.use(passport.initialize());
};

// 3️⃣ Route: chuyển hướng login Facebook
export const facebookLogin = passport.authenticate("facebook", {
    scope: ["email"],
});

// 4️⃣ Route: callback
export const facebookCallback = (req, res, next) => {
    passport.authenticate("facebook", { session: false }, (err, user) => {
        if (err || !user) {
            console.error("Facebook callback error:", err);
            return res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
        }

        // 🧠 Tạo JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // ✅ Redirect về client kèm token
        res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
    })(req, res, next);
};
