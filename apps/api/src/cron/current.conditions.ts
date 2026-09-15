import cron from "node-cron";
import axios from "axios";
import { logger } from "../logger/logger";
import { CurrentWeatherConditionsFormat } from "shared";
import { AirQualityApiResponse, CurrentConditionsApiResponse } from "../types/current.conditions.types";

const OW_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const CURRENT_CONDITIONS_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=46.34&lon=15.42&appid=${OW_API_KEY}`;
const AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=46.34&lon=15.42&appid=${OW_API_KEY}`;

export let currentWeatherConditions: CurrentWeatherConditionsFormat = {
    last_update_time: null,
    visibility: null,
    weather_description: null,
    cloud_cover: null,
    aq: {
        aqi: null,
        co: null,
        no: null,
        no2: null,
        o3: null,
        so2: null,
        pm2_5: null,
        pm10: null,
        nh3: null,
    },
};

export async function fetchCurrentConditions() {
    logger.info(`[current-conditions-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        const currentConditions = await axios.get(CURRENT_CONDITIONS_API_URL);
        const currentAirQuality = await axios.get(AIR_POLLUTION_API_URL);

        if (!currentConditions.data) {
            logger.warn("[current-conditions-cron] No current conditions data");
            return;
        }

        if (!currentAirQuality.data) {
            logger.warn("[current-conditions-cron] No current air quality data");
            return;
        }

        const airQualityData: AirQualityApiResponse = currentAirQuality.data;
        const currentWeatherData: CurrentConditionsApiResponse = currentConditions.data;

        currentWeatherConditions.aq.aqi = airQualityData.list[0]?.main?.aqi ?? null;
        currentWeatherConditions.aq.co = Number(airQualityData.list[0]?.components.co?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.nh3 = Number(airQualityData.list[0]?.components.nh3?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.no = Number(airQualityData.list[0]?.components.no?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.no2 = Number(airQualityData.list[0]?.components.no2?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.o3 = Number(airQualityData.list[0]?.components.o3?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.pm10 = Number(airQualityData.list[0]?.components.pm10?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.pm2_5 = Number(airQualityData.list[0]?.components.pm2_5?.toFixed(1)) ?? null;
        currentWeatherConditions.aq.so2 = Number(airQualityData.list[0]?.components.so2?.toFixed(1)) ?? null;
        currentWeatherConditions.visibility = currentWeatherData.visibility ?? null;
        currentWeatherConditions.weather_description = currentWeatherData.weather[0]?.description ?? null;
        currentWeatherConditions.cloud_cover = currentWeatherData.clouds?.all ?? null;
        currentWeatherConditions.last_update_time = currentWeatherData.dt ?? null;

        // multiply update time by 1000 to get unix time in miliseconds (API response from openweather returns unix time in seconds)
        if(currentWeatherConditions.last_update_time) {
            currentWeatherConditions.last_update_time *= 1000;
        }

        logger.info(`[current-conditions-cron] Completed successfully`);
    } catch (err) {
        logger.error(`[current-conditions-cron] Error while fetching current weather conditions data: \n ${err}`);
    }
}

export function startCurrentConditionsCron() {
    cron.schedule("*/10 * * * *", fetchCurrentConditions);
}