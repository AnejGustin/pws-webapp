import { api } from ".";
import type { WeatherLatestEndPointResponse } from "../components/dashboard/types";

export async function getLatestWeather(): Promise<WeatherLatestEndPointResponse> {
    try {
        const response = await api.get("/api/v1/weather/latest");
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}