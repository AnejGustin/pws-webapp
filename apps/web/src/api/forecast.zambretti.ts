import { api } from ".";
import type { ZambrettiForecastLatestEndPointResponse } from "../components/zambretti/types";

export async function getLatestZambrettiForecast(): Promise<ZambrettiForecastLatestEndPointResponse> {
    try {
        const response = await api.get("/api/v1/weather/forecast/zambretti/latest");
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}