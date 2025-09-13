"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const province_controller_1 = require("../controllers/province-controller");
const router = (0, express_1.Router)();
router.get("/", province_controller_1.getProvince);
router.post("/", province_controller_1.createProvince);
exports.default = router;
