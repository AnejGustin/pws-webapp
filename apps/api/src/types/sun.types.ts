export type sunInfoApiResponse = {
    results: {
        sunrise: string | null,
        sunset: string | null,
        first_light: string | null,
        last_light: string | null,
        dawn: string | null,
        dusk: string | null,
        solar_noon: string | null,
        day_length: string | null,
        nautical_twilight_begin: string | null,
        nautical_twilight_end: string | null,
        sun_altitude: number | null,
    }
}

export type UvIndexApiResponse = {
    now: {
        uv_index: number | null,
    },
    today: {
        max: {
            time: string | null,
            uv_index: number | null,
        } 
    },
    tomorrow: {
        max: {
            time: string | null,
            uv_index: number | null,
        } 
    },
}