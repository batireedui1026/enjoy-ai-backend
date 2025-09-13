"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bank_controller_1 = require("../controllers/bank-controller");
const paymentRoute = (app) => {
    app.post("/api/v1/payment/create/invoice", bank_controller_1.createInvoice);
    app.post("/api/v1/payment/check/invoice/:invoice_id", bank_controller_1.checkInvoice);
    app.delete("/api/v1/payment/check/invoice/:invoice_id", bank_controller_1.deleteInvoice);
    app.get("/api/v1/payment/check/invoice/:payment_id", bank_controller_1.downloadPayment);
    app.get("/api/v1/payment/payment_id", bank_controller_1.callbackWebhook);
};
exports.default = paymentRoute;
