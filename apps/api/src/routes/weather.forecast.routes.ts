import { Router } from "express";

import zambrettiRoutes from "./weather.forecast.zambretti.routes";

const router = Router();

router.use("/zambretti", zambrettiRoutes);

export default router;