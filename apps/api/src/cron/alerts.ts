import cron from "node-cron";
import axios from "axios";
import { logger } from "../logger/logger";
import { AlertsFormat } from "shared";
import { XMLParser } from "@nodable/flexible-xml-parser";
import { AlertsFeedResponse } from "../types/alerts.types";
import { filterAlerts } from "../utils/alerts.cron.utils";

const ALERTS_XML_API_URL = `https://meteo.arso.gov.si/uploads/probase/www/warning/text/sl/warning_SLOVENIA_NORTH-EAST_latest_CAP.xml`;

export let alerts: AlertsFormat = {
    last_update_time: null,
    alerts: {
        expired: [],
        active: [],
        upcoming: []
    }
};

export async function fetchAlerts() {
    logger.info(`[alerts-cron] Starting at ${new Date().toLocaleString()}`);

    try {
        alerts.last_update_time = Date.now();
        alerts.alerts.expired = [];
        alerts.alerts.active = [];
        alerts.alerts.upcoming = [];

        const alertsXml = await axios.get(ALERTS_XML_API_URL);

        if(!alertsXml.data) {
            logger.warn("[alerts-cron] No alerts data");
            return;
        }

        const parser = new XMLParser();
        const result: AlertsFeedResponse = parser.parse(alertsXml.data);

        filterAlerts(result);

        logger.info(`[alerts-cron] Completed successfully`);
    } catch (err) {
        logger.error(`[alerts-cron] Error while fetching alerts: \n ${err}`);
    }
}

export function startAlertsCron() {
    cron.schedule("0 */30 * * * *", fetchAlerts);
}