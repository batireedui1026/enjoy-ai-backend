"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invoiceSchema = new mongoose_1.Schema({
    invoiceId: { type: String },
    status: { type: String, default: "unpaid" },
    created_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Invoice = (0, mongoose_1.model)("invoice", invoiceSchema);
exports.default = Invoice;
