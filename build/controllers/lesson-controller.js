"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLesson = exports.createLesson = void 0;
const lesson_model_1 = __importDefault(require("../models/lesson.model"));
const createLesson = async (req, res) => {
    try {
        const { name, studentNumber, amount, ageLimitMin, ageLimitMax } = req.body;
        const lesson = await lesson_model_1.default.create({
            name,
            studentNumber,
            amount,
            ageLimitMin,
            ageLimitMax,
        });
        res.status(201).json({ message: "Lesson created", lesson });
    }
    catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.createLesson = createLesson;
const getLesson = async (req, res) => {
    try {
        const subjects = await lesson_model_1.default.find({});
        res.status(200).json({ message: "Хичээлүүд олдлоо", subjects });
    }
    catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ message: "Алдаа гарла", error });
    }
};
exports.getLesson = getLesson;
