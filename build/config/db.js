"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const connectDB = async (uri) => {
    // console.log("URI-IReedui", uri);
    try {
        const con = await mongoose_1.default.connect(uri);
        (0, logger_1.default)("debug", "database connected", con.connection.host);
        // console.log("", con.connection.host);
    }
    catch (error) {
        console.log("err", error);
        console.log("database cannot connected");
    }
};
exports.connectDB = connectDB;
