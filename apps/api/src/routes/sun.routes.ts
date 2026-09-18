import { Router } from "express";
import { getSunInfo } from "../controllers/sun.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/sun:
 *   get:
 *     summary: Get sun information
 *     description: Endpoint returns information about sunrise, sunset, twilight, solar noon, day length, sun altitude and UV index.
 *     responses:
 *       200:
 *         description: Successfull request returns sun and UV information. If no data is available, null is returned for the corresponding fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     last_update_time:
 *                       type: integer
 *                       nullable: true
 *                       example: 1789725812398
 *                     sun:
 *                       type: object
 *                       properties:
 *                         sunrise:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789706135000
 *                         sunset:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789751311000
 *                         first_light:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789699949000
 *                         last_light:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789757472000
 *                         dawn:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789704322000
 *                         dusk:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789753118000
 *                         solar_noon:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789728749000
 *                         day_length:
 *                           type: string
 *                           nullable: true
 *                           example: "12:32:56"
 *                         nautical_twilight_begin:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789702176000
 *                         nautical_twilight_end:
 *                           type: integer
 *                           nullable: true
 *                           example: 1789755256000
 *                         sun_max_altitude:
 *                           type: number
 *                           format: float
 *                           nullable: true
 *                           example: 45.44
 *                     uv:
 *                       type: object
 *                       properties:
 *                         now:
 *                           type: object
 *                           properties:
 *                             uv_index:
 *                               type: number
 *                               format: float
 *                               nullable: true
 *                               example: 4.4
 *                         today:
 *                           type: object
 *                           properties:
 *                             max:
 *                               type: object
 *                               properties:
 *                                 time:
 *                                   type: string
 *                                   nullable: true
 *                                   example: "11:00:00"
 *                                 uv_index:
 *                                   type: number
 *                                   format: float
 *                                   nullable: true
 *                                   example: 4.8
 *                         tomorrow:
 *                           type: object
 *                           properties:
 *                             max:
 *                               type: object
 *                               properties:
 *                                 time:
 *                                   type: string
 *                                   nullable: true
 *                                   example: "11:00:00"
 *                                 uv_index:
 *                                   type: number
 *                                   format: float
 *                                   nullable: true
 *                                   example: 4.8
 */
router.get("/", getSunInfo);

export default router;