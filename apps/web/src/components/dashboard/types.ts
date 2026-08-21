import type { WeatherReadingFormat } from "shared"

export type WeatherLatestEndPointResponse = {
    data: WeatherReadingFormat
} |
{
    data: null
}