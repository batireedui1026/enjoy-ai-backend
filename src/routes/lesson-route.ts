import { Router } from "express";
import { createLesson, getLesson } from "../controllers/lesson-controller";
const router = Router();
router.post("/", createLesson);
router.get("/", getLesson);
// test
export default router;
