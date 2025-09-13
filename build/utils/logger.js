"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = (level, message, data) => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    if (data) {
        console[level === "error" ? "error" : "log"](`${prefix} ${message}`, data);
    }
    else {
        console[level === "error" ? "error" : "log"](`${prefix} ${message}`);
    }
};
exports.default = log;
