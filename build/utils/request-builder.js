"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const httpsRequest = async (method, url, data, conf) => {
    const config = {
        method,
        url,
        data,
        ...conf,
    };
    try {
        const response = await axios_1.default.request(config);
        return { status: response.status, data: response.data, error: null };
    }
    catch (error) {
        const err = error;
        return {
            status: err.response?.status || 400,
            data: null,
            error: {
                status: err.response?.status || 400,
                message: err.message,
                data: err.response?.data,
            },
        };
    }
};
exports.default = httpsRequest;
