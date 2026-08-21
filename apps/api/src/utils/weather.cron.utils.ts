import {
    db,
    ObservationReading,
    observations,
    sql,
    stats,
    avg,
    between,
    desc,
} from "db";
import {
    ObservationWindDirection,
    WeatherParameter,
    observationColumns,
    ObservationsColumn,
    WeatherUndergroundApiObservationResponse,
    WeatherStats
} from "../types/weather.types";
import { logger } from "../logger/logger";
import {
    WEATHER_STATION_TIMEZONE,
    WeatherPeriod,
    weatherPeriodSchema
} from "shared";
import {
    fromZonedTime,
    toZonedTime
} from "date-fns-tz";

export function parseReadings(data: WeatherUndergroundApiObservationResponse) {
    const [reading] = data.observations;
    const observationTime = reading.obsTimeUtc;

    if (observationTime === null) {
        logger.warn("[weather-cron] Observation time is null. Insert skipped.");
        return;
    }

    return {
        temperature: reading.metric.temp ?? null,
        dewpoint: reading.metric.dewpt ?? null,
        humidity: reading.humidity ?? null,
        heatIndex: reading.metric.heatIndex ?? null,
        pressure: reading.metric.pressure ?? null,

        windSpeed: reading.metric.windSpeed ?? null,
        windDirection: reading.winddir ?? null,
        windGust: reading.metric.windGust ?? null,
        windChill: reading.metric.windChill ?? null,

        precipitation: reading.metric.precipTotal ?? null,
        precipitationRate: reading.metric.precipRate ?? null,

        solarRadiation: reading.solarRadiation ?? null,
        uv: reading.uv ?? null,

        observationTime: new Date(observationTime)
    };
}

export function getAverageWindDirection(observations: Array<ObservationWindDirection>) {
    let sumCos = 0, sumSin = 0, numOfWindDirectionInstances = 0;

    observations.forEach(observation => {
        if (observation.windDirection != null) {
            const radians = (observation.windDirection * Math.PI) / 180;
            sumSin += Math.sin(radians);
            sumCos += Math.cos(radians);

            numOfWindDirectionInstances++;
        }
    });
    const avgAngleRadians = Math.atan2(sumSin / numOfWindDirectionInstances, sumCos / numOfWindDirectionInstances);
    let avgAngleDegrees = (avgAngleRadians * 180) / Math.PI;

    if (avgAngleDegrees < 0) {
        avgAngleDegrees += 360;
    }

    return Math.round(avgAngleDegrees);
}

function getRange(period: WeatherPeriod, year: number, month: number, day: number) {
    switch (period) {
        case "day":
            return {
                from: fromZonedTime(new Date(year, month - 1, day), WEATHER_STATION_TIMEZONE),
                to: fromZonedTime(new Date(year, month - 1, day, 23, 59, 59), WEATHER_STATION_TIMEZONE)
            };
        case "month":
            return {
                from: fromZonedTime(new Date(year, month - 1, 1), WEATHER_STATION_TIMEZONE),
                to: fromZonedTime(new Date(year, month, 0), WEATHER_STATION_TIMEZONE)
            };
        case "year":
            return {
                from: fromZonedTime(new Date(year, 0, 1), WEATHER_STATION_TIMEZONE),
                to: fromZonedTime(new Date(year, 11, 31), WEATHER_STATION_TIMEZONE)
            };
        case "all_time":
            return {
                from: fromZonedTime(new Date(2000, 1, 1), WEATHER_STATION_TIMEZONE),
                to: fromZonedTime(new Date(2100, 1, 1), WEATHER_STATION_TIMEZONE)
            };
    }
}

async function getAvg(column: ObservationsColumn, from: Date, to: Date) {
    const [{ value }] = await db
        .select({ value: avg(column) })
        .from(observations)
        .where(
            between(
                observations.observationTime,
                from,
                to
            ));
    if (!value) {
        return 0;
    }
    return Number(value);
}

