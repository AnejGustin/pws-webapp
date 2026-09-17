import cron from "node-cron";
import axios from "axios";
import { logger } from "../logger/logger";
import { SunInfoFormat } from "shared";
import { SunInfoApiResponse, UvIndexApiResponse } from "../types/sun.types";

const SUN_API_URL = `https://api.sunrisesunset.io/json?lat=46.34&lng=15.42&time_format=unix`;
const UV_INDEX_API_URL = `https://uvindexapi.com/api/v1/forecast?latitude=46.34&longitude=15.42&timezone=UTC`;

export let sunInfo: SunInfoFormat = {
    last_update_time: null,
    sun: {
        sunrise: null,
        sunset: null,
        first_light: null,
        last_light: null,
        dawn: null,
        dusk: null,
        solar_noon: null,
        day_length: null,
        nautical_twilight_begin: null,
        nautical_twilight_end: null,
        sun_max_altitude: null,
    },
    uv: {
        now: {
            uv_index: null,
        },
        today: {
            max: {
                time: null,
                uv_index: null,
            }
        },
        tomorrow: {
            max: {
                time: null,
                uv_index: null,
            }
        },
    }
};

export async function fetchSunInfo() {
    logger.info(`[sun-info-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        const sunInfoResponse = await axios.get(SUN_API_URL);
        const uvIndexResponse = await axios.get(UV_INDEX_API_URL);

        if (!sunInfoResponse.data) {
            logger.warn("[sun-info-cron] No current sun data");
            return;
        }
        if (!uvIndexResponse.data) {
            logger.warn("[sun-info-cron] No current uv index data");
            return;
        }

        const sunData: SunInfoApiResponse = sunInfoResponse.data;
        const uvIndexData: UvIndexApiResponse = uvIndexResponse.data;

        sunInfo.last_update_time = Date.now();
        sunInfo.sun.sunrise = Number(sunData.results.sunrise) ?? null;
        sunInfo.sun.sunset = Number(sunData.results.sunset) ?? null;
        sunInfo.sun.first_light = Number(sunData.results.first_light) ?? null;
        sunInfo.sun.last_light = Number(sunData.results.last_light) ?? null;
        sunInfo.sun.dawn = Number(sunData.results.dawn) ?? null;
        sunInfo.sun.dusk = Number(sunData.results.dusk) ?? null;
        sunInfo.sun.solar_noon = Number(sunData.results.solar_noon) ?? null;
        sunInfo.sun.day_length = sunData.results.day_length ?? null;
        sunInfo.sun.nautical_twilight_begin = Number(sunData.results.nautical_twilight_begin) ?? null;
        sunInfo.sun.nautical_twilight_end = Number(sunData.results.nautical_twilight_end) ?? null;
        sunInfo.sun.sun_max_altitude = Number(sunData.results.sun_altitude) ?? null;

        sunInfo.uv.now.uv_index = uvIndexData.now.uv_index ?? null;
        sunInfo.uv.today.max.uv_index = uvIndexData.today.max.uv_index ?? null;
        sunInfo.uv.today.max.time = uvIndexData.today.max.time ?? null;
        sunInfo.uv.tomorrow.max.uv_index = uvIndexData.tomorrow.max.uv_index ?? null;
        sunInfo.uv.tomorrow.max.time = uvIndexData.tomorrow.max.time ?? null;

        // multiply times by 1000 to get unix time in miliseconds (API response returns unix time in seconds)
        if (sunInfo.sun.sunrise) {
            sunInfo.sun.sunrise *= 1000;
        }
        if (sunInfo.sun.sunset) {
            sunInfo.sun.sunset *= 1000;
        }
        if (sunInfo.sun.first_light) {
            sunInfo.sun.first_light *= 1000;
        }
        if (sunInfo.sun.last_light) {
            sunInfo.sun.last_light *= 1000;
        }
        if (sunInfo.sun.dawn) {
            sunInfo.sun.dawn *= 1000;
        }
        if (sunInfo.sun.dusk) {
            sunInfo.sun.dusk *= 1000;
        }
        if (sunInfo.sun.solar_noon) {
            sunInfo.sun.solar_noon *= 1000;
        }
        if (sunInfo.sun.nautical_twilight_begin) {
            sunInfo.sun.nautical_twilight_begin *= 1000;
        }
        if (sunInfo.sun.nautical_twilight_end) {
            sunInfo.sun.nautical_twilight_end *= 1000;
        }

        logger.info(`[sun-info-cron] Completed successfully`);
    } catch (err) {
        logger.error(`[sun-info-cron] Error while fetching current sun data: \n ${err}`);
    }
}

export function startSunInfoCron() {
    cron.schedule("0 0 */1 * * *", fetchSunInfo);
}