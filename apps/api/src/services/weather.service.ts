import {
  db,
  observations,
  desc,
  between,
  stats,
  eq,
  and,
  forecastZambretti
} from "db";

export async function getLatestReading() {
  return db
    .select()
    .from(observations)
    .orderBy(
      desc(observations.observationTime)
    )
    .limit(1);
}

export async function getReadingsForRange(from: Date, to: Date) {
  const readings = await db
    .select()
    .from(observations)
    .where(
      between(
        observations.observationTime,
        from,
        to
      )
    );

  if (readings.length === 0) {
    return null;
  }
  return readings;
}

export async function getStatsForAllTime() {
  return db
    .select()
    .from(stats)
    .where(
      eq(
        stats.type, "all_time"
      )
    );
}

export async function getStatsForYear(year: number) {
  return db
    .select()
    .from(stats)
    .where(
      and(
        eq(
          stats.type, "year"
        ),
        eq(
          stats.year, year
        )
      )
    );
}

export async function getStatsForMonth(year: number, month: number) {
  return db
    .select()
    .from(stats)
    .where(
      and(
        eq(
          stats.type, "month"
        ),
        eq(
          stats.year, year
        ),
        eq(
          stats.month, month
        )
      )
    );
}

export async function getStatsForDay(year: number, month: number, day: number) {
  return db
    .select()
    .from(stats)
    .where(
      and(
        eq(
          stats.type, "day"
        ),
        eq(
          stats.year, year
        ),
        eq(
          stats.month, month
        ),
        eq(
          stats.day, day
        )
      )
    );
}

export async function getLatestZambrettiForecast() {
  return db
    .select()
    .from(forecastZambretti)
    .orderBy(
      desc(forecastZambretti.createdAt)
    )
    .limit(1);
}