async function getAverages(period: WeatherPeriod, day: number, month: number, year: number) {
    const { from, to } = getRange(period, year, month, day);

    return {
        temperature: await getAvg(observations.temperature, from, to),
        dewpoint: await getAvg(observations.dewpoint, from, to),
        humidity: await getAvg(observations.humidity, from, to),
        heatIndex: await getAvg(observations.heatIndex, from, to),
        pressure: await getAvg(observations.pressure, from, to),
        windSpeed: await getAvg(observations.windSpeed, from, to),
        windGust: await getAvg(observations.windGust, from, to),
        windChill: await getAvg(observations.windChill, from, to),
        precipitation: null,
        precipitationRate: null,
        solarRadiation: await getAvg(observations.solarRadiation, from, to),
        uv: await getAvg(observations.uv, from, to),
    }
}

export async function updateStats(reading: ObservationReading, weatherStats: WeatherStats) {
    let upsertedCount = 0;

    for (const period of weatherPeriodSchema.options) {
        let day, month, year;

        const dateInWeatherStationTimezone = toZonedTime(reading.observationTime, WEATHER_STATION_TIMEZONE);

        switch (period) {
            case "day": {
                day = dateInWeatherStationTimezone.getDate();
                month = dateInWeatherStationTimezone.getMonth() + 1;
                year = dateInWeatherStationTimezone.getFullYear();
                break;
            }
            case "month": {
                day = 0;
                month = dateInWeatherStationTimezone.getMonth() + 1;
                year = dateInWeatherStationTimezone.getFullYear();
                break;
            }
            case "year": {
                day = 0;
                month = 0;
                year = dateInWeatherStationTimezone.getFullYear();
                break;
            }
            case "all_time": {
                day = 0;
                month = 0;
                year = 0;
                break;
            }
        }

        if (day === undefined || month === undefined || year === undefined) {
            logger.warn(`[weather-cron] day, month or year is undefined.`)
            return;
        }

        const averages = await getAverages(period, day, month, year);

        if (averages === undefined) {
            logger.warn(`[weather-cron] averages undefined.`);
            return;
        }

        await db
            .insert(stats)
            .values({
                type: period,
                day: day,
                month: month,
                year: year,

                minTemperature: weatherStats.minTemperature,
                maxTemperature: weatherStats.maxTemperature,
                avgTemperature: averages.temperature,

                minDewpoint: weatherStats.minDewpoint,
                maxDewpoint: weatherStats.maxDewpoint,
                avgDewpoint: averages.dewpoint,

                minHumidity: weatherStats.minHumidity,
                maxHumidity: weatherStats.maxHumidity,
                avgHumidity: averages.humidity,

                minHeatIndex: weatherStats.minHeatIndex,
                maxHeatIndex: weatherStats.maxHeatIndex,
                avgHeatIndex: averages.heatIndex,

                minPressure: weatherStats.minPressure,
                maxPressure: weatherStats.maxPressure,
                avgPressure: averages.pressure,

                minWindSpeed: null,
                maxWindSpeed: weatherStats.maxWindSpeed,
                avgWindSpeed: averages.windSpeed,

                minWindDirection: null,
                maxWindDirection: null,
                avgWindDirection: null,

                minWindGust: null,
                maxWindGust: weatherStats.maxWindGust,
                avgWindGust: averages.windGust,

                minWindChill: weatherStats.minWindChill,
                maxWindChill: weatherStats.maxWindChill,
                avgWindChill: averages.windChill,

                minPrecipitation: null,
                maxPrecipitation: weatherStats.maxPrecipitation,
                avgPrecipitation: averages.precipitation,

                minPrecipitationRate: null,
                maxPrecipitationRate: weatherStats.maxPrecipitationRate,
                avgPrecipitationRate: averages.precipitationRate,

                minSolarRadiation: null,
                maxSolarRadiation: weatherStats.maxSolarRadiation,
                avgSolarRadiation: averages.solarRadiation,

                minUv: null,
                maxUv: weatherStats.maxUv,
                avgUv: averages.uv,

                observationTime: reading.observationTime
            })
            .onConflictDoUpdate({
                target: [stats.year, stats.month, stats.day, stats.type],
                set: {
                    minTemperature: sql`LEAST(${stats.minTemperature}, ${weatherStats.minTemperature})`,
                    maxTemperature: sql`GREATEST(${stats.maxTemperature}, ${weatherStats.maxTemperature})`,
                    avgTemperature: averages.temperature,
                    minDewpoint: sql`LEAST(${stats.minDewpoint}, ${weatherStats.minDewpoint})`,
                    maxDewpoint: sql`GREATEST(${stats.maxDewpoint}, ${weatherStats.maxDewpoint})`,
                    avgDewpoint: averages.dewpoint,
                    minHumidity: sql`LEAST(${stats.minHumidity}, ${weatherStats.minHumidity})`,
                    maxHumidity: sql`GREATEST(${stats.maxHumidity}, ${weatherStats.maxHumidity})`,
                    avgHumidity: averages.humidity,
                    minHeatIndex: sql`LEAST(${stats.minHeatIndex}, ${weatherStats.minHeatIndex})`,
                    maxHeatIndex: sql`GREATEST(${stats.maxHeatIndex}, ${weatherStats.maxHeatIndex})`,
                    avgHeatIndex: averages.heatIndex,
                    minPressure: sql`LEAST(${stats.minPressure}, ${weatherStats.minPressure})`,
                    maxPressure: sql`GREATEST(${stats.maxPressure}, ${weatherStats.maxPressure})`,
                    avgPressure: averages.pressure,
                    minWindSpeed: null,
                    maxWindSpeed: sql`GREATEST(${stats.maxWindSpeed}, ${weatherStats.maxWindSpeed})`,
                    avgWindSpeed: averages.windSpeed,
                    minWindDirection: null,
                    maxWindDirection: null,
                    avgWindDirection: null,
                    minWindGust: null,
                    maxWindGust: sql`GREATEST(${stats.maxWindGust}, ${weatherStats.maxWindGust})`,
                    avgWindGust: averages.windGust,
                    minWindChill: sql`LEAST(${stats.minWindChill}, ${weatherStats.minWindChill})`,
                    maxWindChill: sql`GREATEST(${stats.maxWindChill}, ${weatherStats.maxWindChill})`,
                    avgWindChill: averages.windChill,
                    minPrecipitation: null,
                    maxPrecipitation: sql`GREATEST(${stats.maxPrecipitation}, ${weatherStats.maxPrecipitation})`,
                    avgPrecipitation: averages.precipitation,
                    minPrecipitationRate: null,
                    maxPrecipitationRate: sql`GREATEST(${stats.maxPrecipitationRate}, ${weatherStats.maxPrecipitationRate})`,
                    avgPrecipitationRate: averages.precipitationRate,
                    minSolarRadiation: null,
                    maxSolarRadiation: sql`GREATEST(${stats.maxSolarRadiation}, ${weatherStats.maxSolarRadiation})`,
                    avgSolarRadiation: averages.solarRadiation,
                    minUv: null,
                    maxUv: sql`GREATEST(${stats.maxUv}, ${weatherStats.maxUv})`,
                    avgUv: averages.uv,
                    observationTime: sql`GREATEST(${stats.observationTime}, ${reading.observationTime})`,
                },
            });

        upsertedCount++;
    }

    logger.info(`[weather-cron] Upserted ${upsertedCount} rows into stats table.`);
}

