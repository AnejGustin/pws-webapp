import { NextFunction, Response, Request } from "express";
import * as sunService from "../services/sun.service";

export async function getSunInfo(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const sunInfo = sunService.getSunInfo();

        if (sunInfo.last_update_time === null) {
            return res.status(200).json({
                data: null
            })
        }

        const response = {
            data: sunInfo
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}