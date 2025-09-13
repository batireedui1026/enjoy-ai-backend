"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvince = exports.createProvince = void 0;
const province_model_1 = __importDefault(require("../models/province.model"));
const createProvince = async (req, res) => {
    try {
        const { name } = req.body;
        const province = await province_model_1.default.create({
            name,
        });
        res.status(201).json({ message: "Province created", province });
    }
    catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.createProvince = createProvince;
const getProvince = async (req, res) => {
    try {
        const location = await province_model_1.default.find({});
        res.status(200).json({ message: "Бүртгэлүүд олдлоо", location });
        console.log("location", location);
    }
    catch (error) {
        res.status(500).json({ message: "Алдаа гарлаа", error });
    }
};
exports.getProvince = getProvince;
