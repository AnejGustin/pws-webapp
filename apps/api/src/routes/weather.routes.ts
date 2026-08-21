import { Router } from "express";

import * as weatherController from "../controllers/weather.controller";
import weatherForecastRoutes from "./weather.forecast.routes";
import { historyEndpointLimiter } from "../rate-limiter/rate.limiter";

const router = Router();

/**
 * @openapi
 * /api/v1/weather/latest:
 *   get:
 *     summary: Get latest weather data reported from weather station
 *     description: Endpoint returns latest weather data reported from weather station.
 *     responses:
 *       200:
 *         description: Successfull request returns latest weather data reported from weather station. If no data is found, null is returned.
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
 *                     observation_time:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-08-02T15:01:56.000Z
 *                     temperature:
 *                       type: integer
 *                       nullable: true
 *                       format: float
 *                       example: 33.1
 *                     dewpoint:
 *                       type: integer
 *                       nullable: true
 *                       format: float
 *                       example: 16.8
 *                     heat_index:
 *                       type: integer
 *                       nullable: true
 *                       format: float
 *                       example: 33.4
 *                     humidity:
 *                       type: integer
 *                       nullable: true
 *                       example: 38
 *                     pressure:
 *                       type: integer
 *                       nullable: true
 *                       format: float
 *                       example: 1013.5
 *                     wind:
 *                       type: object
 *                       properties:
 *                         speed:
 *                           type: integer
 *                           nullable: true
 *                           format: float
 *                           example: 5.1
 *                         gust:
 *                           type: integer
 *                           nullable: true
 *                           format: float
 *                           example: 7.1
 *                         direction:
 *                           type: integer
 *                           nullable: true
 *                           example: 147
 *                         chill:
 *                           type: integer
 *                           nullable: true
 *                           format: float
 *                           example: 32.9
 *                     precipitation:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           nullable: true
 *                           format: float
 *                           example: 1.1
 *                         rate:
 *                           type: integer
 *                           nullable: true
 *                           format: float
 *                           example: 7.5
 *                     radiation:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         solar:
 *                           type: integer
 *                           example: null
 *                         uv:
 *                           type: integer
 *                           example: null
 *                     deltas:
 *                       type: object
 *                       properties:
 *                         one_hour:
 *                           type: object
 *                           properties:
 *                             temperature:
 *                               type: integer
 *                               nullable: true
 *                               format: float
 *                               example: -0.2
 *                             pressure:
 *                               type: integer
 *                               nullable: true
 *                               format: float
 *                               example: 1.2
 */
router.get(
  "/latest",
  weatherController.getLatestReading,
);

/**
 * @openapi
 * /api/v1/weather/history:
 *   get:
 *     summary: Get historical weather data
 *     description: Endpoint returns weather data reported from the weather station within the specified time range.
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         example: 2026-08-02T00:00:00.000Z
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         example: 2026-08-02T23:59:59.999Z
 *     responses:
 *       200:
 *         description: Successful request returns an array of historical weather data. Can be null if no data for queried period is found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       observation_time:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-08-02T15:01:56.000Z
 *                       temperature:
 *                         type: number
 *                         nullable: true
 *                         format: float
 *                         example: 33
 *                       dewpoint:
 *                         type: number
 *                         nullable: true
 *                         format: float
 *                         example: 16.8
 *                       heatIndex:
 *                         type: number
 *                         nullable: true
 *                         format: float
 *                         example: 33.4
 *                       humidity:
 *                         type: number
 *                         nullable: true
 *                         format: float
 *                         example: 38
 *                       pressure:
 *                         type: number
 *                         nullable: true
 *                         format: float
 *                         example: 1013.5
 *                       wind:
 *                         type: object
 *                         properties:
 *                           speed:
 *                             type: number
 *                             nullable: true
 *                             format: float
 *                             example: 5
 *                           gust:
 *                             type: number
 *                             nullable: true
 *                             format: float
 *                             example: 7.2
 *                           direction:
 *                             type: number
 *                             nullable: true
 *                             format: float
 *                             example: 147
 *                           chill:
 *                             type: number
 *                             nullable: true
 *                             format: float
 *                             example: 33
 *                       precipitation:
 *                         type: object
 *                         properties:
 *                           total:
 *                             type: number
 *                             nullable: true
 *                             format: float
 *                             example: 0
 *                           rate:
 *                             type: number
 *                             nullable: true
 *                             format: float
 *                             example: 0
 *                       radiation:
 *                         type: object
 *                         properties:
 *                           solar:
 *                             type: number
 *                             format: float
 *                             nullable: true
 *                             example: null
 *                           uv:
 *                             type: number
 *                             format: float
 *                             nullable: true
 *                             example: null
 *                       deltas:
 *                         type: object
 *                         properties:
 *                           one_hour:
 *                             type: object
 *                             properties:
 *                               temperature:
 *                                 type: number
 *                                 nullable: true
 *                                 format: float
 *                                 example: -0.3
 *                               pressure:
 *                                 type: number
 *                                 nullable: true
 *                                 format: float
 *                                 example: -0.1
  *       400:
 *         description: Invalid from or to date.
 */
