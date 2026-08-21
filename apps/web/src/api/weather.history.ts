import { api } from ".";
import type { WeatherHistoryQuery } from "shared";
import type { WeatherHistoryEndPointResponse } from "../components/history/types";

export async function getWeatherHistory(args: WeatherHistoryQuery): Promise<WeatherHistoryEndPointResponse> {
    try {
        const response = await api.get("/api/v1/weather/history",
            {
                params: {
                    from: args.from,
                    to: args.to
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}