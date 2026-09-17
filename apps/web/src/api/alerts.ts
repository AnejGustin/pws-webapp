import { api } from ".";
import type { AlertsEndPointResponse } from "../components/alerts/types";

export async function getAlerts(): Promise<AlertsEndPointResponse> {
    try {
        const response = await api.get("/api/v1/weather/alerts");
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}