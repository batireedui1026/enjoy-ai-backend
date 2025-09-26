"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const user_controller_2 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
router.post("/login", user_controller_1.login);
router.post("/create-admin", user_controller_2.createAdmin);
router.get("/current-user", user_controller_1.currentUser);
// d
exports.default = router;
