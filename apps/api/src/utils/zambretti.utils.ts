import {
    db,
    observations,
    desc,
    ObservationReadingSelect,
    between
} from "db";
import { getAverageWindDirection } from "./weather.cron.utils";
import { 
    ZambrettiForecastInput, 
    ZambrettiPressureTrend 
} from "../types/zambretti.types";
import { logger } from "../logger/logger";

const zambrettiTable = [
    "Settled Fine",
    "Fine Weather",
    "Fine, Becoming Less Settled",
    "Fairly Fine, Showery Later",
    "Showery, Becoming More Unsettled",
    "Unsettled, Rain Later",
    "Rain at Times, Worse Later",
    "Rain at Times, Becoming Very Unsettled",
    "Very Unsettled, Rain",
    "Settled Fine",
    "Fine Weather",
    "Fine, Possibly Showers",
    "Fairly Fine, Showers Likely",
    "Showery, Bright Intervals",
    "Changeable, Some Rain",
    "Unsettled, Rain at Times",
    "Rain at Frequent Intervals",
    "Very Unsettled, Rain",
    "Stormy, Much Rain",
    "Settled Fine",
    "Fine Weather",
    "Becoming Fine",
    "Fairly Fine, Improving",
    "Fairly Fine, Possibly Showers Early",
    "Showery Early, Improving",
    "Changeable, Mending",
    "Rather Unsettled, Clearing Later",
    "Unsettled, Probably Improving",
    "Unsettled, Short Fine Intervals",
    "Very Unsettled, Finer at Times",
    "Stormy, Possibly Improving",
    "Stormy, Much Rain",
];

export async function getWeatherData() {
    const latestObservation = await db
        .select()
        .from(observations)
        .orderBy(
            desc(observations.observationTime)
        )
        .limit(10)

    const threeHoursAgoTime = new Date(latestObservation[0].observationTime.getTime() - 3 * 60 * 60 * 1000); // use pressure measurements from 3 hours to 3 hours 10 minutes ago
    const maxTime = new Date(threeHoursAgoTime.getTime() - 10 * 60 * 1000);

    const observationThreeHoursAgo = await db
        .select()
        .from(observations)
        .where(
            between(
                observations.observationTime,
                maxTime,
                threeHoursAgoTime
            )
        )
        .orderBy(desc(observations.observationTime))
        .limit(10);

    return {
        latest: latestObservation,
        threeHoursAgo: observationThreeHoursAgo
    }
}

function isWinter(month: number) {
    return month >= 10 || month <= 3;
}

function windScoreModifier(avgWindSpeed: number, score: number) {
    if (avgWindSpeed < 5) {
        return score * 0.2;
    }
    if (avgWindSpeed < 15) {
        return score * 0.5;
    }
    return score;
}

function windScore(avgAngleDegrees: number) {
    if (avgAngleDegrees >= 180 && avgAngleDegrees <= 314) { // southern or western winds are usually associated with incoming front
        return 1.5;
    } else if (avgAngleDegrees >= 315 || avgAngleDegrees <= 45) { // northern winds are usually foehn, meaning the air is dry, so less chance for precipitation
        return 0;
    }
    return 0.25; // other directions usually have no meaningful impact
}

function addWind(weatherDataLatest: Array<ObservationReadingSelect>) {
    let sumWindSpeed = 0, numOfWindSpeedInstances = 0;

    weatherDataLatest.forEach(observation => {
        if (observation.windSpeed != null) {
            sumWindSpeed += observation.windSpeed;

            numOfWindSpeedInstances++;
        }
    });

    const avgAngleDegrees = getAverageWindDirection(weatherDataLatest);
    const avgWindSpeed = sumWindSpeed / numOfWindSpeedInstances;

    logger.info(`[zambretti-cron] Wind direction (averaged): ${avgAngleDegrees}`);
    logger.info(`[zambretti-cron] Wind speed (averaged): ${avgWindSpeed}`);
    
    const score = windScore(avgAngleDegrees);
    logger.info(`[zambretti-cron] Wind score with no modifier: ${score}`);

    const windScoreWithModifiers = windScoreModifier(avgWindSpeed, score);

    logger.info(`[zambretti-cron] Wind score with modifier: ${windScoreWithModifiers}`);
    return windScoreWithModifiers;
}

