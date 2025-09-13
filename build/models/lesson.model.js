"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Хичээл нэрийг заавал оруулна."],
    },
    studentNumber: {
        type: Number,
        required: [true, "Сурагчдийн тоог заавал оруулна."],
    },
    amount: {
        type: Number,
        required: [true, "Хичээлийн үнийн дүнг заавал оруулна."],
    },
    ageLimitMin: {
        type: Number,
        required: [true, "Доод нас заавал оруулна."],
    },
    ageLimitMax: {
        type: Number,
        required: [true, "Дээд нас заавал оруулна."],
    },
});
const Lesson = (0, mongoose_1.model)("Lesson", lessonSchema);
exports.default = Lesson;
