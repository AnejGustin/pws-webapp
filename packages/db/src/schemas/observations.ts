import {
  pgTable,
  serial,
  doublePrecision,
  integer,
  timestamp,
  index,
  unique
} from "drizzle-orm/pg-core";

export const observations = pgTable("observations", {
  id: serial("id").primaryKey(),

  temperature: doublePrecision("temperature"),
  temperatureDeltaLastHour: doublePrecision("temperature_delta_last_hour"),
  dewpoint: doublePrecision("dewpoint"),
  humidity: doublePrecision("humidity"),
  heatIndex: doublePrecision("heat_index"),

  pressure: doublePrecision("pressure"),
  pressureDeltaLastHour: doublePrecision("pressure_delta_last_hour"),

  windSpeed: doublePrecision("wind_speed"),
  windDirection: integer("wind_direction"),
  windGust: doublePrecision("wind_gust"),
  windChill: doublePrecision("wind_chill"),

  precipitation: doublePrecision("precipitation"),
  precipitationRate: doublePrecision("precipitation_rate"),

  solarRadiation: doublePrecision("solar_radiation"),
  uv: doublePrecision("uv"),

  observationTime: timestamp("observation_time").notNull(),
  createdAt: timestamp("created_at").defaultNow()
},
  (t) => [
    index("observation_time_index").on(t.observationTime),
    
    unique("observation_time_unique").on(t.observationTime)
  ],
);

export type ObservationReading = typeof observations.$inferInsert;
export type ObservationReadingSelect = typeof observations.$inferSelect;