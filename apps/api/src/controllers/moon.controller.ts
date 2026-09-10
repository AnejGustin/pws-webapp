import { NextFunction, Response, Request } from "express";
import * as moonService from "../services/moon.service";

export async function getCurrentMoonInfo(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const currentMoonInfo = moonService.getCurrentMoonInfo();

        const response = {
            data: currentMoonInfo
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}