"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceFn = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const qpay_token_1 = require("../utils/qpay-token");
const request_builder_1 = __importDefault(require("../utils/request-builder"));
const createInvoiceFn = async (contactPhone, payment_id) => {
    const dynamicDescription = ` ${contactPhone}`;
    console.log(dynamicDescription);
    //   const payment_id = "12345678"
    console.log("payment_id", payment_id);
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
            amount: 50,
            callback_url: "https://enjoyai.steam.mn/api/v1/payment/payment_id?payment_id=" +
                payment_id,
            sender_staff_code: "online",
            note: null,
            invoice_receiver_data: {
                register: "РД7018585",
                name: "Munkhsaikhan",
                email: "test@gmail.com",
                phone: "99092085",
            },
            lines: [
                {
                    line_description: dynamicDescription,
                    line_quantity: 1.0,
                    line_unit_price: 50,
                    note: "-",
                },
            ],
        };
        const result = await (0, request_builder_1.default)("POST", "https://merchant.qpay.mn/v2/invoice", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
    }
    catch (error) {
        (0, logger_1.default)("error", "invoice create ", error);
        return null;
    }
};
exports.createInvoiceFn = createInvoiceFn;
