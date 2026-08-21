import type { WeatherPeriod } from "shared"
import type { WeatherHistoryEndPointResponse, WeatherParameter, WeatherStatsEndPointResponse } from "../types"
import type { UseQueryResult } from "@tanstack/react-query"

export type HistoryLayoutProps = {
    selectedWeatherParameter: WeatherParameter,
    weatherParameterOptions: Array<WeatherParameter>,
    weatherParameterDropdownOnChange: (value: WeatherParameter) => void
    selectedPeriod: WeatherPeriod,
    weatherPeriodOptions: Array<WeatherPeriod>,
    weatherPeriodDropdownOnChange: (value: WeatherPeriod) => void
    selectedYear: number,
    yearParameterOptions: Array<number>,
    yearParameterDropdwonOnChange: (value: number) => void
    selectedMonth: number,
    monthParameterOptions: Array<string>,
    monthParameterDropdwonOnChange: (value: string) => void
    selectedDay: number,
    dayParameterOptions: Array<number>,
    dayParameterDropdwonOnChange: (value: number) => void
    setAppliedWeatherParameter: (value: WeatherParameter) => void
    setAppliedPeriod: (value: WeatherPeriod) => void
    setAppliedYear: (value: number) => void
    setAppliedMonth: (value: number) => void
    setAppliedDay: (value: number) => void
    statsQuery: UseQueryResult<NoInfer<WeatherStatsEndPointResponse>, Error>,
    historyQuery: UseQueryResult<NoInfer<WeatherHistoryEndPointResponse>, Error>,
    children?: React.ReactNode,
}