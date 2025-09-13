"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateHtmlTemplate_1 = __importDefault(require("./generateHtmlTemplate"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = async (email, trainingType) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM_USER,
        to: email,
        subject: "Төлбөр амжиллтай төлөгдлөө",
        html: (0, generateHtmlTemplate_1.default)(trainingType),
    });
};
exports.sendEmail = sendEmail;
