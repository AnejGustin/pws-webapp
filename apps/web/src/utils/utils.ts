import {
    WEATHER_STATION_TIMEZONE,
    type CurrentMoonInfoFormat,
    type SunInfoFormat,
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
import i18n from "../i18n/config/i18n";

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

export function getStatsCardTimeAsText(period: WeatherPeriod, selectedDay: number, selectedMonth: number, selectedYear: number, t: (key: string) => string) {
    switch (period) {
        case "all_time": {
            return t("dropdowns.All Time");
        }
        case "year": {
            const yearAsString = selectedYear.toString();

            return `${yearAsString}`;
        }
        case "month": {
            const monthAsString = t(`dropdowns.${numberToMonth(selectedMonth)}`);
            const yearAsString = selectedYear.toString();

            return `${monthAsString} ${yearAsString}`;
        }
        case "day": {
            const dayAsString = selectedDay.toString();
            const monthAsString = t(`dropdowns.${numberToMonth(selectedMonth)}`);
            const yearAsString = selectedYear.toString();

            return `${dayAsString} ${monthAsString} ${yearAsString}`;
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
    let secondsSinceLastUpdate = Math.floor((currentTime - new Date(lastObservationTime).getTime()) / 1000);
    let minutesSinceLastUpdate = Math.floor(secondsSinceLastUpdate / 60);
    let hoursSinceLastUpdate = Math.floor(minutesSinceLastUpdate / 60);
    let daysSinceLastUpdate = Math.floor(hoursSinceLastUpdate / 24);

    const rtf1 = new Intl.RelativeTimeFormat(i18n.language, { style: "long" });

    if (secondsSinceLastUpdate === 1) {
        return rtf1.format(-secondsSinceLastUpdate, "second");
    }
    if (secondsSinceLastUpdate < 60) {
        return rtf1.format(-secondsSinceLastUpdate, "seconds");
    }
    if (minutesSinceLastUpdate === 1) {
        return rtf1.format(-minutesSinceLastUpdate, "minute");
    }
    if (minutesSinceLastUpdate < 60) {
        return rtf1.format(-minutesSinceLastUpdate, "minutes");
    }
    if (hoursSinceLastUpdate === 1) {
        return rtf1.format(-hoursSinceLastUpdate, "hour");
    }
    if (hoursSinceLastUpdate < 24) {
        return rtf1.format(-hoursSinceLastUpdate, "hours");
    }
    if (daysSinceLastUpdate === 1) {
        return rtf1.format(-daysSinceLastUpdate, "day");
    }
    return rtf1.format(-daysSinceLastUpdate, "days");
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
            weatherConditionsIconDescription: "unknown",
            iconAlt: "Unknown",
        })
    }
    const conditionsDescription = capitaliseEachWord(weatherDescription);
    let iconAlt;
    let weatherConditionsIconName;
    if (
        updateTime &&
        sunriseTime &&
        sunsetTime &&
        (updateTime <= sunriseTime ||
            updateTime >= sunsetTime)
    ) {
        weatherConditionsIconName = weatherDescription + " night";
        iconAlt = weatherDescription + " night";
    } else {
        weatherConditionsIconName = weatherDescription;
        iconAlt = weatherDescription;
    }
    if (!(weatherConditionsIconName in icons)) {
        weatherConditionsIconName = "unknown";
        iconAlt = "Unknown";
    }

    return ({
        conditionsDescription: conditionsDescription,
        weatherConditionsIconName: weatherConditionsIconName,
        iconAlt: iconAlt,
    })
}

