import type { WeatherPeriod } from "shared";
import type { WeatherParameter } from "./types";

export const monthParameterOptions: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const weatherPeriodOptions: Array<WeatherPeriod> = [
    "all_time",
    "year",
    "month",
    "day",
];

export const weatherParameterOptions: Array<WeatherParameter> = [
    "Temperature",
    "Dew Point",
    "Humidity",
    "Heat Index",
    "Pressure",
    "Wind Speed",
    "Wind Direction",
    "Wind Gust",
    "Wind Chill",
    "Precipitation",
    "Precipitation Rate",
];