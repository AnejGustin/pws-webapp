import { Router } from "express";

import * as weatherController from "../controllers/weather.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/weather/forecast/zambretti/latest:
 *   get:
 *     summary: Get latest Zambretti forecast
 *     description: Endpoint returns last generated Zambretti forecast based on pressure trend.
 *     responses:
 *       200:
 *         description: Successfull request returns latest Zambretti forecast. If no forecast is found, null is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               nullable: true
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 264
 *                     forecast_text:
 *                       type: string
 *                       example: "Fine, Possibly Showers"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-08-02T13:34:37.180Z
 */
router.get(
  "/latest", weatherController.getLatestZambrettiForecast,
);

export default router;