"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const provinceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "аймаг нэрийг заавал оруулна."],
    },
});
const Province = (0, mongoose_1.model)("Province", provinceSchema);
exports.default = Province;
