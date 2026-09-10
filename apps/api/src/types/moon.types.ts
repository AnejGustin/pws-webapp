export type CurrentMoonInfoApiResponse = {
    timestamp: string | null,
    phase: {
        name: string | null,
        phase_angle_deg: number | null,
        illumination: number | null,
        age_days: number | null,
        distance_km: number | null,
    },
    rise_set: {
        rise: string | null,
        set: string | null,
    },
    special_moon: {
        labels: Array<string>
    },
    eclipse: {
        is_eclipse: boolean | null,
        is_blood_moon: boolean | null,
    },
    forecast: {
        days_until_full_moon: number | null,
        days_until_new_moon: number | null,
        next_special_moon: {
            type: string | null,
            days_until: number | null,
        },
        next_eclipse: {
            kind: string | null,
            type: string | null,
            is_blood_moon: boolean | null,
            date: string | null,
            days_until: number | null,
        },
    },
    next_phases: {
        new_moon: string | null,
        first_quarter: string | null,
        full_moon: string | null,
        last_quarter: string | null,
    }
}