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
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";

// Routes
import registrationRoute from "./routes/register-route";
import lessonRoute from "./routes/lesson-route";
import provinceRouter from "./routes/province-route";
import paymentRoute from "./routes/payment-route";
import userRoute from "./routes/user-route";
dotenv.config();

// const PORT = process.env.PORT || 8001;
const PORT = parseInt(process.env.PORT || "8001", 10);
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1/register", registrationRoute);
app.use("/api/v1/lesson", lessonRoute);
app.use("/api/v1/province", provinceRouter);
app.use("/api/v1/user", userRoute);
paymentRoute(app);
// d
// ✅ Health check endpoint for EB
app.get("/", (req, res) => res.send("OK"));

// Connect MongoDB and start server
connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start:", err);
  });
