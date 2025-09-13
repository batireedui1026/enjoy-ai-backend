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
// export const createRegistration = async (req: Request, res: Response) => {
//   const {
//     trainingType,
//     location,
//     schoolName,
//     teamName,
//     LastName,
//     FirstName,
//     ages,
//     gender,
//     contactPhone,
//     paymentAmount,
//   } = req.body;
//   try {
//     const paymentStatus = "unpaid";
//     const registration = await Registration.create({
//       trainingType: new mongoose.Types.ObjectId(trainingType),
//       location,
//       schoolName,
//       teamName,
//       LastName,
//       FirstName,
//       ages,
//       gender,
//       contactPhone,
//       paymentAmount,
//       expireAt: new Date(Date.now() + 25 * 60 * 1000),
//     });
//     console.log("Registrations:", registration._id.toHexString());
//     const id = registration._id.toHexString();
//     const invoice = await createInvoiceFn(contactPhone, id);
//     if (invoice?.status === 200) {
//       const update = await Registration.findByIdAndUpdate(id, {
//         invoiceId: invoice?.data.invoice_id,
//       });
//       res
//         .status(201)
//         .json({ message: "Бүртгэл амжилттай", data: { update, invoice } });
//     }
//     res.status(400).json({ message: "Бүртгэл амжилтгүй" });
//     // await sendEmail(` ${trainingType}`);
//   } catch (error) {
//     console;
//     res.status(500).json({ message: "Алдаа гарлаа", error });
//   }
// };
const createRegistration = async (req, res) => {
    const { trainingType, location, schoolName, teamName, LastName, FirstName, teacherName, ages, contactPhone, paymentAmount, } = req.body;
    try {
        // 1. TrainingType буюу хичээлийг олох
        const lesson = await lesson_model_1.default.findById(trainingType);
        if (!lesson) {
            return res.status(404).json({ message: "Хичээл олдсонгүй" });
        }
        // 2. Одоогийн бүртгэгдсэн хүүхдүүдийн тоо авах
        const currentCount = await register_model_1.default.countDocuments({
            trainingType: new mongoose_1.default.Types.ObjectId(trainingType),
        });
        // 3. studentNumber-оос давсан эсэх шалгах
        if (currentCount >= lesson.studentNumber) {
            return res.status(400).json({
                message: "Энэ хичээлд суух хүүхдийн тоо дүүрсэн байна.",
                registeredStudents: await register_model_1.default.find({ trainingType }).select("LastName FirstName"),
            });
        }
        const paymentStatus = "unpaid";
        // 4. Бүртгэл үүсгэх
        const registration = await register_model_1.default.create({
            trainingType: new mongoose_1.default.Types.ObjectId(trainingType),
            location,
            schoolName,
            teamName,
            LastName,
            FirstName,
            teacherName,
            ages,
            contactPhone,
            paymentStatus,
            expireAt: new Date(Date.now() + 25 * 60 * 1000),
        });
        console.log("Registrations:", registration._id.toHexString());
        const id = registration._id.toHexString();
        // 5. QPay Invoice үүсгэх
        const invoice = await (0, create_invoice_1.createInvoiceFn)(contactPhone, id);
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
