export type UvIndexApiResponse = {
    now: {
        uv_index: number | null
    },
}

export type AirQualityApiResponse = {
    list: [
        {
            main: {
                aqi: number | null
            }
        }
    ]
}

export type CurrentConditionsApiResponse = {
    weather: [
        {
            description: string | null,
        }
    ],
    visibility: number | null,
    clouds: {
        all: number | null,
    }
    dt: number | null,
    sys: {
        sunrise: number | null,
        sunset: number | null,
    }
}