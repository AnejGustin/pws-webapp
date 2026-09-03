import { api } from ".";
import type { CurrentConditionsEndPointResponse } from "../components/current_conditions/types";

export async function getCurrentWeatherConditions(): Promise<CurrentConditionsEndPointResponse> {
    try {
        const response = await api.get("/api/v1/weather/current-conditions");
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}