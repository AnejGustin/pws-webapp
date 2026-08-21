import { Router } from "express";

import weatherRoutes from "./weather.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/weather", weatherRoutes);
router.use("/health", healthRoutes);

export default router;
