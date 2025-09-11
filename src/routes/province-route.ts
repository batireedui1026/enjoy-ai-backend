import { Router } from "express";
import {
  createProvince,
  getProvince,
} from "../controllers/province-controller";
import { create } from "domain";
const router = Router();
router.get("/", getProvince);
router.post("/", createProvince);
export default router;
