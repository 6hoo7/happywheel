// import express from "express";
// import { connectDB } from "./config/db.js";
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello, server is running!");
// });

// const startServer = async () => {
//     await connectDB(process.env.DB_URI);

//     app.listen(PORT, () => {
//         console.log(`🚀 Server is running at http://localhost:${PORT}`);
//     });
// };

// startServer();

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import authGoogleRouter from "./routers/authGoogle.js";
import authFacebookRouter from "./routers/authFacebook.js";
import userRouter from "./routers/user.js";
import spinRouter from "./routers/spin.js";
import giftRouter from "./routers/getGifts.js"
import cors from "cors";
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(morgan("dev"));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/auth", authGoogleRouter);

app.use("/auth", authFacebookRouter);

app.use("/api", userRouter);

app.use("/api", spinRouter);

app.use("/api", giftRouter);

app.get("/", (req, res) => {
    res.send("Hello, server is running!");
});

const startServer = async () => {
    await connectDB(process.env.DB_URI);

    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
};

startServer();


