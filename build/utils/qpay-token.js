"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.getQPayToken = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const logger_1 = __importDefault(require("./logger"));
const request_builder_1 = __importDefault(require("./request-builder"));
const tokenCache = new node_cache_1.default();
const getQPayToken = async () => {
    const username = "MGLSTEM_EDU";
    const password = "eGVjSf7A";
    const basicauth = btoa(`${username}:${password}`);
    const result = await (0, request_builder_1.default)("POST", "https://merchant.qpay.mn/v2/auth/token", undefined, {
        headers: {
            Authorization: `Basic ${basicauth}`,
        },
    });
    if (result.error) {
        (0, logger_1.default)("error", "Failed get new token", result.error);
        return;
    }
    (0, logger_1.default)("info", "New token set to storeToken");
    storeToken(username, result.data.access_token);
    return result.data.access_token;
};
exports.getQPayToken = getQPayToken;
const getToken = () => {
    const username = "MGLSTEM_EDU";
    try {
        const data = tokenCache.get(username);
        if (!data)
            return null;
        if (Date.now() > data.expiresAt) {
            tokenCache.del(username);
            (0, logger_1.default)("info", "delete token");
            return null;
        }
        return data.token;
    }
    catch (err) {
        (0, logger_1.default)("error", "Токен кэшлэхэд алдаа гарлаа", err);
    }
};
exports.getToken = getToken;
const storeToken = (userId, token) => {
    const expiresAt = Date.now() + 36000 * 1000;
    const tokenData = { token, expiresAt };
    tokenCache.set(userId, tokenData, expiresAt);
};
