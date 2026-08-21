import cron from "node-cron";
import axios from "axios";
import {
    db,
    observations
} from "db";
import {
    calculateOneHourDelta,
    parseReadings,
    resetStats,
    updateStats,
    updateWeatherStats
} from "../utils/weather.cron.utils";
import { logger } from "../logger/logger";
import { WeatherStats } from "../types/weather.types";

const WU_API_KEY = process.env.WEATHER_UNDERGROUND_API_KEY;
const API_URL = `https://api.weather.com/v2/pws/observations/current?stationId=ISLOVE200&format=json&units=m&apiKey=${WU_API_KEY}&numericPrecision=decimal`;

let weatherStatsLast30Minutes: WeatherStats = {
    minTemperature: null,
    maxTemperature: null,

    minDewpoint: null,
    maxDewpoint: null,

    minHumidity: null,
    maxHumidity: null,

    minHeatIndex: null,
    maxHeatIndex: null,

    minPressure: null,
    maxPressure: null,

    minWindChill: null,
    maxWindChill: null,

    maxWindGust: null,

    maxPrecipitation: null,

    maxPrecipitationRate: null,

    maxSolarRadiation: null,

    maxUv: null,

    maxWindSpeed: null,
};

export async function fetchReadings() {
    logger.info(`[weather-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        const { data } = await axios.get(API_URL);

        if (!data.observations) {
            logger.warn("[weather-cron] No valid observation data");
            return;
        }

        const reading = parseReadings(data);

        if (reading === undefined) {
            logger.warn("[weather-cron] Reading is undefined!");
            return;
        }

        let pressureDelta = null, temperatureDelta = null;

        if (reading.temperature != null) {
            temperatureDelta = await calculateOneHourDelta(reading.temperature, "temperature");
        }
        if (reading.pressure != null) {
            pressureDelta = await calculateOneHourDelta(reading.pressure, "pressure");
        }

        const toInsert = {
            ...reading,
            pressureDeltaLastHour: pressureDelta,
            temperatureDeltaLastHour: temperatureDelta,
        }

        const inserted = await db.insert(observations).values(toInsert).onConflictDoNothing().returning();

        if (inserted.length <= 0) {
            logger.warn("[weather-cron] Nothing was inserted in observations table.");
            return;
        }

        logger.info(`[weather-cron] Inserted latest weather data in observations table.`);

        const minutes = new Date().getMinutes();

        weatherStatsLast30Minutes = updateWeatherStats(weatherStatsLast30Minutes, reading);
        // insert/update stats only every 30 minutes, 1 and 31 because WU sends data that is 1 minute old
        if (minutes === 1 || minutes === 31) {
            await updateStats(reading, weatherStatsLast30Minutes);
            weatherStatsLast30Minutes = resetStats();
        }

        logger.info(`[weather-cron] Completed successfully`);
    } catch (err) {
        logger.error(`[weather-cron] Error while fetching weather data: \n ${err}`);
    }
}

export function startWeatherCron() {
    cron.schedule("* * * * *", fetchReadings);
}