export async function calculateOneHourDelta(latestValue: number, parameter: WeatherParameter) {
    const oneHourAgoTime = new Date(Date.now() - 1 * 60 * 60 * 1000); // calculate delta for value from 1 hour to 1 hour 10 minutes ago
    const maxTime = new Date(oneHourAgoTime.getTime() - 10 * 60 * 1000);
    const [parameterOneHourAgo] = await db
        .select({ value: observationColumns[parameter] })
        .from(observations)
        .where(
            between(
                observations.observationTime,
                maxTime,
                oneHourAgoTime
            )
        ).orderBy(
            desc(observations.observationTime)
        )
        .limit(1);

    let result = null;
    if (parameterOneHourAgo && parameterOneHourAgo.value != null) {
        result = latestValue - parameterOneHourAgo.value;
    }

    return result;
}

export function resetStats(): WeatherStats {
    return ({
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
    })
}

export function updateWeatherStats(stats: WeatherStats, observation: ObservationReading): WeatherStats {
    let minTemperature = null;
    let maxTemperature = null;

    let minDewpoint = null;
    let maxDewpoint = null;

    let minHumidity = null;
    let maxHumidity = null;

    let minHeatIndex = null;
    let maxHeatIndex = null;

    let minPressure = null;
    let maxPressure = null;

    let minWindChill = null;
    let maxWindChill = null;

    let maxWindGust = null;

    let maxPrecipitation = null;

    let maxPrecipitationRate = null;

    let maxSolarRadiation = null;

    let maxUv = null;

    let maxWindSpeed = null;


    minTemperature = min(stats.minTemperature, observation.temperature);
    maxTemperature = max(stats.maxTemperature, observation.temperature);
    minDewpoint = min(stats.minDewpoint, observation.dewpoint);
    maxDewpoint = max(stats.maxDewpoint, observation.dewpoint);
    minHumidity = min(stats.minHumidity, observation.humidity);
    maxHumidity = max(stats.maxHumidity, observation.humidity);
    minHeatIndex = min(stats.minHeatIndex, observation.heatIndex);
    maxHeatIndex = max(stats.maxHeatIndex, observation.heatIndex);
    minPressure = min(stats.minPressure, observation.pressure);
    maxPressure = max(stats.maxPressure, observation.pressure);
    minWindChill = min(stats.minWindChill, observation.windChill);
    maxWindChill = max(stats.maxWindChill, observation.windChill);
    maxWindGust = max(stats.maxWindGust, observation.windGust);
    maxPrecipitation = max(stats.maxPrecipitation, observation.precipitation);
    maxPrecipitationRate = max(stats.maxPrecipitationRate, observation.precipitationRate);
    maxSolarRadiation = max(stats.maxSolarRadiation, observation.solarRadiation);
    maxUv = max(stats.maxUv, observation.uv);
    maxWindSpeed = max(stats.maxWindSpeed, observation.windSpeed);

    return ({
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,

        minDewpoint: minDewpoint,
        maxDewpoint: maxDewpoint,

        minHeatIndex: minHeatIndex,
        maxHeatIndex: maxHeatIndex,

        minHumidity: minHumidity,
        maxHumidity: maxHumidity,

        minPressure: minPressure,
        maxPressure: maxPressure,

        minWindChill: minWindChill,
        maxWindChill: maxWindChill,

        maxPrecipitation: maxPrecipitation,

        maxPrecipitationRate: maxPrecipitationRate,

        maxSolarRadiation: maxSolarRadiation,

        maxUv: maxUv,

        maxWindGust: maxWindGust,

        maxWindSpeed: maxWindSpeed,
    })
}


export function min(val1: number | null | undefined, val2: number | null | undefined) {
    if (val1 && val2) {
        return Math.min(val1, val2);
    } else {
        if (val2) {
            return val2;
        }
        if (val1) {
            return val1;
        }
        return null;
    }
}

export function max(val1: number | null | undefined, val2: number | null | undefined) {
    if (val1 && val2) {
        return Math.max(val1, val2);
    } else {
        if (val2) {
            return val2;
        }
        if (val1) {
            return val1;
        }
        return null;
    }
}