import { Router } from "express";
import { getAlerts } from "../controllers/weather.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/weather/alerts:
 *   get:
 *     summary: Get weather alerts
 *     description: Endpoint returns expired, active and upcoming weather alerts.
 *     responses:
 *       200:
 *         description: Successfull request returns weather alerts. If no data is available, null is returned.
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
 *                       example: 1789725812400
 *                     alerts:
 *                       type: object
 *                       properties:
 *                         expired:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               language:
 *                                 type: string
 *                                 example: "sl"
 *                               onset:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-09-18T01:00:00+02:00"
 *                               expires:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-09-18T23:59:00+02:00"
 *                               headline:
 *                                 type: string
 *                                 example: "Dež - zmerna ogroženost (Stopnja 2/4) - Slovenija / jugozahod"
 *                               description:
 *                                 type: string
 *                                 example: "Možni so nalivi. Količina padavin : od 20 do 40 mm/6h. Hudourniški vodotoki lahko hitro narastejo in se razlijejo."
 *                               instruction:
 *                                 type: string
 *                                 example: "Ljudje, ki živijo na ogroženih območjih, naj spremljajo trend vodostaja in hidrološka obvestila."
 *                               color:
 *                                 type: string
 *                                 example: "yellow"
 *                               category:
 *                                 type: string
 *                                 example: "rain"
 *                         active:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               language:
 *                                 type: string
 *                                 example: "sl"
 *                               onset:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-09-18T01:00:00+02:00"
 *                               expires:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-09-18T23:59:00+02:00"
 *                               headline:
 *                                 type: string
 *                                 example: "Dež - zmerna ogroženost (Stopnja 2/4) - Slovenija / jugozahod"
 *                               description:
 *                                 type: string
 *                                 example: "Možni so nalivi. Količina padavin : od 20 do 40 mm/6h. Hudourniški vodotoki lahko hitro narastejo in se razlijejo."
 *                               instruction:
 *                                 type: string
 *                                 example: "Ljudje, ki živijo na ogroženih območjih, naj spremljajo trend vodostaja in hidrološka obvestila."
 *                               color:
 *                                 type: string
 *                                 example: "yellow"
 *                               category:
 *                                 type: string
 *                                 example: "rain"
 *                         upcoming:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               language:
 *                                 type: string
 *                                 example: "sl"
 *                               onset:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-09-21T05:00:00+02:00"
 *                               expires:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-09-21T23:59:00+02:00"
 *                               headline:
 *                                 type: string
 *                                 example: "Veter - zmerna ogroženost (Stopnja 2/4) - Slovenija / jugozahod"
 *                               description:
 *                                 type: string
 *                                 example: "Maksimalna hitrost vetra : od 70 do 85 km/h. Veter maje drevesa in lahko že lomi veje."
 *                               instruction:
 *                                 type: string
 *                                 example: "Pred dogodkom: zaprite vsa okna in vrata. Pospravite ali pritrdite vse, kar bi veter lahko raznašal."
 *                               color:
 *                                 type: string
 *                                 example: "yellow"
 *                               category:
 *                                 type: string
 *                                 example: "wind"
 */
router.use("/", getAlerts);

export default router;