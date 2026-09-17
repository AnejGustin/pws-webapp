import { AlertFormat, AlertsFormat } from "shared";
import { alerts } from "../cron/alerts";
import { AlertsFeedResponse } from "../types/alerts.types";

export function filterAlerts(parsedXML: AlertsFeedResponse) {
    for (const alertIndex in parsedXML.alert.info) {
        const alert = parsedXML.alert.info[alertIndex];

        const alertAwarenessLevel = alert.parameter[0].value.split(";").map(x => x.trim());
        if (Number(alertAwarenessLevel[0]) <= 1 || alertAwarenessLevel[1] === "green") {
            continue;
        }

        const alertAwarenessType = alert.parameter[1].value.split(";").map(x => x.trim());
        const category = alertAwarenessType[1];

        const newAlert = {
            language: alert.language,
            onset: alert.onset,
            expires: alert.expires,
            headline: alert.headline,
            description: alert.description,
            instruction: alert.instruction,
            color: alertAwarenessLevel[1],
            category: category
        }

        if(Date.now() > new Date(newAlert.expires).getTime()) {
            alerts.alerts.expired.push(newAlert);
        } else if (Date.now() < new Date(newAlert.expires).getTime() && Date.now() < new Date(newAlert.onset).getTime()) {
            alerts.alerts.upcoming.push(newAlert);
        } else {
            alerts.alerts.active.push(newAlert);
        }
    }

    sortAlertsOnsetAsc(alerts);
}

function sortAlertsOnsetAsc(alerts: AlertsFormat) {
    alerts.alerts.expired.sort((a, b) => {
        const firstAlertOnsetTime = Number(new Date(a.onset).getTime());
        const secondAlertOnsetTime = Number(new Date(b.onset).getTime());

        return compareNumbers(firstAlertOnsetTime, secondAlertOnsetTime);
    })
    alerts.alerts.active.sort((a, b) => {
        const firstAlertOnsetTime = Number(new Date(a.onset).getTime());
        const secondAlertOnsetTime = Number(new Date(b.onset).getTime());

        return compareNumbers(firstAlertOnsetTime, secondAlertOnsetTime);
    })
    alerts.alerts.upcoming.sort((a, b) => {
        const firstAlertOnsetTime = Number(new Date(a.onset).getTime());
        const secondAlertOnsetTime = Number(new Date(b.onset).getTime());

        return compareNumbers(firstAlertOnsetTime, secondAlertOnsetTime);
    })
}

function compareNumbers(a: number, b: number) {
    return a - b;
}