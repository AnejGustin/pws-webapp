import {
    ObservationReading,
    ForecastZambrettiReading,
    StatsReading
} from "db";
import {
    ForecastZambrettiFormat,
    WeatherPeriod,
    WeatherReadingFormat,
    WeatherStatsFormat
} from "shared";

export function mapWeatherReading(reading: ObservationReading): WeatherReadingFormat {
    return {
        observation_time: reading.observationTime,

        temperature: reading.temperature ?? null,
        dewpoint: reading.dewpoint ?? null,
        heat_index: reading.heatIndex ?? null,
        humidity: reading.humidity ?? null,
        pressure: Number((reading.pressure)?.toFixed(1)) ?? null,

        wind: {
            speed: reading.windSpeed ?? null,
            gust: reading.windGust ?? null,
            direction: reading.windDirection ?? null,
            chill: reading.windChill ?? null
        },

        precipitation: {
            total: Number((reading.precipitation)?.toFixed(1)) ?? null,
            rate: Number((reading.precipitationRate)?.toFixed(1)) ?? null,
        },

        radiation: {
            solar: reading.solarRadiation ?? null,
            uv: reading.uv ?? null
        },

        deltas: {
            one_hour: {
                temperature: Number(reading.temperatureDeltaLastHour?.toFixed(1)) ?? null,
                pressure: Number(reading.pressureDeltaLastHour?.toFixed(1)) ?? null
            }
        }
    }
}

export function mapZambrettiForecast(forecast: ForecastZambrettiReading): ForecastZambrettiFormat {
    return {
        id: forecast.id!,
        forecast_text: forecast.forecastText,
        created_at: forecast.createdAt!
    }
}

export function mapStats(stats: StatsReading): WeatherStatsFormat {
    return {
        observation_time: stats.observationTime,
        created_at: stats.createdAt!,
        id: stats.id!,
        period: stats.type as WeatherPeriod,
        day: stats.day!,
        month: stats.month!,
        year: stats.year!,

        temperature: {
            min: stats.minTemperature ?? null,
            max: stats.maxTemperature ?? null,
            avg: Number(stats.avgTemperature?.toFixed(1)) ?? 0
        },
        dewpoint: {
            min: stats.minDewpoint ?? null,
            max: stats.maxDewpoint ?? null,
            avg: Number(stats.avgDewpoint?.toFixed(1)) ?? 0
        },
        humidity: {
            min: stats.minHumidity ?? null,
            max: stats.maxHumidity ?? null,
            avg: Number(stats.avgHumidity?.toFixed(0)) ?? 0
        },
        heat_index: {
            min: stats.minHeatIndex ?? null,
            max: stats.maxHeatIndex ?? null,
            avg: Number(stats.avgHeatIndex?.toFixed(1)) ?? 0
        },
        pressure: {
            min: Number(stats.minPressure?.toFixed(1)) ?? null,
            max: Number(stats.maxPressure?.toFixed(1)) ?? null,
            avg: Number(stats.avgPressure?.toFixed(1)) ?? 0
        },
        wind_speed: {
            min: stats.minWindSpeed ?? null,
            max: stats.maxWindSpeed ?? null,
            avg: Number(stats.avgWindSpeed?.toFixed(1)) ?? 0
        },
        wind_direction: {
            min: stats.minWindDirection ?? null,
            max: stats.maxWindDirection ?? null,
            avg: stats.avgWindDirection ?? 0
        },
        wind_gust: {
            min: stats.minWindGust ?? null,
            max: stats.maxWindGust ?? null,
            avg: Number(stats.avgWindGust?.toFixed(1)) ?? 0
        },
        wind_chill: {
            min: stats.minWindChill ?? null,
            max: stats.maxWindChill ?? null,
            avg: Number(stats.avgWindChill?.toFixed(1)) ?? 0
        },
        precipitation: {
            min: stats.minPrecipitation ?? null,
            max: stats.maxPrecipitation ?? null,
            avg: Number(stats.avgPrecipitation?.toFixed(1)) ?? 0
        },
        precipitation_rate: {
            min: stats.minPrecipitationRate ?? null,
            max: stats.maxPrecipitationRate ?? null,
            avg: Number(stats.avgPrecipitationRate?.toFixed(1)) ?? 0
        },
        solar_radiation: {
            min: stats.minSolarRadiation ?? null,
            max: stats.maxSolarRadiation ?? null,
            avg: Number(stats.avgSolarRadiation?.toFixed(0)) ?? 0
        },
        uv: {
            min: stats.minUv ?? null,
            max: stats.maxUv ?? null,
            avg: Number(stats.avgUv?.toFixed(0)) ?? 0
        },
    }
}