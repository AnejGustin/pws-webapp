import {
    WEATHER_STATION_TIMEZONE,
    type WeatherHistoryQuery,
    type WeatherPeriod,
    type WeatherReadingFormat,
    type WeatherStatsFormat
} from "shared";
import type { StatusBadgeProperties } from "../components/dashboard/Status/types";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import type {
    WeatherHistoryTransformed,
    WeatherParameter
} from "../components/history/types";
import { icons } from "../components/WeatherIcon/icons";
import type { FormatTimeOptions } from "./type";

// for now, data on dashboard is considered stale after 15 minutes, station is considered offline if no data has been received for 2 hours
export function getStatusBadgeProperties(observationTime: Date): StatusBadgeProperties {
    if (Date.now() - new Date(observationTime).getTime() >= 2 * 60 * 60 * 1000) {
        return {
            statusText: "OFFLINE",
            statusColor: "red",
        }
    }
    if (Date.now() - new Date(observationTime).getTime() > 15 * 60 * 1000) {
        return {
            statusText: "STALE",
            statusColor: "yellow",
        }
    }

    return {
        statusText: "ONLINE",
        statusColor: "green",
    }
}

export function formatTime(time: Date | number, options: FormatTimeOptions) {
    const datetime = new Date(time).toLocaleString("sl-SI", options);
    return datetime;
}

export function transformDirectionForDisplay(direction: number | null) {
    if (direction === null) {
        return 0;
    }
    if (direction + 180 > 360) {
        return direction - 180;
    }
    return direction + 180;
}

export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate(); // +1 because by passing 0 as days in Date constructor we get last day of PREVIOUS month,
    // so if we want num of days in February, we pass 3 (March) as month 
}

export function getMonthAsNumber(month: string) {
    switch (month) {
        case "January": return 0;
        case "February": return 1;
        case "March": return 2;
        case "April": return 3;
        case "May": return 4;
        case "June": return 5;
        case "July": return 6;
        case "August": return 7;
        case "September": return 8;
        case "October": return 9;
        case "November": return 10;
        case "December": return 11;
        default: throw Error("Invalid month");
    }
}

export function numberToMonth(number: number) {
    switch (number) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        default: throw Error("Invalid month");
    }
}

export function transformHistoryResponse(historyResponse: WeatherReadingFormat): WeatherHistoryTransformed {
    return {
        temperature: historyResponse.temperature,
        humidity: historyResponse.humidity,
        dewpoint: historyResponse.dewpoint,
        heat_index: historyResponse.heat_index,
        pressure: historyResponse.pressure,
        wind_direction: historyResponse.wind.direction,
        wind_speed: historyResponse.wind.speed,
        wind_gust: historyResponse.wind.gust,
        wind_chill: historyResponse.wind.chill,
        precipitation: historyResponse.precipitation.total,
        precipitation_rate: historyResponse.precipitation.rate,
        observation_time: new Date(historyResponse.observation_time).getTime(),
    }
}

export function periodToDate(period: WeatherPeriod, date: Date): WeatherHistoryQuery {
    switch (period) {
        case "all_time": {
            return (
                {
                    from: fromZonedTime(new Date(2026, 1, 1), WEATHER_STATION_TIMEZONE),
                    to: fromZonedTime(new Date(2100, 1, 1), WEATHER_STATION_TIMEZONE)
                }
            )
        }
        case "year": {
            return (
                {
                    from: fromZonedTime(new Date(date.getFullYear(), 1, 1), WEATHER_STATION_TIMEZONE),
                    to: fromZonedTime(new Date(date.getFullYear(), 12, 31), WEATHER_STATION_TIMEZONE),
                }
            )
        }
        case "month": {
            return (
                {
                    from: fromZonedTime(new Date(date.getFullYear(), date.getMonth(), 1), WEATHER_STATION_TIMEZONE),
                    to: fromZonedTime(new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date.getFullYear(), date.getMonth())), WEATHER_STATION_TIMEZONE),
                }
            )
        }
        case "day": {
            return (
                {
                    from: fromZonedTime(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), WEATHER_STATION_TIMEZONE),
                    to: fromZonedTime(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59), WEATHER_STATION_TIMEZONE),
                }
            )
        }
    }
}

