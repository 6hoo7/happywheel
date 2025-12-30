import jwt from "jsonwebtoken";
import User from "../models/user.js";

const jwtAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing or invalid token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded = { id, email, iat, exp }
        const user = await User.findById(decoded.id).select("_id email name");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // 🔑 gắn user vào request
        req.user = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized", error: err.message });
    }
};

export default jwtAuth;
