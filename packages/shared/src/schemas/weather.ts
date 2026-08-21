import * as z from "zod";

export const weatherPeriodSchema = z.enum([
    "all_time",
    "year",
    "month",
    "day",
])

export const weatherHistoryQuerySchema = z.object(
    {
        from: z.coerce.date("Expected date"),
        to: z.coerce.date("Expected date")
    }
);

export const weatherStatsQuerySchema = z.discriminatedUnion("period", [
    z.object({
        period: z.literal("all_time"),
        date: z.coerce.date().optional()
    }),
    z.object({
        period: z.literal("year"),
        date: z.coerce.date("Expected date")
    }),
    z.object({
        period: z.literal("month"),
        date: z.coerce.date("Expected date")
    }),
    z.object({
        period: z.literal("day"),
        date: z.coerce.date("Expected date")
    }),
]
);

export type WeatherStatsQuery = z.infer<typeof weatherStatsQuerySchema>;
export type WeatherHistoryQuery = z.infer<typeof weatherHistoryQuerySchema>;
export type WeatherPeriod = z.infer<typeof weatherPeriodSchema>;