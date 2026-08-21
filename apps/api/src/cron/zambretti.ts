import cron from "node-cron";
import {
    db,
    forecastZambretti
} from "db";
import {
    getWeatherData,
    zambretti
} from "../utils/zambretti.utils";
import { logger } from "../logger/logger";

export async function getZambrettiForecast() {
    logger.info(`[zambretti-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        const weatherData = await getWeatherData();

        const forecast = zambretti(weatherData);

        if (!forecast) {
            logger.warn("[zambretti-cron] No pressure trends for 3 hours ago available, skipping Zambretti forecast");
            return;
        }

        const inserted = await db
            .insert(forecastZambretti)
            .values(
                {
                    forecastText: forecast
                }
            ).returning();
        
        if(inserted.length <= 0) {
            logger.warn(`[zambretti-cron] Nothing was inserted into zambretti_forecast table`);
            return;
        }

        logger.info(`[zambretti-cron] Inserted ${inserted.length} rows into zambretti_forecast table`);
        logger.info(`[zambretti-cron] Zambretti forecast done`);
    } catch (err) {
        logger.error(`[zambretti-cron] Error while preparing Zambretti forecast: \n ${err}`);
    }
}

export function startZambrettiCron() {
    cron.schedule("0 0 */1 * * *", getZambrettiForecast);
}