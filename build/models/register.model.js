"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const registrationSchema = new mongoose_1.Schema({
    trainingType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Сургалтын төрлийг заавал оруулна."],
    },
    location: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Province",
        required: [true, "Байршлыг заавал оруулна."],
    },
    schoolName: {
        type: String,
        required: [true, "Сургуулийг заавал оруулна."],
    },
    teamName: {
        type: String,
        required: [true, "Багийн нэрийг заавал оруулна."],
    },
    lastNames: {
        type: [{ type: String }],
        required: [true, "Овог заавал оруулна."],
    },
    firstNames: {
        type: [{ type: String }],
        required: [true, "Нэр заавал оруулна."],
    },
    teacherName: {
        type: [{ type: String }],
        required: [true, "Багшийн нэр заавал оруулна."],
    },
    ages: {
        type: [{ type: Number }],
        required: [true, "Насыг заавал оруулна."],
    },
    contactPhone: {
        type: String,
        required: [true, "Утасны дугаарыг заавал оруулна."],
    },
    invoiceId: {
        type: String,
    },
    paidAt: {
        type: Date,
        default: null,
    },
    expireAt: {
        type: Date,
        default: null,
        index: { expires: 0 },
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        required: [true, "Төлбөрийн төлөвийг заавал оруулна."],
    },
    paymentAmount: {
        type: Number,
        required: [false, "Төлбөрийн дүн"],
    },
}, { timestamps: true });
const Registration = (0, mongoose_1.model)("Registration", registrationSchema);
exports.default = Registration;
