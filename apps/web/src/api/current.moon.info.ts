import { api } from ".";
import type { CurrentMoonInfoEndPointResponse } from "../components/moon/types";


export async function getCurrentMoonInfo(): Promise<CurrentMoonInfoEndPointResponse> {
    try {
        const response = await api.get("/api/v1/moon/current");
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}