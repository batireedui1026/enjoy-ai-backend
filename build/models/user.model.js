"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Хэрэглэгчийн нэрийг заавал оруулна."],
    },
    firstname: {
        type: String,
        required: [true, "Хэрэглэгчийн нэрийг заавал оруулна."],
    },
    lastname: {
        type: String,
        required: [true, "Хэрэглэгчийн овгийг заавал оруулна."],
    },
    password: {
        type: String,
        required: [true, "Хэрэглэгчийн нууц үгийг заавал оруулна."],
    },
    email: {
        type: String,
        required: [true, "Хэрэглэгчийн майл хаягийг заавал оруулна."],
    },
    contactPhone: {
        type: String,
        required: [true, "Хэрэглэгчийн утасыг хаягийг заавал оруулна."],
    },
    role: {
        type: String,
        enum: ["admin", "teacher", "unitel", "superadmin"],
        required: [true, "Хэрэглэгчийн эрхийг заавал оруулна."],
    },
    active: {
        type: Boolean,
        required: [true, "Хэрэглэгчийн төлөв заавал оруулна."],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
