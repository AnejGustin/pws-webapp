import { Router } from "express";
import { getCurrentMoonInfo } from "../controllers/moon.controller";

const router = Router();

router.get("/current", getCurrentMoonInfo);

export default router;