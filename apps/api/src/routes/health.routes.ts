import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Check API health
 *     responses:
 *       200:
 *         description: Get health status of API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Healthy!"
 */
router.get("/", (_req, res) => {
  res.json({ ok: true, message: "Healthy!" });
});

export default router;