export function getPeriodDateTimeOptions(period: WeatherPeriod) {
    switch (period) {
        case "all_time": {
            return {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: WEATHER_STATION_TIMEZONE
            }
        }
        case "year": {
            return {
                day: "2-digit",
                month: "2-digit",
                timeZone: WEATHER_STATION_TIMEZONE
            }
        }
        case "month": {
            return {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: WEATHER_STATION_TIMEZONE
            }
        }
        case "day": {
            return {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: WEATHER_STATION_TIMEZONE
            }
        }
    }
}

export function getStatsCardTimeAsText(period: WeatherPeriod, selectedDay: number, selectedMonth: number, selectedYear: number) {
    switch (period) {
        case "all_time": {
            return "All Time"
        }
        case "year": {
            const yearAsString = selectedYear.toString()

            return `${yearAsString}`
        }
        case "month": {
            const monthAsString = numberToMonth(selectedMonth)
            const yearAsString = selectedYear.toString()

            return `${monthAsString} ${yearAsString}`
        }
        case "day": {
            const dayAsString = selectedDay.toString()
            const monthAsString = numberToMonth(selectedMonth)
            const yearAsString = selectedYear.toString()

            return `${dayAsString} ${monthAsString} ${yearAsString}`
        }
    }
}

export function weatherDataPeriodToString(period: WeatherPeriod) {
    switch (period) {
        case "all_time": {
            return "All Time"
        }
        case "year": {
            return "Year"
        }
        case "month": {
            return "Month"
        }
        case "day": {
            return "Day"
        }
    }
}

export function getTimeSinceUpdateText(currentTime: number, lastObservationTime: Date) {
    let minutesSinceLastUpdate = Math.floor((currentTime - new Date(lastObservationTime).getTime()) / 1000 / 60);
    let hoursSinceLastUpdate = Math.floor(minutesSinceLastUpdate / 60);
    let daysSinceLastUpdate = Math.floor(hoursSinceLastUpdate / 24);

    if (minutesSinceLastUpdate === 0) {
        return "(just now)";
    }
    if (minutesSinceLastUpdate === 1) {
        return `(${minutesSinceLastUpdate} minute ago)`;
    }
    if (minutesSinceLastUpdate < 60) {
        return `(${minutesSinceLastUpdate} minutes ago)`;
    }
    if (hoursSinceLastUpdate === 1) {
        return `(${hoursSinceLastUpdate} hour ago)`;
    }
    if (hoursSinceLastUpdate < 24) {
        return `(${hoursSinceLastUpdate} hours ago)`;
    }
    if (daysSinceLastUpdate === 1) {
        return `(${daysSinceLastUpdate} day ago)`;
    }
    return `(${daysSinceLastUpdate} days ago)`;
}

export function getWindDirection(degrees: number | null) {
    if (degrees === null) {
        return null;
    }

    if ((degrees >= 348 && degrees <= 360) || (degrees >= 0 && degrees <= 11)) {
        return "N";
    }
    if (degrees >= 12 && degrees <= 33) {
        return "NNE";
    }
    if (degrees >= 34 && degrees <= 56) {
        return "NE";
    }
    if (degrees >= 57 && degrees <= 78) {
        return "ENE";
    }
    if (degrees >= 79 && degrees <= 101) {
        return "E";
    }
    if (degrees >= 102 && degrees <= 123) {
        return "ESE";
    }
    if (degrees >= 124 && degrees <= 146) {
        return "SE";
    }
    if (degrees >= 147 && degrees <= 168) {
        return "SSE";
    }
    if (degrees >= 169 && degrees <= 191) {
        return "S";
    }
    if (degrees >= 192 && degrees <= 213) {
        return "SSW";
    }
    if (degrees >= 214 && degrees <= 236) {
        return "SW";
    }
    if (degrees >= 237 && degrees <= 258) {
        return "WSW";
    }
    if (degrees >= 259 && degrees <= 281) {
        return "W";
    }
    if (degrees >= 282 && degrees <= 303) {
        return "WNW";
    }
    if (degrees >= 304 && degrees <= 326) {
        return "NW";
    }
    if (degrees >= 327 && degrees <= 347) {
        return "NNW";
    }
}

export function getYearParameterOptions() {
    const dateInWeatherStationTimezone = fromZonedTime(new Date(), WEATHER_STATION_TIMEZONE);
    const currentYear = dateInWeatherStationTimezone.getFullYear();
    const yearParameterOptions = []

    for (let i = 2026; i <= currentYear; i++) {
        yearParameterOptions.push(i);
    }

    return yearParameterOptions;
}

