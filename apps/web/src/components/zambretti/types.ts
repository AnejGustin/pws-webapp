import type { ForecastZambrettiFormat } from "shared"
import type { IconName } from "./WeatherIcon/types"

export type ForecastTextToIconPropsMapMember = {
    icon: IconName,
    iconAlt: string,
    trend: IconName,
    trendAlt: string
}

export type ZambrettiForecastLatestEndPointResponse = {
    data: ForecastZambrettiFormat 
} |
{
    data: null
}