import { Router } from "express";
import { getCurrentMoonInfo } from "../controllers/moon.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/moon/current:
 *   get:
 *     summary: Get current moon information
 *     description: Endpoint returns current moon information such as name, illumination, rise and set time, forecast data and more.
 *     responses:
 *       200:
 *         description: Successfull request returns current moon information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     last_update_time:
 *                       type: integer
 *                       nullable: true
 *                       example: 1788582208000
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       example: "Waxing Crescent"
 *                     phase_angle_deg:
 *                       type: integer
 *                       format: float
 *                       nullable: true
 *                       example: 16.48
 *                     illumination:
 *                       type: number
 *                       format: float
 *                       nullable: true
 *                       example: 0.00213
 *                     age_days:
 *                       type: integer
 *                       format: float
 *                       nullable: true
 *                       example: 1.2
 *                     distance_km:
 *                       type: integer
 *                       nullable: true
 *                       example: 382228
 *                     rise_set:
 *                       type: object
 *                       properties:
 *                         rise_time:
 *                           type: string
 *                           nullable: true
 *                           example: "2026-09-12T05:58:38Z"
 *                         set_time:
 *                           type: string
 *                           nullable: true
 *                           example: "2026-09-12T17:32:08Z"
 *                     special_moon_labels:
 *                       type: array
 *                       items:
 *                           type: string
 *                       nullable: true
 *                       example: ["Blood moon"]
 *                     eclipse:
 *                       type: object
 *                       properties:
 *                         is_eclipse:
 *                           type: boolean
 *                           nullable: true
 *                           example: false
 *                         is_blood_moon:
 *                           type: boolean
 *                           nullable: true
 *                           example: false
 *                     forecast:
 *                       type: object
 *                       properties:
 *                         full_moon:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               nullable: true
 *                               example: "2026-09-26T17:13:19Z"
 *                             days_until:
 *                               type: number
 *                               format: float
 *                               nullable: true
 *                               example: 14.3
 *                         new_moon:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               nullable: true
 *                               example: "2026-10-10T15:49:36Z"
 *                             days_until:
 *                               type: number
 *                               format: float
 *                               nullable: true
 *                               example: 28.2
 *                         first_quarter:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               nullable: true
 *                               example: "2026-09-18T19:46:19Z"
 *                         last_quarter:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               nullable: true
 *                               example: "2026-10-03T14:01:09Z"
 *                         next_special_moon:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               nullable: true
 *                               example: "2026-12-12T11:55:53.851Z"
 *                             days_until:
 *                               type: number
 *                               format: float
 *                               nullable: true
 *                               example: 103
 *                             type:
 *                               type: string
 *                               nullable: true
 *                               example: "Supermoon"
 *                         next_eclipse:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               nullable: true
 *                               example: "2027-02-20T23:12:52Z"
 *                             days_until:
 *                               type: number
 *                               format: float
 *                               nullable: true
 *                               example: 161.5
 *                             type:
 *                               type: string
 *                               nullable: true
 *                               example: "penumbral"
 *                             is_blood_moon:
 *                               type: boolean
 *                               nullable: true
 *                               example: false
 */
router.get("/current", getCurrentMoonInfo);

export default router;