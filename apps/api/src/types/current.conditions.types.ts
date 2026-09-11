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
            },
            components: {
                co: number | null,
                no: number | null,
                no2: number | null,
                o3: number | null,
                so2: number | null,
                pm2_5: number | null,
                pm10: number | null,
                nh3: number | null,
            },
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