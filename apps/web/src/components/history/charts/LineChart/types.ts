import type { WeatherPeriod } from "shared";
import type { WeatherHistoryTransformed } from "../../types";

export type LineChartProps = {
    weatherData: Array<WeatherHistoryTransformed>,
    lineDataKey: string,
    lineDataKeyDisplayName: string,
    yAxisRangeStart: number | null,
    yAxisRangeEnd: number | null,
    xAxisTimeStart: number,
    xAxisTimeEnd: number,
    stroke: string,
    dot: {} | boolean,
    dateTimeOptions: {},
    unit: string,
    period: WeatherPeriod,
}