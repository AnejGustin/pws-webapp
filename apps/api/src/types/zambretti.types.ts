import type { ObservationReadingSelect } from "db";

export type ZambrettiForecastInput = {
    latest: Array<ObservationReadingSelect>,
    threeHoursAgo: Array<ObservationReadingSelect>
}

export type ZambrettiPressureTrend = "rising" | "steady" | "falling";