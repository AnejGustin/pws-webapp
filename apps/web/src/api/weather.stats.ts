import { api } from ".";
import type { WeatherStatsQuery } from "shared";
import type { WeatherStatsEndPointResponse } from "../components/history/types";

export async function getWeatherStats(args: WeatherStatsQuery): Promise<WeatherStatsEndPointResponse> {
    try {
        const response = await api.get("/api/v1/weather/stats",
            {
                params: {
                    period: args.period,
                    date: args.date
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}