export function getStatsCardProps(weatherStats: WeatherStatsFormat, weatherParameter: WeatherParameter) {
    switch (weatherParameter) {
        case "Temperature": {
            return ({
                unit: "°C",
                weatherParameter: "Temperature",
                avg: weatherStats.temperature.avg,
                min: weatherStats.temperature.min,
                max: weatherStats.temperature.max
            })
        };
        case "Dew Point": {
            return ({
                unit: "°C",
                weatherParameter: "Dew Point",
                avg: weatherStats.dewpoint.avg,
                min: weatherStats.dewpoint.min,
                max: weatherStats.dewpoint.max
            })
        };
        case "Humidity": {
            return ({
                unit: "%",
                weatherParameter: "Humidity",
                avg: weatherStats.humidity.avg,
                min: weatherStats.humidity.min,
                max: weatherStats.humidity.max
            })
        };
        case "Heat Index": {
            return ({
                unit: "°C",
                weatherParameter: "Heat Index (Feels Like)",
                avg: weatherStats.heat_index.avg,
                min: weatherStats.heat_index.min,
                max: weatherStats.heat_index.max
            })
        };
        case "Pressure": {
            return ({
                unit: "hPa",
                weatherParameter: "Pressure",
                avg: weatherStats.pressure.avg,
                min: weatherStats.pressure.min,
                max: weatherStats.pressure.max
            })
        };
        case "Precipitation": {
            return ({
                unit: "mm",
                weatherParameter: "Precipitation",
                avg: weatherStats.precipitation.avg,
                min: weatherStats.precipitation.min,
                max: weatherStats.precipitation.max
            })
        };
        case "Precipitation Rate": {
            return ({
                unit: "mm/h",
                weatherParameter: "Precipitation Rate",
                avg: weatherStats.precipitation_rate.avg,
                min: weatherStats.precipitation_rate.min,
                max: weatherStats.precipitation_rate.max
            })
        };
        case "Wind Chill": {
            return ({
                unit: "°C",
                weatherParameter: "Wind Chill",
                avg: weatherStats.wind_chill.avg,
                min: weatherStats.wind_chill.min,
                max: weatherStats.wind_chill.max
            })
        };
        case "Wind Direction": {
            return ({
                unit: "°",
                weatherParameter: "Wind Direction",
                avg: weatherStats.wind_direction.avg,
                min: weatherStats.wind_direction.min,
                max: weatherStats.wind_direction.max
            })
        };
        case "Wind Gust": {
            return ({
                unit: "km/h",
                weatherParameter: "Wind Gust",
                avg: weatherStats.wind_gust.avg,
                min: weatherStats.wind_gust.min,
                max: weatherStats.wind_gust.max
            })
        };
        case "Wind Speed": {
            return ({
                unit: "km/h",
                weatherParameter: "Wind Speed",
                avg: weatherStats.wind_speed.avg,
                min: weatherStats.wind_speed.min,
                max: weatherStats.wind_speed.max
            })
        };
    }
}

export function getLineDataKey(weatherParameter: WeatherParameter) {
    switch (weatherParameter) {
        case "Temperature": {
            return "temperature";
        };
        case "Dew Point": {
            return "dewpoint";
        };
        case "Humidity": {
            return "humidity";
        };
        case "Heat Index": {
            return "heat_index";
        };
        case "Pressure": {
            return "pressure";
        };
        case "Precipitation": {
            return "precipitation";
        };
        case "Precipitation Rate": {
            return "precipitation_rate";
        };
        case "Wind Chill": {
            return "wind_chill";
        };
        case "Wind Direction": {
            return "wind_direction";
        };
        case "Wind Gust": {
            return "wind_gust";
        };
        case "Wind Speed": {
            return "wind_speed";
        };
    }
}

export function countWindDirections(weatherData: Array<WeatherHistoryTransformed>, windDirectionsCounted: Record<string, number>) {
    for (const observation in weatherData) {
        const windDirection = getWindDirection(weatherData[observation].wind_direction);

        if (!windDirection) {
            continue;
        }

        windDirectionsCounted[windDirection]++;
    }
}

