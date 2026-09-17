import { useQuery } from "@tanstack/react-query";
import { getLatestWeather } from "../../api/weather";
import {
  formatTime,
  getStatusBadgeProperties,
  getTimeSinceUpdateText,
  getWindDirection,
  transformDirectionForDisplay,
} from "../../utils/utils";
import WeatherCard from "./WeatherCard/WeatherCard";
import {
  Droplet,
  Gauge,
  Navigation2,
  RefreshCw,
  Thermometer,
  Wind,
} from "lucide-react";
import SideElement from "./WeatherCard/SideElement/SideElement";
import { useEffect, useState } from "react";
import StatusRow from "./StatusRow/StatusRow";
import InfoCard from "../info/InfoCard";
import { WEATHER_STATION_TIMEZONE } from "shared";
import Title from "./Title/Title";
import { useTranslation } from "react-i18next";
import InfoTooltip from "../InfoToolTip/InfoTooltip";

export default function Dashboard() {
  const { t } = useTranslation();

  const weatherLatestQuery = useQuery({
    queryKey: ["weather", "latest"],
    queryFn: getLatestWeather,
    refetchInterval: 1 * 30 * 1000,
    staleTime: 1 * 30 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  const [clock, setClock] = useState(Date.now());
  const localTime = formatTime(clock, {
    timeZone: WEATHER_STATION_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setClock(Date.now());
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  if (weatherLatestQuery.isPending) {
    return (
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="space-y-4">
          <Title />

          <StatusRow
            localTime={localTime}
            weatherDataObservationTime="unknown"
            timeSinceUpdateText=""
            statusText="OFFLINE"
            statusColor="red"
          />

          <InfoCard
            message={"Loading Latest Weather Data..."}
            textColor={"text-[var(--color-info-text)]"}
          >
            <RefreshCw
              size={20}
              className="animate-spin text-[var(--color-icon)]"
            />
          </InfoCard>
        </div>
      </div>
    );
  }

  if (weatherLatestQuery.error) {
    console.log(weatherLatestQuery.error);
    return (
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="space-y-4">
          <Title />

          <StatusRow
            localTime={localTime}
            weatherDataObservationTime="unknown"
            timeSinceUpdateText=""
            statusText="OFFLINE"
            statusColor="red"
          />

          <InfoCard
            message={"Error While Fetching Latest Weather Data"}
            textColor={"text-[var(--color-error-text)]"}
          />
        </div>
      </div>
    );
  }

  const weatherData = weatherLatestQuery.data?.data;

  if (!weatherData) {
    return (
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="space-y-4">
          <Title />

          <StatusRow
            localTime={localTime}
            weatherDataObservationTime="unknown"
            timeSinceUpdateText=""
            statusText="OFFLINE"
            statusColor="red"
          />

          <InfoCard
            message={"No Latest Weather Data Available"}
            textColor={"text-[var(--color-info-text)]"}
          />
        </div>
      </div>
    );
  }

  const weatherDataObservationTime = formatTime(weatherData.observation_time, {
    timeZone: WEATHER_STATION_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const timeSinceUpdateText = getTimeSinceUpdateText(
    clock,
    weatherData.observation_time,
  );

  const { statusText, statusColor } = getStatusBadgeProperties(
    weatherData.observation_time,
  );
  const windDirectionForDisplayIcon = transformDirectionForDisplay(
    weatherData.wind.direction,
  );

  const windDirectionDescription = getWindDirection(weatherData.wind.direction);

  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="space-y-4">
        <Title />

        <StatusRow
          localTime={localTime}
          weatherDataObservationTime={weatherDataObservationTime}
          timeSinceUpdateText={timeSinceUpdateText}
          statusText={statusText}
          statusColor={statusColor}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <WeatherCard
            title={t("weather.Temperature")}
            titleIcon={<Thermometer />}
            value={weatherData.temperature}
            unit={"°C"}
            deltaOneHour={weatherData.deltas.one_hour.temperature}
            sideElements={[
              <SideElement
                parameter={t("weather.Humidity")}
                value={weatherData.humidity}
                unit={"%"}
                key={"humidity"}
              />,
              <SideElement
                parameter={t("weather.Dew Point")}
                value={weatherData.dewpoint}
                unit={"°C"}
                key={"dewpoint"}
                hoverContent={[
                  <div className="max-w-50">
                    <p>
                      {t(
                        `weather.info.The temperature to which air must be cooled to become completely saturated with water vapor`,
                      )}
                    </p>
                  </div>,
                ]}
              />,
              <SideElement
                parameter={t("weather.Feels Like")}
                value={weatherData.heat_index}
                unit={"°C"}
                key={"heat_index"}
                hoverContent={[
                  <div className="max-w-50">
                    <p>
                      {t(
                        `weather.info.The temperature human body perceives due to the combined effect of the actual air temperature and relative humidity`,
                      )}
                    </p>
                  </div>,
                ]}
              />,
            ]}
            deltaFallingColor={"text-[var(--color-blue-text)]"}
            deltaRisingColor={"text-[var(--color-error-text)]"}
          />

          <WeatherCard
            title={t("weather.Pressure")}
            titleIcon={<Gauge />}
            value={weatherData.pressure}
            unit={"hPa"}
            deltaOneHour={weatherData.deltas.one_hour.pressure}
          />

          <WeatherCard
            title={t("weather.Wind")}
            titleIcon={<Wind />}
            value={weatherData.wind.speed}
            unit={"km/h"}
            sideElements={[
              <SideElement
                parameter={t("weather.Apparent")}
                value={weatherData.wind.chill}
                unit={"°C"}
                key={"wind_chill"}
              />,
              <SideElement
                parameter={t("weather.Gust")}
                value={weatherData.wind.gust}
                unit={"km / h"}
                key={"wind_gust"}
              />,
              <SideElement
                parameter={t("weather.Direction")}
                value={t(`common.directions.${windDirectionDescription}`)}
                key={"wind_direction"}
                hoverContent={[
                  <div className="flex flex-col">
                    <p>
                      {t(`common.directions.N`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.N`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.NNE`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.NNE`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.NE`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.NE`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.ENE`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.ENE`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.E`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.E`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.ESE`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.ESE`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.SE`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.SE`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.SSE`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.SSE`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.S`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.S`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.SSW`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.SSW`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.SW`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.SW`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.WSW`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.WSW`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.W`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.W`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.WNW`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.WNW`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.NW`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.NW`)}
                      </span>
                    </p>
                    <p>
                      {t(`common.directions.NNW`)}:
                      <span className="ml-1">
                        {t(`common.directionsFullNames.NNW`)}
                      </span>
                    </p>
                  </div>,
                ]}
              />,
            ]}
            icon={
              <Navigation2
                className="text-[var(--color-icon)]"
                size={50}
                style={{
                  rotate: `${windDirectionForDisplayIcon}deg`,
                  transition: "rotate 0.5s ease-in-out",
                }}
              />
            }
          />

          <WeatherCard
            title={t("weather.Precipitation")}
            titleIcon={<Droplet />}
            value={weatherData.precipitation.total}
            unit={"mm"}
            sideElements={[
              <SideElement
                parameter={t("weather.Rate")}
                value={weatherData.precipitation.rate}
                unit={"mm / h"}
                key={"rain_rate"}
                hoverContent={[
                  <div className="max-w-25 md:max-w-90">
                    <p>
                      {t(
                        `weather.info.How much precipitation in milimeters would accumulate in one hour if the current rate persisted`,
                      )}
                    </p>
                  </div>,
                ]}
              />,
            ]}
          >
            <InfoTooltip>
              <p>
                {t(
                  `weather.info.1 mm = 1 liter of water per square meter`,
                )}
              </p>
            </InfoTooltip>
          </WeatherCard>
        </div>
      </div>
    </div>
  );
}
