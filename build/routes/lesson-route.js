"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = require("../controllers/lesson-controller");
const router = (0, express_1.Router)();
router.post("/", lesson_controller_1.createLesson);
router.get("/", lesson_controller_1.getLesson);
exports.default = router;
