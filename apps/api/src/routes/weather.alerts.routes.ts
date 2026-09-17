import { Router } from "express";
import { getAlerts } from "../controllers/weather.controller";

const router = Router();

router.use("/", getAlerts);

export default router;