import type { WeatherPeriod } from "./schemas/weather"

export type WeatherReadingFormat = {
    observation_time: Date,

    temperature: number | null,
    dewpoint: number | null,
    heat_index: number | null,
    humidity: number | null,
    pressure: number | null,

    wind: {
        speed: number | null,
        gust: number | null,
        direction: number | null,
        chill: number | null,
    },

    precipitation: {
        total: number | null,
        rate: number | null,
    },

    radiation: {
        solar: number | null,
        uv: number | null,
    },

    deltas: {
        one_hour: {
            temperature: number | null,
            pressure: number | null,
        }
    }
}

export type ForecastZambrettiFormat = {
    id: number,
    forecast_text: string,
    created_at: Date
}


export type WeatherStatsFormat = {
    observation_time: Date,
    created_at: Date,
    id: number,
    period: WeatherPeriod,
    day: number,
    month: number,
    year: number,

    temperature: {
        min: number | null,
        max: number | null,
        avg: number
    },
    dewpoint: {
        min: number | null,
        max: number | null,
        avg: number
    },
    humidity: {
        min: number | null,
        max: number | null,
        avg: number
    },
    heat_index: {
        min: number | null,
        max: number | null,
        avg: number
    },
    pressure: {
        min: number | null,
        max: number | null,
        avg: number
    },
    wind_speed: {
        min: number | null,
        max: number | null,
        avg: number
    },
    wind_direction: {
        min: number | null,
        max: number | null,
        avg: number
    },
    wind_gust: {
        min: number | null,
        max: number | null,
        avg: number
    },
    wind_chill: {
        min: number | null,
        max: number | null,
        avg: number
    },
    precipitation: {
        min: number | null,
        max: number | null,
        avg: number
    },
    precipitation_rate: {
        min: number | null,
        max: number | null,
        avg: number
    },
    solar_radiation: {
        min: number | null,
        max: number | null,
        avg: number
    },
    uv: {
        min: number | null,
        max: number | null,
        avg: number
    },
}