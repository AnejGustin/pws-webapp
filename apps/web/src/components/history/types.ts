import type {
    WeatherReadingFormat,
    WeatherStatsFormat
} from "shared";

export type WeatherParameter = "Temperature"
    | "Dew Point"
    | "Humidity"
    | "Heat Index"
    | "Pressure"
    | "Wind Speed"
    | "Wind Direction"
    | "Wind Gust"
    | "Wind Chill"
    | "Precipitation"
    | "Precipitation Rate"

export type WeatherStatsEndPointResponse = {
    data: WeatherStatsFormat
} |
{
    data: null
}

export type WeatherHistoryEndPointResponse = {
    data: Array<WeatherReadingFormat>
} |
{
    data: null
}

export type WeatherHistoryTransformed = {
    temperature: number | null,
    humidity: number | null,
    dewpoint: number | null,
    heat_index: number | null,
    pressure: number | null,
    wind_direction: number | null,
    wind_speed: number | null,
    wind_gust: number | null,
    wind_chill: number | null,
    precipitation: number | null,
    precipitation_rate: number | null,
    observation_time: number,
}
