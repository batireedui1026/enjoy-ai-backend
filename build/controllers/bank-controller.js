"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackWebhook = exports.downloadPayment = exports.deleteInvoice = exports.checkInvoice = exports.createInvoice = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const qpay_token_1 = require("../utils/qpay-token");
const request_builder_1 = __importDefault(require("../utils/request-builder"));
// import Invoice from "../models/invoice.model";
const register_model_1 = __importDefault(require("../models/register.model"));
const createInvoice = async (req, res) => {
    const { province, contactPhone } = req.body;
    const dynamicDescription = `${province} ${contactPhone}`;
    console.log(dynamicDescription);
    const payment_id = "12345678";
    try {
        let token = (0, qpay_token_1.getToken)();
        if (token === null) {
            (0, logger_1.default)("warn", "Token null get new token");
            token = await (0, qpay_token_1.getQPayToken)();
        }
        const body = {
            invoice_code: "MGLSTEM_EDU_INVOICE",
            sender_invoice_no: "123455678",
            invoice_receiver_code: "83",
            sender_branch_code: "BRANCH1",
            invoice_description: dynamicDescription,
            enable_expiry: false,
            allow_partial: false,
            minimum_amount: null,
            allow_exceed: false,
            maximum_amount: null,
            amount: 85000,
            callback_url: "https://steamhub.mn/api/v1/payment/payment_id?payment_id=" +
                payment_id,
            sender_staff_code: "online",
            note: null,
            invoice_receiver_data: {
                register: "РД7018585",
                name: "Munkhsaikhan",
                email: "Info@unitelhub.mn",
                phone: "99092085",
            },
            lines: [
                {
                    line_description: dynamicDescription,
                    line_quantity: 1.0,
                    line_unit_price: 85000,
                    note: "-",
                },
            ],
        };
        const result = await (0, request_builder_1.default)("POST", "https://merchant.qpay.mn/v2/invoice", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(result);
        res.status(200).json({ result });
    }
    catch (error) {
        (0, logger_1.default)("error", "Нэхэмжлэл үүсгэхэд алдаа гарлаа", error);
        res.status(500).json({ message: "Алдаа гарлаа", error });
    }
};
exports.createInvoice = createInvoice;
// tulbur shalgahad checkincoice duudna omno n incoiceid yvuulj baigaa utga irne tulbur shalgasd, body goor regiterartion id tulbur toloh
const checkInvoice = async (req, res) => {
    const id = req.params.invoice_id;
    const { trainingType, location, schoolName, teamName, LastName, FirstName, teacherName, ages, contactPhone, } = req.body;
    try {
        let token = (0, qpay_token_1.getToken)();
        if (token === null) {
            (0, logger_1.default)("warn", "Token null get new token");
            token = await (0, qpay_token_1.getQPayToken)();
        }
        const body = {
            object_type: "INVOICE",
            object_id: id,
            offset: {
                page_number: 1,
                page_limit: 100,
            },
        };
        const result = await (0, request_builder_1.default)("POST", "https://merchant.qpay.mn/v2/payment/check", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (result?.data.rows?.[0]?.payment_status === "PAID") {
            // const paymentId = req.query.payment_id as string;
            await register_model_1.default.updateOne({ invoiceId: id }, {
                $set: {
                    paymentStatus: "paid",
                    paymentAmount: result?.data.rows?.[0]?.payment_amount,
                    expireAt: null,
                    paidAt: new Date(),
                },
            });
        }
        res.status(200).json({ result });
    }
    catch (error) {
        (0, logger_1.default)("error", "Нэхэмжлэл үүсгэхэд алдаа гарлаа", error);
        res.status(500).json({ message: "Алдаа гарлаа", error });
    }
};
exports.checkInvoice = checkInvoice;
const deleteInvoice = async (req, res) => {
    const id = req.params.invoice_id;
    if (!id)
        return res.status(400).json({ message: "Invoice ID is required." });
    try {
        let token = (0, qpay_token_1.getToken)();
        if (token === null) {
            (0, logger_1.default)("warn", "Token null get new token");
            token = await (0, qpay_token_1.getQPayToken)();
        }
        const body = {
            object_type: "INVOICE",
            object_id: id,
        };
        const result = await (0, request_builder_1.default)("DELETE", "https://merchant.qpay.mn/v2/payment/cancel", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        (0, logger_1.default)("error", "Нэхэмжлэл цуцлахад алдаа гарлаа", error);
        res.status(500).json({ message: "Цуцлахад алдаа гарлаа", error });
    }
};
exports.deleteInvoice = deleteInvoice;
const downloadPayment = async (req, res) => {
    const id = req.params.payment_id;
    try {
        let token = (0, qpay_token_1.getToken)();
        if (token === null) {
            (0, logger_1.default)("warn", "Token null get new token");
            token = await (0, qpay_token_1.getQPayToken)();
        }
        const result = await (0, request_builder_1.default)("GET", "https://merchant.qpay.mn/v2/payment/cancel", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        (0, logger_1.default)("error", "Нэхэмжлэл татахад алдаа гарлаа", error);
        res.status(500).json({ message: "Алдаа гарлаа", error });
    }
};
exports.downloadPayment = downloadPayment;
const callbackWebhook = async (req, res) => {
    const paymentId = req.query.payment_id;
    try {
        // is here
        await register_model_1.default.findByIdAndUpdate(paymentId, {
            paymentStatus: "paid",
            expireAt: null,
            // paymentAmount: 85000,
            paidAt: new Date(),
        });
        (0, logger_1.default)("info", "callback url paymentId: " + paymentId, "OK");
    }
    catch (error) {
        (0, logger_1.default)("error", "callback url error: " + paymentId, error);
    }
    res.status(200).send("SUCCESS");
};
exports.callbackWebhook = callbackWebhook;