router.get(
  "/history",
  historyEndpointLimiter,
  weatherController.getHistory,
);

/**
 * @swagger
 * /api/v1/weather/stats:
 *   get:
 *     summary: Get weather stats
 *     description: Returns aggregated weather statistics for the specified period and date.
 *     parameters:
 *       - in: query
 *         name: period
 *         required: true
 *         description: Time period for which weather statistics should be returned.
 *         schema:
 *           type: string
 *           enum:
 *             - all_time
 *             - day
 *             - month
 *             - year
 *           example: day
 *
 *       - in: query
 *         name: date
 *         required: true
 *         description: Reference date for the requested period.
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2026-06-20T03:59:59.999Z"
 *
 *     responses:
 *       200:
 *         description: Weather stats data successfully retrieved. Can be null if no stats are available for selected period/date.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     observation_time:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-06-20T23:33:52.000Z"
 *
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-06-19T22:01:02.554Z"
 *
 *                     id:
 *                       type: integer
 *                       example: 14935
 *
 *                     period:
 *                       type: string
 *                       enum:
 *                         - all_time
 *                         - day
 *                         - month
 *                         - year
 *                       example: day
 *
 *                     day:
 *                       type: integer
 *                       nullable: true
 *                       example: 20
 *
 *                     month:
 *                       type: integer
 *                       example: 6
 *
 *                     year:
 *                       type: integer
 *                       example: 2026
 *
 *                     temperature:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 20.2
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 31.3
 *                         avg:
 *                           type: number
 *                           example: 25.09
 *
 *                     dewpoint:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 15.2
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 21.8
 *                         avg:
 *                           type: number
 *                           example: 17.35
 *
 *                     humidity:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 53
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 82
 *                         avg:
 *                           type: number
 *                           example: 62.44
 *
 *                     heat_index:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 20.2
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 34.7
 *                         avg:
 *                           type: number
 *                           example: 25.66
 *
 *                     pressure:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 1019.9
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 1023.6
 *                         avg:
 *                           type: number
 *                           example: 1021.9
 *
 *                     wind_speed:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 0
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 23.8
 *                         avg:
 *                           type: number
 *                           example: 3.72
 *
 *                     wind_direction:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *                         avg:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *
 *                     wind_gust:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 0
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 33.5
 *                         avg:
 *                           type: number
 *                           example: 8.44
 *
 *                     wind_chill:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 20.2
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 31.3
 *                         avg:
 *                           type: number
 *                           example: 25.09
 *
 *                     precipitation:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 0
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 0
 *                         avg:
 *                           type: number
 *                           example: 0
 *
 *                     precipitation_rate:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: 0
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: 0
 *                         avg:
 *                           type: number
 *                           example: 0
 *
 *                     solar_radiation:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *                         avg:
 *                           type: number
 *                           example: 0
 *
 *                     uv:
 *                       type: object
 *                       properties:
 *                         min:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *                         max:
 *                           type: number
 *                           nullable: true
 *                           example: null
 *                         avg:
 *                           type: number
 *                           example: 0
 *
 *       400:
 *         description: Invalid period or date.
 */
router.get(
  "/stats",
  weatherController.getStats,
);

router.use("/forecast", weatherForecastRoutes);

export default router;