export function transformWindDirectionsDataForRadarChart(windDirectionsCounted: Record<string, number>) {
    const data = [];
    for (const windDirection in windDirectionsCounted) {
        const dataEntry = {
            windDirection: windDirection,
            count: windDirectionsCounted[windDirection]
        }
        data.push(dataEntry);
    }
    return data;
}

export function getLineChartProperties(yAxisRangeStart: number | null, yAxisRangeEnd: number | null, xAxisTimeStart: number, period: WeatherPeriod) {
    const yAxisDataMin = yAxisRangeStart ?? 0;
    const yAxisDataMax = yAxisRangeEnd ?? 0;

    const yStart = Math.floor(yAxisDataMin / 5) * 5;
    const yEnd = Math.floor(yAxisDataMax / 5) * 5 + 5;

    const yTicks = [];
    for (let i = yStart; i <= yEnd; i += 5) {
        yTicks.push(i);
    }

    const xTicks = [];
    const date = toZonedTime(new Date(xAxisTimeStart), WEATHER_STATION_TIMEZONE);
    if (period === "day") {
        for (let i = 0; i <= 24; i += 3) {
            date.setHours(i, 0, 0, 0);
            const utcDateInWeatherStationTimezone = fromZonedTime(date, WEATHER_STATION_TIMEZONE);
            xTicks.push(utcDateInWeatherStationTimezone.getTime());
        }
    }
    if (period === "month") {
        const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth())

        for (let i = 1; i <= daysInMonth; i++) {
            date.setDate(i);
            const utcDateInWeatherStationTimezone = fromZonedTime(date, WEATHER_STATION_TIMEZONE);
            xTicks.push(utcDateInWeatherStationTimezone.getTime());
        }
    }

    return ({
        yStart: yStart,
        yEnd: yEnd,
        yTicks: yTicks,
        xTicks: xTicks
    })
}

export function capitaliseEachWord(sentence: string) {

    const words = sentence.split(" ");

    for (const wordIndex in words) {
        words[wordIndex] = words[wordIndex][0].toUpperCase() + words[wordIndex].substring(1);
    }

    return words.join(" ");
}

export function getVisibilityDescription(visibility: number | null) {
    if (visibility === null || visibility === undefined) {
        return visibility;
    }

    if (visibility >= 10000) {
        return "Good";
    }
    if (visibility >= 6000 && visibility < 10000) {
        return "Moderate";
    }
    if (visibility >= 1000 && visibility < 6000) {
        return "Poor";
    }
    if (visibility >= 0 && visibility < 1000) {
        return "Very Poor";
    }
}

export function getAirQualityDescription(airQuality: number | null) {
    switch (airQuality) {
        case 1: {
            return "Good";
        }
        case 2: {
            return "Fair";
        }
        case 3: {
            return "Moderate";
        }
        case 4: {
            return "Poor";
        }
        case 5: {
            return "Very Poor";
        }
        default:
            return airQuality;
    }
}

export function getUvIndexSeverity(uvIndex: number | null) {
    if (uvIndex === undefined || uvIndex === null) {
        return uvIndex;
    }

    if (uvIndex >= 0 && uvIndex <= 2) {
        return "Low";
    }
    if (uvIndex > 2 && uvIndex <= 5) {
        return "Moderate";
    }
    if (uvIndex > 5 && uvIndex <= 7) {
        return "High";
    }
    if (uvIndex > 7 && uvIndex <= 10) {
        return "Very High";
    }
    if (uvIndex > 10) {
        return "Extreme";
    }
}

export function getCurrentConditionsDescriptionAndIconName(weatherDescription: string | null, updateTime: number | null, sunriseTime: number | null, sunsetTime: number | null) {
    if (!weatherDescription) {
        return ({
            conditionsDescription: "Unknown",
            weatherConditionsIconDescription: "unknown"
        })
    }
    const conditionsDescription = capitaliseEachWord(weatherDescription);
    let weatherConditionsIconName;
    if (
        updateTime &&
        sunriseTime &&
        sunsetTime &&
        (updateTime <= sunriseTime ||
            updateTime >= sunsetTime)
    ) {
        weatherConditionsIconName = weatherDescription + " night";
    } else {
        weatherConditionsIconName = weatherDescription;
    }
    if (!(weatherConditionsIconName in icons)) {
        weatherConditionsIconName = "unknown";
    }
    
    return ({
        conditionsDescription: conditionsDescription,
        weatherConditionsIconName: weatherConditionsIconName
    })
}