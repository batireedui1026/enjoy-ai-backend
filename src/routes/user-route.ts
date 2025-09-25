import { Router } from "express";
import { currentUser, login } from "../controllers/user-controller";
import { createAdmin } from "../controllers/user-controller";
const router = Router();

router.post("/login", login);
router.post("/create-admin", createAdmin);
router.get("/current-user", currentUser);
// d
export default router;
