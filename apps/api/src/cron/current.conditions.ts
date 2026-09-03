import cron from "node-cron";
import axios from "axios";
import { logger } from "../logger/logger";
import { CurrentWeatherConditionsFormat } from "shared";
import { AirQualityApiResponse, CurrentConditionsApiResponse, UvIndexApiResponse } from "../types/current.conditions.types";

const OW_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const CURRENT_CONDITIONS_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=46.34&lon=15.42&appid=${OW_API_KEY}`;
const AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=46.34&lon=15.42&appid=${OW_API_KEY}`;
const UV_INDEX_API_URL = `https://uvindexapi.com/api/v1/forecast?latitude=46.34&longitude=15.42&timezone=UTC`

export let currentWeatherConditions: CurrentWeatherConditionsFormat = {
    sunrise: null,
    sunset: null,
    visibility: null,
    weather_description: null,
    cloud_cover: null,
    aqi: null,
    uv_index: null,
    last_update_time: null,
};

export async function fetchCurrentConditions() {
    logger.info(`[current-conditions-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        const currentConditions = await axios.get(CURRENT_CONDITIONS_API_URL);
        const currentAirQuality = await axios.get(AIR_POLLUTION_API_URL);
        const uvIndexResponse = await axios.get(UV_INDEX_API_URL);

        if (!currentConditions.data) {
            logger.warn("[current-conditions-cron] No current conditions data");
            return;
        }

        if (!currentAirQuality.data) {
            logger.warn("[current-conditions-cron] No current air quality data");
            return;
        }

        if (!uvIndexResponse.data) {
            logger.warn("[current-conditions-cron] No uv index data");
            return;
        }

        const uvIndexData: UvIndexApiResponse = uvIndexResponse.data;
        const airQualityData: AirQualityApiResponse = currentAirQuality.data;
        const currentWeatherData: CurrentConditionsApiResponse = currentConditions.data;

        currentWeatherConditions.aqi = airQualityData.list[0]?.main?.aqi ?? null;
        currentWeatherConditions.sunrise = currentWeatherData.sys?.sunrise ?? null;
        currentWeatherConditions.sunset = currentWeatherData.sys?.sunset ?? null;
        currentWeatherConditions.visibility = currentWeatherData.visibility ?? null;
        currentWeatherConditions.weather_description = currentWeatherData.weather[0]?.description ?? null;
        currentWeatherConditions.cloud_cover = currentWeatherData.clouds?.all ?? null;
        currentWeatherConditions.uv_index = uvIndexData.now?.uv_index ?? null;
        currentWeatherConditions.last_update_time = currentWeatherData.dt ?? null;

        // multiply times by 1000 to get unix time in miliseconds (API response has unix time in seconds)
        if(currentWeatherConditions.sunrise) {
            currentWeatherConditions.sunrise *= 1000;
        }

        if(currentWeatherConditions.sunset) {
            currentWeatherConditions.sunset *= 1000;
        }

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