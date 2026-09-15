import { Router } from "express";
import { getSunInfo } from "../controllers/sun.controller";

const router = Router();

router.get("/", getSunInfo);

export default router;