"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { NextFunction, Request, Response } from "express";
dotenv_1.default.config();
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN_PASSWORD || "", {
        expiresIn: "1d",
    });
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_PASSWORD || "");
};
exports.decodeToken = decodeToken;
