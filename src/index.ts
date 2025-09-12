import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import registrationRoute from "./routes/register-route";
import lessonRoute from "./routes/lesson-route";
dotenv.config();
import provinceRouter from "./routes/province-route";
import paymentRoute from "./routes/payment-route";
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/register", registrationRoute);
app.use("/api/v1/lesson", lessonRoute);
app.use("/api/v1/province", provinceRouter);

paymentRoute(app);
// app.use("/api/v1/checklist", checklistRoute);

// Multer config for file uploads

// app.post("/api/v1/mail", async (req: Request, res: Response) => {
//   await sendEmail("munkherdene709@gmail.com", "munkherdene");
//   res.status(200).json({ message: "амжиллтай имэйл илгээлээ" });
// });
// console.log("MU", MONGO_URI);

connectDB(MONGO_URI);

app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа`);
});
