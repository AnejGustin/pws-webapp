import { Router } from "express";

import weatherRoutes from "./weather.routes";
import healthRoutes from "./health.routes";
import moonRoutes from "./moon.routes";

const router = Router();

router.use("/weather", weatherRoutes);
router.use("/moon", moonRoutes);
router.use("/health", healthRoutes);

export default router;
