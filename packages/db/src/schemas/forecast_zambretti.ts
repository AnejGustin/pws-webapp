import {
  pgTable,
  serial,
  timestamp,
  index,
  unique,
  text
} from "drizzle-orm/pg-core";

export const forecastZambretti = pgTable("forecast_zambretti", {
  id: serial("id").primaryKey(),
  forecastText: text("forecast_text").notNull(),
  createdAt: timestamp("created_at").defaultNow()
},
  (t) => [
    index("created_at_index").on(t.createdAt),
    
    unique("created_at_unique").on(t.createdAt)
  ],
);

export type ForecastZambrettiReading = typeof forecastZambretti.$inferInsert;