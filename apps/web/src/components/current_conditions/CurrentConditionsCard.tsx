import { useQuery } from "@tanstack/react-query";
import {
  formatTime,
  getAirQualityDescription,
  getCurrentConditionsDescriptionAndIconName,
  getSeverityDescriptionForAirParticleConcentration,
  getUvIndexSeverity,
  getUvIndexSeverityTooltipInfo,
  getVisibilityDescription,
} from "../../utils/utils";
import { useState } from "react";
import Card from "../Card/Card";
import { RefreshCw } from "lucide-react";
import InfoCard from "../info/InfoCard";
import { WEATHER_STATION_TIMEZONE } from "shared";
import { getCurrentWeatherConditions } from "../../api/current.conditions";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import SideElement from "../dashboard/WeatherCard/SideElement/SideElement";
import InfoTooltip from "../InfoToolTip/InfoTooltip";
import type { IconName } from "../WeatherIcon/types";
import { useTranslation } from "react-i18next";

export default function CurrentConditionsCard() {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const currentConditionsQuery = useQuery({
    queryKey: ["weather", "current"],
    queryFn: getCurrentWeatherConditions,
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  if (currentConditionsQuery.isPending) {
    return (
      <InfoCard
        message={"Loading Current Weather Conditions..."}
        textColor={"text-[var(--color-info-text)]"}
      >
        <RefreshCw
          size={20}
          className="animate-spin text-[var(--color-icon)]"
        />
      </InfoCard>
    );
  }

  if (currentConditionsQuery.error) {
    console.log(currentConditionsQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Current Weather Conditions"}
        textColor={"text-[var(--color-error-text)]"}
      />
    );
  }

  const currentConditionsData = currentConditionsQuery.data?.data;

  if (!currentConditionsData) {
    return (
      <InfoCard
        message={"No Current Weather Conditions Available"}
        textColor={"text-[var(--color-info-text)]"}
      />
    );
  }

  let updateTime;
  if (currentConditionsData.last_update_time) {
    updateTime = formatTime(currentConditionsData.last_update_time, {
      timeZone: WEATHER_STATION_TIMEZONE,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    updateTime = "-";
  }
  const sunriseTime = currentConditionsData.sunrise;
  const sunsetTime = currentConditionsData.sunset;
  const visibility = currentConditionsData.visibility;
  const cloudCover = currentConditionsData.cloud_cover;
  const airQualityComponents = currentConditionsData.aq;
  const airQuality = airQualityComponents.aqi;
  const uvIndex = currentConditionsData.uv_index;

  const uvIndexSeverity = getUvIndexSeverity(uvIndex);
  const uvIndexSeverityTooltipDescription =
    getUvIndexSeverityTooltipInfo(uvIndexSeverity);
  const airQualityDescription = getAirQualityDescription(airQuality);
  const visibilityDescription = getVisibilityDescription(visibility);

  const { conditionsDescription, weatherConditionsIconName, iconAlt } =
    getCurrentConditionsDescriptionAndIconName(
      currentConditionsData.weather_description,
      currentConditionsData.last_update_time,
      sunriseTime,
      sunsetTime,
    );

  let sunriseFormatted;
  if (sunriseTime) {
    sunriseFormatted = formatTime(sunriseTime, {
      timeZone: WEATHER_STATION_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  let sunsetFormatted;
  if (sunsetTime) {
    sunsetFormatted = formatTime(sunsetTime, {
      timeZone: WEATHER_STATION_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function animateIcons() {
    setIsHovered(true);
  }

  function stopIconsAnimation() {
    setIsHovered(false);
  }

  return (
    <Card onMouseEnter={animateIcons} onMouseLeave={stopIconsAnimation}>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-10">
          {t("common.Current Weather Conditions")}
        </h2>

        <div className="flex flex-col items-center text-center space-y-2 mb-10 p-2">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[var(--color-primary-card-text)]">
              {t(`weather.current.${conditionsDescription}`)}
            </p>

            <p className="text-sm text-[var(--color-secondary-card-text)]">
              {t("common.Last OpenWeather Update")}: {updateTime}
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <WeatherIcon
              icon={weatherConditionsIconName as IconName}
              iconAlt={iconAlt}
              animate={isHovered}
            />
          </div>
        </div>
        <div className="flex justify-center mt-auto pb-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 md:gap-y-3 gap-x-5 md:gap-x-12">
            <SideElement
              parameter={t("common.sun.Sunrise")}
              value={sunriseFormatted}
            />
            <SideElement
              parameter={t("common.sun.Sunset")}
              value={sunsetFormatted}
            />
            <SideElement
              parameter={t("weather.UV Index")}
              value={uvIndex}
              description={`(${t(`common.uv.severity.${uvIndexSeverity}`)})`}
              hoverContent={
                uvIndexSeverityTooltipDescription != null
                  ? [
                      <div className="text-nowrap">
                        <p>
                          {t(`common.uv.description.${uvIndexSeverityTooltipDescription}`)}
                        </p>
                      </div>,
                    ]
                  : undefined
              }
            />
            <SideElement
              parameter={t("common.Visibility Metres")}
              value={visibility}
              description={`(${t(`common.visibility.description.${visibilityDescription}`)})`}
            />
            <SideElement
              parameter={t("common.Cloud Cover")}
              value={cloudCover}
              unit="%"
            />
            <SideElement
              parameter={t("common.aq.Air Quality Index")}
              value={airQuality}
              description={`(${t(`common.aq.severity.${airQualityDescription}`)})`}
              hoverContent={[
                <div className="text-nowrap">
                  <p className="text-sm font-semibold text-[var(--color-primary-card-text)] mb-3">
                    {t("common.aq.Concentration")}: µg/m³
                  </p>

                  <div className="flex flex-col text-sm font-medium gap-4">
                    <SideElement
                      parameter={t(
                        "common.aq.particles.Fine Particles (PM2.5)",
                      )}
                      value={airQualityComponents.pm2_5}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "PM2.5",
                          airQualityComponents.pm2_5,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t(
                        "common.aq.particles.Coarse Particles (PM10)",
                      )}
                      value={airQualityComponents.pm10}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "PM10",
                          airQualityComponents.pm10,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t(
                        "common.aq.particles.Nitrogen Dioxide (NO2)",
                      )}
                      value={airQualityComponents.no2}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "NO2",
                          airQualityComponents.no2,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t("common.aq.particles.Ozone (O3)")}
                      value={airQualityComponents.o3}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "O3",
                          airQualityComponents.o3,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t("common.aq.particles.Sulphur Dioxide (SO2)")}
                      value={airQualityComponents.so2}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "SO2",
                          airQualityComponents.so2,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t("common.aq.particles.Carbon Monoxide (CO)")}
                      value={airQualityComponents.co}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "CO",
                          airQualityComponents.co,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t("common.aq.particles.Ammonia (NH3)")}
                      value={airQualityComponents.nh3}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "NH3",
                          airQualityComponents.nh3,
                        )}`,
                      )})`}
                    />

                    <SideElement
                      parameter={t(
                        "common.aq.particles.Nitrogen Monoxide (NO)",
                      )}
                      value={airQualityComponents.no}
                      description={`(${t(
                        `common.aq.severity.${getSeverityDescriptionForAirParticleConcentration(
                          "NO",
                          airQualityComponents.no,
                        )}`,
                      )})`}
                    />
                  </div>
                </div>,
              ]}
            />
          </div>
        </div>
      </div>
      <InfoTooltip>
        <p>
          {t("common.Data about current conditions is collected from")}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-[var(--color-blue-text)] hover:underline"
          >
            OpenWeather
          </a>
          .
        </p>
        <p>
          {t("common.Data about UV index is collected from")}
          <a
            href="https://uvindexapi.com/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-[var(--color-blue-text)] hover:underline"
          >
            UV Index API
          </a>
          .
        </p>
      </InfoTooltip>
    </Card>
  );
}
