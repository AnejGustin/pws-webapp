import type { CurrentWeatherConditionsFormat } from "shared"

export type CurrentConditionsEndPointResponse = {
    data: CurrentWeatherConditionsFormat 
} |
{
    data: null
}