export function getMoonInfoForDisplay(currentMoonInfoData: CurrentMoonInfoFormat) {
    let updateTime;
    if (currentMoonInfoData.last_update_time) {
        updateTime = formatTime(currentMoonInfoData.last_update_time, {
            timeZone: WEATHER_STATION_TIMEZONE,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        updateTime = "-";
    }

    const name = currentMoonInfoData.name ?? "Unknown";

    let iconName;
    let iconAlt;
    if (!(name in icons)) {
        iconName = "unknown";
        iconAlt = "Unknown";
    } else {
        iconName = name;
        iconAlt = name;
    }

    const illumination = currentMoonInfoData.illumination
        ? (currentMoonInfoData.illumination * 100).toFixed(1)
        : "-";
    const riseTime = currentMoonInfoData.rise_set.rise_time;
    const setTime = currentMoonInfoData.rise_set.set_time;
    const distance = currentMoonInfoData.distance_km ?? "-";

    const nextFullMoon = currentMoonInfoData.forecast.full_moon.date;
    const nextFullMoonDaysUntil =
        currentMoonInfoData.forecast.full_moon.days_until;

    const nextFirstQuarter = currentMoonInfoData.forecast.first_quarter.date;

    const nextLastQuarter = currentMoonInfoData.forecast.last_quarter.date;

    const nextNewMoon = currentMoonInfoData.forecast.new_moon.date;
    const nextNewMoonDaysUntil = currentMoonInfoData.forecast.new_moon.days_until;

    const nextSpecialMoon = currentMoonInfoData.forecast.next_special_moon.date;
    const nextSpecialMoonDaysUntil =
        currentMoonInfoData.forecast.next_special_moon.days_until;
    const nextSpecialMoonType =
        currentMoonInfoData.forecast.next_special_moon.type ?? "-";

    const nextMoonEclipse = currentMoonInfoData.forecast.next_eclipse.date;
    const nextMoonEclipseDaysUntil =
        currentMoonInfoData.forecast.next_eclipse.days_until;
    const nextMoonEclipseType =
        currentMoonInfoData.forecast.next_eclipse.type ?? "-";
    const nextMoonEclipseIsBloodMoon =
        currentMoonInfoData.forecast.next_eclipse.is_blood_moon;

    let riseTimeFormatted;
    if (riseTime) {
        riseTimeFormatted = formatTime(new Date(riseTime), {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let setTimeFormatted;
    if (setTime) {
        setTimeFormatted = formatTime(new Date(setTime), {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let nextNewMoonDateFormatted;
    if (nextNewMoon) {
        nextNewMoonDateFormatted = formatTime(new Date(nextNewMoon), {
            timeZone: WEATHER_STATION_TIMEZONE,
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }

    let nextLastQuarterDateFormatted;
    if (nextLastQuarter) {
        nextLastQuarterDateFormatted = formatTime(new Date(nextLastQuarter), {
            timeZone: WEATHER_STATION_TIMEZONE,
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }

    let nextFirstQuarterDateFormatted;
    if (nextFirstQuarter) {
        nextFirstQuarterDateFormatted = formatTime(new Date(nextFirstQuarter), {
            timeZone: WEATHER_STATION_TIMEZONE,
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }

    let nextFullMoonDateFormatted;
    if (nextFullMoon) {
        nextFullMoonDateFormatted = formatTime(new Date(nextFullMoon), {
            timeZone: WEATHER_STATION_TIMEZONE,
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }

    let nextSpecialMoonDateFormatted;
    if (nextSpecialMoon) {
        nextSpecialMoonDateFormatted = formatTime(new Date(nextSpecialMoon), {
            timeZone: WEATHER_STATION_TIMEZONE,
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }

    let nextMoonEclipseDateFormatted;
    if (nextMoonEclipse) {
        nextMoonEclipseDateFormatted = formatTime(new Date(nextMoonEclipse), {
            timeZone: WEATHER_STATION_TIMEZONE,
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }

    return ({
        updateTime: updateTime,
        name: name,
        iconName: iconName,
        iconAlt: iconAlt,
        illumination: illumination,
        distance: distance,
        nextFullMoonDaysUntil: nextFullMoonDaysUntil,
        nextNewMoonDaysUntil: nextNewMoonDaysUntil,
        nextSpecialMoonDaysUntil: nextSpecialMoonDaysUntil,
        nextSpecialMoonType: nextSpecialMoonType,
        nextMoonEclipseDaysUntil: nextMoonEclipseDaysUntil,
        nextMoonEclipseType: nextMoonEclipseType,
        nextMoonEclipseIsBloodMoon: nextMoonEclipseIsBloodMoon,
        riseTimeFormatted: riseTimeFormatted,
        setTimeFormatted: setTimeFormatted,
        nextNewMoonDateFormatted: nextNewMoonDateFormatted,
        nextLastQuarterDateFormatted: nextLastQuarterDateFormatted,
        nextFirstQuarterDateFormatted: nextFirstQuarterDateFormatted,
        nextFullMoonDateFormatted: nextFullMoonDateFormatted,
        nextSpecialMoonDateFormatted: nextSpecialMoonDateFormatted,
        nextMoonEclipseDateFormatted: nextMoonEclipseDateFormatted
    })
}

export function getSeverityDescriptionForAirParticleConcentration(airParticle: string, value: number | null) {
    if (value === null || value === undefined) {
        return "Invalid Value";
    }

    switch (airParticle) {
        case "PM2.5": {
            if (value >= 0 && value < 10) {
                return "Good";
            }
            if (value >= 10 && value < 15) {
                return "Fair";
            }
            if (value >= 15 && value < 25) {
                return "Moderate";
            }
            if (value >= 25 && value < 50) {
                return "Poor";
            }
            if (value >= 50) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "PM10": {
            if (value >= 0 && value < 20) {
                return "Good";
            }
            if (value >= 20 && value < 40) {
                return "Fair";
            }
            if (value >= 40 && value < 50) {
                return "Moderate";
            }
            if (value >= 50 && value < 100) {
                return "Poor";
            }
            if (value >= 100) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "NO2": {
            if (value >= 0 && value < 40) {
                return "Good";
            }
            if (value >= 40 && value < 90) {
                return "Fair";
            }
            if (value >= 90 && value < 120) {
                return "Moderate";
            }
            if (value >= 120 && value < 230) {
                return "Poor";
            }
            if (value >= 230) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "O3": {
            if (value >= 0 && value < 50) {
                return "Good";
            }
            if (value >= 50 && value < 100) {
                return "Fair";
            }
            if (value >= 100 && value < 130) {
                return "Moderate";
            }
            if (value >= 130 && value < 240) {
                return "Poor";
            }
            if (value >= 240) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "SO2": {
            if (value >= 0 && value < 100) {
                return "Good";
            }
            if (value >= 100 && value < 200) {
                return "Fair";
            }
            if (value >= 200 && value < 350) {
                return "Moderate";
            }
            if (value >= 350 && value < 500) {
                return "Poor";
            }
            if (value >= 500) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "CO": {
            if (value >= 0 && value < 4000) {
                return "Good";
            }
            if (value >= 4000 && value < 7000) {
                return "Fair";
            }
            if (value >= 7000 && value < 10000) {
                return "Moderate";
            }
            if (value >= 10000 && value < 15000) {
                return "Poor";
            }
            if (value >= 15000) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "NH3": {
            if (value >= 0 && value < 10) {
                return "Good";
            }
            if (value >= 10 && value < 50) {
                return "Moderate";
            }
            if (value >= 50) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        case "NO": {
            if (value >= 0 && value < 40) {
                return "Good";
            }
            if (value >= 40 && value < 90) {
                return "Fair";
            }
            if (value >= 90 && value < 120) {
                return "Moderate";
            }
            if (value >= 120 && value < 230) {
                return "Poor";
            }
            if (value >= 230) {
                return "Very Poor";
            }
            return "Invalid Value";
        }
        default: {
            return "Invalid Value";
        }
    }
}

export function getUvIndexSeverityTooltipInfo(uvIndexSeverity: string | null | undefined) {
    if (uvIndexSeverity === undefined || uvIndexSeverity === null) {
        return null;
    }

    switch (uvIndexSeverity) {
        case "Low": {
            return "Safe to stay outside with minimal protection";
        }
        case "Moderate": {
            return "Protection recommended";
        }
        case "High": {
            return "Protection is essential";
        }
        case "Very High": {
            return "Extra protection required";
        }
        case "Extreme": {
            return "Extreme risk of sunburn";
        }
        default: {
            return null;
        }
    }
}

export function getSunCardDisplayInfo(sunInfoData: SunInfoFormat) {
    let updateTime;
    if (sunInfoData.last_update_time) {
        updateTime = formatTime(sunInfoData.last_update_time, {
            timeZone: WEATHER_STATION_TIMEZONE,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        updateTime = "-";
    }
    const sunriseTime = sunInfoData.sun.sunrise;
    const sunsetTime = sunInfoData.sun.sunset;
    const dawn = sunInfoData.sun.dawn;
    const dusk = sunInfoData.sun.dusk;
    const solarNoon = sunInfoData.sun.solar_noon;
    const nauticalTwilightBegin = sunInfoData.sun.nautical_twilight_begin;
    const nauticalTwilightEnd = sunInfoData.sun.nautical_twilight_end;
    const sunMaxAltitude = sunInfoData.sun.sun_max_altitude ?? "-";
    const firstLight = sunInfoData.sun.first_light;
    const lastLight = sunInfoData.sun.last_light;

    const dayLength = sunInfoData.sun.day_length ?? "-";

    const currentUvIndex = sunInfoData.uv.now.uv_index;

    const currentUvIndexSeverity = getUvIndexSeverity(currentUvIndex);
    const currentUvIndexSeverityTooltipDescription =
        getUvIndexSeverityTooltipInfo(currentUvIndexSeverity);

    const todayMaxUvIndex = sunInfoData.uv.today.max.uv_index;

    const todayMaxUvIndexSeverity = getUvIndexSeverity(todayMaxUvIndex);
    const todayMaxUvIndexSeverityTooltipDescription =
        getUvIndexSeverityTooltipInfo(todayMaxUvIndexSeverity);

    const tomorrowUvIndex = sunInfoData.uv.now.uv_index;

    const tomorrowUvIndexSeverity = getUvIndexSeverity(tomorrowUvIndex);
    const tomorrowUvIndexSeverityTooltipDescription =
        getUvIndexSeverityTooltipInfo(tomorrowUvIndexSeverity);

    let sunriseFormatted;
    if (sunriseTime) {
        sunriseFormatted = formatTime(sunriseTime, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let sunsetFormatted;
    if (sunsetTime) {
        sunsetFormatted = formatTime(sunsetTime, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let dawnFormatted;
    if (dawn) {
        dawnFormatted = formatTime(dawn, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let duskFormatted;
    if (dusk) {
        duskFormatted = formatTime(dusk, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let solarNoonFormatted;
    if (solarNoon) {
        solarNoonFormatted = formatTime(solarNoon, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let nauticalTwilightBeginFormatted;
    if (nauticalTwilightBegin) {
        nauticalTwilightBeginFormatted = formatTime(nauticalTwilightBegin, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let nauticalTwilightEndFormatted;
    if (nauticalTwilightEnd) {
        nauticalTwilightEndFormatted = formatTime(nauticalTwilightEnd, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let firstLightFormatted;
    if (firstLight) {
        firstLightFormatted = formatTime(firstLight, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let lastLightFormatted;
    if (lastLight) {
        lastLightFormatted = formatTime(lastLight, {
            timeZone: WEATHER_STATION_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return({
        updateTime: updateTime,
        sunriseFormatted: sunriseFormatted,
        sunsetFormatted: sunsetFormatted,
        dawnFormatted: dawnFormatted,
        duskFormatted: duskFormatted,
        nauticalTwilightBeginFormatted: nauticalTwilightBeginFormatted,
        nauticalTwilightEndFormatted: nauticalTwilightEndFormatted,
        solarNoonFormatted: solarNoonFormatted,
        sunMaxAltitude: sunMaxAltitude,
        dayLength: dayLength,
        lastLightFormatted: lastLightFormatted,
        firstLightFormatted: firstLightFormatted,
        currentUvIndex: currentUvIndex,
        currentUvIndexSeverity: currentUvIndexSeverity,
        currentUvIndexSeverityTooltipDescription: currentUvIndexSeverityTooltipDescription,
        todayMaxUvIndex: todayMaxUvIndex,
        todayMaxUvIndexSeverity: todayMaxUvIndexSeverity,
        todayMaxUvIndexSeverityTooltipDescription: todayMaxUvIndexSeverityTooltipDescription,
        tomorrowUvIndex: tomorrowUvIndex,
        tomorrowUvIndexSeverity: tomorrowUvIndexSeverity,
        tomorrowUvIndexSeverityTooltipDescription: tomorrowUvIndexSeverityTooltipDescription,
    })
}