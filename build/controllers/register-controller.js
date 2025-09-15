"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegistration = exports.createRegistration = void 0;
const register_model_1 = __importDefault(require("../models/register.model"));
const create_invoice_1 = require("../utils/create-invoice");
const mongoose_1 = __importDefault(require("mongoose"));
const lesson_model_1 = __importDefault(require("../models/lesson.model"));
const createRegistration = async (req, res) => {
    const { trainingType, location, schoolName, teamName, lastNames, firstNames, teacherName, ages, contactPhone, } = req.body;
    try {
        const paymentStatus = "unpaid";
        const lesson = await lesson_model_1.default.findById(trainingType);
        if (!lesson) {
            return res.status(404).json({ message: "Хичээл олдсонгүй" });
        }
        const paymentAmount = Number(lesson.amount);
        const registration = await register_model_1.default.create({
            trainingType: new mongoose_1.default.Types.ObjectId(trainingType),
            location,
            schoolName,
            teamName,
            lastNames,
            firstNames,
            teacherName,
            ages,
            contactPhone,
            paymentStatus,
            paymentAmount,
            expireAt: new Date(Date.now() + 2 * 60 * 1000),
            // expireAt: new Date(Date.now() + 25 * 60 * 1000),
        });
        console.log("Registrations:", registration._id.toHexString());
        const id = registration._id.toHexString();
        const invoice = await (0, create_invoice_1.createInvoiceFn)(contactPhone, id, paymentAmount);
        if (invoice?.status === 200) {
            const update = await register_model_1.default.findByIdAndUpdate(id, {
                invoiceId: invoice?.data.invoice_id,
            });
            return res
                .status(201)
                .json({ message: "Бүртгэл амжилттай", data: { update, invoice } });
        }
        return res.status(400).json({ message: "Бүртгэл амжилтгүй" });
    }
    catch (error) {
        res.status(500).json({ message: "Алдаа гарлаа", error });
    }
};
exports.createRegistration = createRegistration;
const getAllRegistration = async (req, res) => {
    try {
        const registrations = await register_model_1.default.find({});
        // .populate("province")
        // .populate({
        //   path: "trainingType",
        //   select: "trainingType",
        //   populate: { path: "course_id", select: "name" },
        // });
        res.status(200).json({ message: "Бүртгэлүүд олдлоо", registrations });
    }
    catch (error) {
        res.status(500).json({ message: "Алдаа гарлаа", error });
    }
};
exports.getAllRegistration = getAllRegistration;
