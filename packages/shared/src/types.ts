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

export type CurrentWeatherConditionsFormat = {
    sunrise: number | null,
    sunset: number | null,
    visibility: number | null,
    weather_description: string | null,
    cloud_cover: number | null,
    aq: {
        aqi: number | null,
        co: number | null,
        no: number | null,
        no2: number | null,
        o3: number | null,
        so2: number | null,
        pm2_5: number | null,
        pm10: number | null,
        nh3: number | null,
    },
    uv_index: number | null,
    last_update_time: number | null
}

export type CurrentMoonInfoFormat = {
    last_update_time: number | null,
    name: string | null,
    phase_angle_deg: number | null,
    illumination: number | null,
    age_days: number | null,
    distance_km: number | null,
    rise_set: {
        rise_time: string | null,
        set_time: string | null,
    },
    special_moon_labels: Array<string> | null,
    eclipse: {
        is_eclipse: boolean | null,
        is_blood_moon: boolean | null,
    },
    forecast: {
        full_moon: {
            date: string | null,
            days_until: number | null,
        },
        new_moon: {
            date: string | null,
            days_until: number | null,
        },
        first_quarter: {
            date: string | null,
        },
        last_quarter: {
            date: string | null,
        },
        next_special_moon: {
            date: string | null,
            days_until: number | null,
            type: string | null,
        },
        next_eclipse: {
            date: string | null,
            days_until: number | null,
            type: string | null,
            is_blood_moon: boolean | null,
        },
    },
}