function addSeasonScore(pressureTrend: ZambrettiPressureTrend): number {
    if (pressureTrend === "falling" && isWinter(new Date(Date.now()).getMonth() + 1)) {
        logger.info(`[zambretti-cron] Added 1 to season score (winter, pressure is falling)`);
        return 1;
    }
    if (pressureTrend === "rising" && !isWinter(new Date(Date.now()).getMonth() + 1)) {
        logger.info(`[zambretti-cron] Added -1 to season score (summer, pressure is rising)`);
        return -1;
    }
    logger.info(`[zambretti-cron] Added 0 to season score`);
    return 0;
}

function getPressureTrend(pressureDelta: number) {
    if (pressureDelta >= 2) {
        return "rising";
    } else if (pressureDelta <= -2.25) {
        return "falling";
    } else {
        return "steady";
    }
}

function getForecastValue(pressureTrend: ZambrettiPressureTrend, pressureAtSeaLevel: number, weatherData: ZambrettiForecastInput) {
    switch (pressureTrend) {
        case "falling": {
            const forecastValue = (127 - 0.12 * pressureAtSeaLevel) + addWind(weatherData.latest) + addSeasonScore(pressureTrend);
            return forecastValue;
        }
        case "steady": {
            const forecastValue = (144 - 0.13 * pressureAtSeaLevel) + addWind(weatherData.latest) + addSeasonScore(pressureTrend);
            return forecastValue;
        }
        case "rising": {
            const forecastValue = (185 - 0.16 * pressureAtSeaLevel) + addWind(weatherData.latest) + addSeasonScore(pressureTrend);
            return forecastValue;
        }
    }
}

export function zambretti(weatherData: ZambrettiForecastInput) {
    let avgPressureThreeHoursAgo, avgPressureLatest;
    let sumPressureThreeHoursAgo = 0, sumPressureLatest = 0, numOfReadingsThreeHoursAgo = 0, numOfReadingdsLatest = 0;

    if (weatherData.threeHoursAgo.length <= 0) {
        return null;
    }

    weatherData.latest.forEach(observation => {
        if (observation.pressure != null) {
            sumPressureLatest += observation.pressure;
            numOfReadingdsLatest++;
        }
    });

    weatherData.threeHoursAgo.forEach(observation => {
        if (observation.pressure != null) {
            sumPressureThreeHoursAgo += observation.pressure;
            numOfReadingsThreeHoursAgo++;
        }
    });

    avgPressureThreeHoursAgo = sumPressureThreeHoursAgo / numOfReadingsThreeHoursAgo;
    avgPressureLatest = sumPressureLatest / numOfReadingdsLatest;

    const pressureAtSeaLevel = avgPressureLatest;

    const pressureDelta = avgPressureLatest - avgPressureThreeHoursAgo;
    const pressureTrend = getPressureTrend(pressureDelta);

    let forecastValue = getForecastValue(pressureTrend, pressureAtSeaLevel, weatherData);
    forecastValue = Math.floor(forecastValue) - 1;

    logger.info(`[zambretti-cron] Pressure at sea level (averaged): ${pressureAtSeaLevel}`);
    logger.info(`[zambretti-cron] Pressure 3 hours ago (averaged): ${avgPressureThreeHoursAgo}`);
    logger.info(`[zambretti-cron] Pressure delta: ${pressureDelta}`);
    logger.info(`[zambretti-cron] Pressure trend: ${pressureTrend}`);
    logger.info(`[zambretti-cron] Forecast value (rounded down and alligned with indexes): ${forecastValue}`);
    logger.info(`[zambretti-cron] Forecast text: ${zambrettiTable[forecastValue]}`);

    return zambrettiTable[forecastValue];
}