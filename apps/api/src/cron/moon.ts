import cron from "node-cron";
import axios from "axios";
import { logger } from "../logger/logger";
import { CurrentMoonInfoApiResponse } from "../types/moon.types";
import { CurrentMoonInfoFormat } from "shared";

const MOON_API_KEY = process.env.MOON_API_KEY;
const MOON_API_URL = `https://api.freeastroapi.com/api/v1/moon/phase`;
const MOON_API_PARAMS = {
    lat: 46.34,
    lon: 15.42,
    include_forecast: true,
    include_special: true,
    include_rise_set: true,
}

export let currentMoonInfo: CurrentMoonInfoFormat = {
    last_update_time: null,
    name: null,
    phase_angle_deg: null,
    illumination: null,
    age_days: null,
    distance_km: null,
    rise_set: {
        rise_time: null,
        set_time: null,
    },
    special_moon_labels: null,
    eclipse: {
        is_eclipse: null,
        is_blood_moon: null,
    },
    forecast: {
        full_moon: {
            date: null,
            days_until: null,
        },
        new_moon: {
            date: null,
            days_until: null,
        },
        first_quarter: {
            date: null,
        },
        last_quarter: {
            date: null,
        },
        next_special_moon: {
            date: null,
            days_until: null,
            type: null,
        },
        next_eclipse: {
            date: null,
            days_until: null,
            type: null,
            is_blood_moon: null,
        },
    },
};

export async function fetchMoonInfo() {
    logger.info(`[moon-info-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        const moonInfoResponse = await axios.get(MOON_API_URL,
            {
                params: MOON_API_PARAMS,
                headers: {
                    "x-api-key": MOON_API_KEY
                }
            }
        );

        if (!moonInfoResponse.data) {
            logger.warn("[moon-info-cron] No current moon data");
            return;
        }

        const moonData: CurrentMoonInfoApiResponse = moonInfoResponse.data;

        currentMoonInfo.last_update_time = Date.now();
        currentMoonInfo.name = moonData.phase?.name ?? null;
        currentMoonInfo.phase_angle_deg = moonData.phase?.phase_angle_deg ?? null;
        currentMoonInfo.age_days = moonData.phase?.age_days ?? null;
        currentMoonInfo.distance_km = moonData.phase?.distance_km ?? null;
        currentMoonInfo.illumination = moonData.phase?.illumination ?? null;
        currentMoonInfo.rise_set.rise_time = moonData.rise_set?.rise ?? null;
        currentMoonInfo.rise_set.set_time = moonData.rise_set?.set ?? null;
        currentMoonInfo.special_moon_labels = moonData.special_moon?.labels.length > 0
        ? moonData.special_moon?.labels
        : null;
        currentMoonInfo.eclipse.is_blood_moon = moonData.eclipse?.is_eclipse ?? null;
        currentMoonInfo.eclipse.is_eclipse = moonData.eclipse?.is_blood_moon ?? null;
        currentMoonInfo.forecast.first_quarter.date = moonData.next_phases?.first_quarter ?? null;
        currentMoonInfo.forecast.full_moon.date = moonData.next_phases?.full_moon ?? null;
        currentMoonInfo.forecast.full_moon.days_until = moonData.forecast?.days_until_full_moon ?? null;
        currentMoonInfo.forecast.last_quarter.date = moonData.next_phases?.last_quarter ?? null;
        currentMoonInfo.forecast.new_moon.date = moonData.next_phases?.new_moon ?? null;
        currentMoonInfo.forecast.new_moon.days_until = moonData.forecast.days_until_new_moon ?? null;
        currentMoonInfo.forecast.next_special_moon.days_until = moonData.forecast?.next_special_moon?.days_until ?? null;
        currentMoonInfo.forecast.next_special_moon.type = moonData.forecast?.next_special_moon?.type ?? null;
        currentMoonInfo.forecast.next_special_moon.date = currentMoonInfo.forecast.next_special_moon.days_until != null
        ? new Date(Date.now() + currentMoonInfo.forecast.next_special_moon.days_until * 24 * 60 * 60 * 1000).toISOString()
        : null;
        currentMoonInfo.forecast.next_eclipse.date = moonData.forecast?.next_eclipse?.date ?? null;
        currentMoonInfo.forecast.next_eclipse.days_until = moonData.forecast?.next_eclipse?.days_until ?? null;
        currentMoonInfo.forecast.next_eclipse.type = moonData.forecast?.next_eclipse?.type ?? null;
        currentMoonInfo.forecast.next_eclipse.is_blood_moon = moonData.forecast?.next_eclipse?.is_blood_moon ?? null;

        logger.info(`[moon-info-cron] Completed successfully`);
    } catch (err) {
        logger.error(`[moon-info-cron] Error while fetching current moon data: \n ${err}`);
    }
}

export function startMoonInfoCron() {
    cron.schedule("0 0 */8 * * *", fetchMoonInfo);
}