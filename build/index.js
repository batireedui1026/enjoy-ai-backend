"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db";
// import cors from "cors";
// import registrationRoute from "./routes/register-route";
// import lessonRoute from "./routes/lesson-route";
// dotenv.config();
// import provinceRouter from "./routes/province-route";
// import paymentRoute from "./routes/payment-route";
// const PORT = process.env.PORT || 8001;
// const MONGO_URI =
//   process.env.MONGO_URI ||
//   "mongodb+srv://batireeduiotgonsukh:eovO5ikAt1Z0Wkxk@e-commerce.m2lyh.mongodb.net/enjoyai?retryWrites=true&w=majority&appName=e-commerce";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/v1/register", registrationRoute);
// app.use("/api/v1/lesson", lessonRoute);
// app.use("/api/v1/province", provinceRouter);
// // ✅ Health check endpoint - EB / GET / request-д хариу өгнө
// app.get("/", (req, res) => res.send("OK"));
// paymentRoute(app);
// // app.use("/api/v1/checklist", checklistRoute);
// // Multer config for file uploads
// // app.post("/api/v1/mail", async (req: Request, res: Response) => {
// //   await sendEmail("munkherdene709@gmail.com", "munkherdene");
// //   res.status(200).json({ message: "амжиллтай имэйл илгээлээ" });
// // });
// // console.log("MU", MONGO_URI);
// connectDB(MONGO_URI);
// app.listen(PORT, () => {
//   console.log(`Сервер localhost:${PORT} дээр аслаа`);
// });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
// Routes
const register_route_1 = __importDefault(require("./routes/register-route"));
const lesson_route_1 = __importDefault(require("./routes/lesson-route"));
const province_route_1 = __importDefault(require("./routes/province-route"));
const payment_route_1 = __importDefault(require("./routes/payment-route"));
const user_route_1 = __importDefault(require("./routes/user-route"));
dotenv_1.default.config();
// const PORT = process.env.PORT || 8001;
const PORT = parseInt(process.env.PORT || "8001", 10);
const MONGO_URI = process.env.MONGO_URI || "";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// API routes
app.use("/api/v1/register", register_route_1.default);
app.use("/api/v1/lesson", lesson_route_1.default);
app.use("/api/v1/province", province_route_1.default);
app.use("/api/v1/user", user_route_1.default);
(0, payment_route_1.default)(app);
// d
// ✅ Health check endpoint for EB
app.get("/", (req, res) => res.send("OK"));
// Connect MongoDB and start server
(0, db_1.connectDB)(MONGO_URI)
    .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Server failed to start:", err);
});
