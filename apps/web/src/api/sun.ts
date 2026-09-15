import { api } from ".";
import type { SunInfoEndPointResponse } from "../components/sun/types";

export async function getSunInfo(): Promise<SunInfoEndPointResponse> {
    try {
        const response = await api.get("/api/v1/sun");
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}