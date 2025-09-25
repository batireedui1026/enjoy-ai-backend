"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.createAdmin = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const logger_1 = __importDefault(require("../utils/logger"));
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Хоосон утга байж болохгүй." });
            return;
        }
        const user = await user_model_1.default.findOne({ username });
        if (!user) {
            res.status(400).json({ message: "Хэрэглэгч олдсонгүй." });
            return;
        }
        const isCheck = bcrypt_1.default.compareSync(password, user.password.toString());
        if (!isCheck) {
            res.status(400).json({
                message: "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.",
            });
            return;
        }
        const token = (0, jwt_1.generateToken)({ id: user._id, role: user.role });
        res.status(200).json({
            message: "Амжилттай нэвтэрлээ",
            token,
            user: { username, role: user.role },
        });
    }
    catch (error) {
        const { username } = req.body;
        console.error("Login error:", error);
        (0, logger_1.default)("error", "Нэвтрэлтийн алдаа: " + username, error);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
};
exports.login = login;
const createAdmin = async (req, res) => {
    try {
        const { username, firstname, lastname, password, email, contactPhone, role, active, } = req.body;
        if (!username ||
            !firstname ||
            !lastname ||
            !password ||
            !email ||
            !contactPhone ||
            !role ||
            !active) {
            res.status(400).json({ message: "Бүх талбарыг бөглөнө үү." });
            return;
        }
        const existingUser = await user_model_1.default.findOne({ username });
        if (existingUser) {
            res
                .status(400)
                .json({ message: "Энэ хэрэглэгчийн нэр аль хэдийн ашиглагдаж байна." });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await user_model_1.default.create({
            username,
            firstname,
            lastname,
            password: hashedPassword,
            email,
            contactPhone,
            role,
            active,
            create_at: new Date(),
            updated_at: new Date(),
        });
        res.status(201).json({ message: "Admin амжилттай бүртгэгдлээ." });
    }
    catch (error) {
        console.error("Sign-up error:", error);
        res.status(500).json({ message: "Admin бүртгэхэд алдаа гарлаа." });
    }
};
exports.createAdmin = createAdmin;
const currentUser = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const usert = (0, jwt_1.decodeToken)(token);
            console.error(usert);
            const user = await user_model_1.default.findById(usert.id);
            res.status(200).json({
                role: user?.role,
                username: user?.username,
                message: "Success",
            });
        }
        else
            res.status(400).json({ message: "test" });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to get user data" });
    }
};
exports.currentUser = currentUser;
