import {
    pgTable,
    serial,
    doublePrecision,
    integer,
    timestamp,
    index,
    unique,
    text
} from "drizzle-orm/pg-core";

export const stats = pgTable("stats", {
    id: serial("id").primaryKey(),

    type: text("type").notNull(),
    day: integer("day"),
    month: integer("month"),
    year: integer("year"),

    minTemperature: doublePrecision("min_temperature"),
    maxTemperature: doublePrecision("max_temperature"),
    avgTemperature: doublePrecision("avg_temperature"),

    minDewpoint: doublePrecision("min_dewpoint"),
    maxDewpoint: doublePrecision("max_dewpoint"),
    avgDewpoint: doublePrecision("avg_dewpoint"),

    minHumidity: doublePrecision("min_humidity"),
    maxHumidity: doublePrecision("max_humidity"),
    avgHumidity: doublePrecision("avg_humidity"),

    minHeatIndex: doublePrecision("min_heat_index"),
    maxHeatIndex: doublePrecision("max_heat_index"),
    avgHeatIndex: doublePrecision("avg_heat_index"),

    minPressure: doublePrecision("min_pressure"),
    maxPressure: doublePrecision("max_pressure"),
    avgPressure: doublePrecision("avg_pressure"),

    minWindSpeed: doublePrecision("min_wind_speed"),
    maxWindSpeed: doublePrecision("max_wind_speed"),
    avgWindSpeed: doublePrecision("avg_wind_speed"),

    minWindDirection: integer("min_wind_direction"),
    maxWindDirection: integer("max_wind_direction"),
    avgWindDirection: integer("avg_wind_direction"),

    minWindGust: doublePrecision("min_wind_gust"),
    maxWindGust: doublePrecision("max_wind_gust"),
    avgWindGust: doublePrecision("avg_wind_gust"),

    minWindChill: doublePrecision("min_wind_chill"),
    maxWindChill: doublePrecision("max_wind_chill"),
    avgWindChill: doublePrecision("avg_wind_chill"),

    minPrecipitation: doublePrecision("min_precipitation"),
    maxPrecipitation: doublePrecision("max_precipitation"),
    avgPrecipitation: doublePrecision("avg_precipitation"),

    minPrecipitationRate: doublePrecision("min_precipitation_rate"),
    maxPrecipitationRate: doublePrecision("max_precipitation_rate"),
    avgPrecipitationRate: doublePrecision("avg_precipitation_rate"),

    minSolarRadiation: doublePrecision("min_solar_radiation"),
    maxSolarRadiation: doublePrecision("max_solar_radiation"),
    avgSolarRadiation: doublePrecision("avg_solar_radiation"),

    minUv: doublePrecision("min_uv"),
    maxUv: doublePrecision("max_uv"),
    avgUv: doublePrecision("avg_uv"),

    observationTime: timestamp("observation_time").notNull(),
    createdAt: timestamp("created_at").defaultNow()
},
    (t) => [
        index("type_index").on(t.type),
        index("day_index").on(t.day),
        index("month_index").on(t.month),
        index("year_index").on(t.year),

        unique("type_day_month_year_unique").on(t.type, t.day, t.month, t.year)
    ],
);

export type StatsReading = typeof stats.$inferInsert;