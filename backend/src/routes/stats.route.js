import { Router } from "express";
import { getStats } from "../controller/stats.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;
