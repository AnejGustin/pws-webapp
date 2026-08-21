import { observations } from "db";

export const observationColumns = {
  temperature: observations.temperature,
  dewpoint: observations.dewpoint,
  humidity: observations.humidity,
  heatIndex: observations.heatIndex,
  pressure: observations.pressure,
  windSpeed: observations.windSpeed,
  windDirection: observations.windDirection,
  windGust: observations.windGust,
  windChill: observations.windChill,
  precipitation: observations.precipitation,
  precipitationRate: observations.precipitationRate,
  solarRadiation: observations.solarRadiation,
  uv: observations.uv,
};

export type WeatherParameter = keyof typeof observationColumns;
export type ObservationsColumn = typeof observationColumns[keyof typeof observationColumns];

export type ObservationWindDirection = {
  windDirection: number | null
}

export type WeatherUndergroundApiObservationResponse = {
  observations: Array<{
    stationID: string,
    obsTimeUtc: Date | null,
    obsTimeLocal: Date | null,
    neighborhood: string | null,
    softwareType: string | null,
    country: string | null,
    solarRadiation: number | null,
    lon: number | null,
    realtimeFrequency: number | null,
    epoch: number | null,
    lat: number | null,
    uv: number | null,
    winddir: number | null,
    humidity: number | null,
    qcStatus: number,
    metric: {
      temp: number | null,
      heatIndex: number | null,
      dewpt: number | null,
      windChill: number | null,
      windSpeed: number | null,
      windGust: number | null,
      pressure: number | null,
      precipRate: number | null,
      precipTotal: number | null,
      elev: number | null
    }
  }>
}

export type WeatherStats = {
  minTemperature: number | null,
  maxTemperature: number | null,

  minDewpoint: number | null,
  maxDewpoint: number | null,

  minHumidity: number | null,
  maxHumidity: number | null,

  minHeatIndex: number | null,
  maxHeatIndex: number | null,

  minPressure: number | null,
  maxPressure: number | null,

  maxWindSpeed: number | null,

  maxWindGust: number | null,

  minWindChill: number | null,
  maxWindChill: number | null,

  maxPrecipitation: number | null,

  maxPrecipitationRate: number | null,

  maxSolarRadiation: number | null,

  maxUv: number | null,
}