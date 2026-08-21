import type {
    NextFunction,
    Request,
    Response
} from "express";
import * as weatherService from "../services/weather.service";
import {
    WEATHER_STATION_TIMEZONE,
    weatherHistoryQuerySchema,
    weatherStatsQuerySchema
} from "shared";
import {
    mapStats,
    mapWeatherReading,
    mapZambrettiForecast
} from "../utils/weather.controller.utils";
import * as z from "zod";
import { toZonedTime } from "date-fns-tz";

export async function getLatestReading(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const [latestReading] = await weatherService.getLatestReading();

        if (!latestReading) {
            return res.status(200).json({
                data: null
            })
        }

        const response = {
            data: mapWeatherReading(latestReading)
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function getHistory(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const parseResult = weatherHistoryQuerySchema.safeParse(_req.query);

        if (!parseResult.success) {
            return res.status(400).json({
                error: {
                    code: "BAD_REQUEST",
                    message: "Invalid weather query parameters",
                    error: z.prettifyError(parseResult.error)
                }
            })
        }

        const from = parseResult.data.from;
        const to = parseResult.data.to;

        const readings = await weatherService.getReadingsForRange(from, to);

        if (!readings) {
            return res.status(200).json({
                data: null
            })
        }

        const readingsFormatted = readings.map(mapWeatherReading)

        const response = {
            data: readingsFormatted
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function getStats(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const parseResult = weatherStatsQuerySchema.safeParse(_req.query);

        if (!parseResult.success) {
            return res.status(400).json({
                error: {
                    code: "BAD_REQUEST",
                    message: "Invalid weather stats query parameters",
                    error: z.prettifyError(parseResult.error)
                }
            })
        }

        const period = parseResult.data.period;
        const date = parseResult.data.date!;
        let stats;

        const weatherStationTzDate = toZonedTime(date, WEATHER_STATION_TIMEZONE)

        switch (period) {
            case "all_time": {
                [stats] = await weatherService.getStatsForAllTime();
                break;
            }
            case "year": {
                [stats] = await weatherService.getStatsForYear(
                    weatherStationTzDate.getFullYear()
                );
                break;
            }
            case "month": {
                [stats] = await weatherService.getStatsForMonth(
                    weatherStationTzDate.getFullYear(),
                    weatherStationTzDate.getMonth() + 1
                );
                break;
            }
            case "day": {
                [stats] = await weatherService.getStatsForDay(
                    weatherStationTzDate.getFullYear(),
                    weatherStationTzDate.getMonth() + 1,
                    weatherStationTzDate.getDate()
                );
                break;
            }
        }

        if (!stats) {
            return res.status(200).json({
                data: null
            })
        }

        const response = {
            data: mapStats(stats)
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function getLatestZambrettiForecast(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const [latestZambrettiForecast] = await weatherService.getLatestZambrettiForecast();

        if (!latestZambrettiForecast) {
            return res.status(200).json({
                data: null
            })
        }

        const response = {
            data: mapZambrettiForecast(latestZambrettiForecast)
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}