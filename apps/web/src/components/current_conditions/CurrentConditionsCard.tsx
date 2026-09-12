import { useQuery } from "@tanstack/react-query";
import {
  formatTime,
  getAirQualityDescription,
  getCurrentConditionsDescriptionAndIconName,
  getUvIndexSeverity,
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

export default function CurrentConditionsCard() {
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
        textColor={"text-gray-700"}
      >
        <RefreshCw size={20} className="animate-spin" />
      </InfoCard>
    );
  }

  if (currentConditionsQuery.error) {
    console.log(currentConditionsQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Current Weather Conditions"}
        textColor={"text-red-600"}
      />
    );
  }

  const currentConditionsData = currentConditionsQuery.data?.data;

  if (!currentConditionsData) {
    return (
      <InfoCard
        message={"No Current Weather Conditions Available"}
        textColor={"text-gray-700"}
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
          Current Weather Conditions
        </h2>

        <div className="flex flex-col items-center text-center space-y-2 mb-10 p-2">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              {conditionsDescription}
            </p>

            <p className="text-sm text-gray-500">
              Last OpenWeather Update: {updateTime}
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
            <SideElement parameter={"Sunrise"} value={sunriseFormatted} />
            <SideElement parameter={"Sunset"} value={sunsetFormatted} />
            <SideElement
              parameter={"UV Index"}
              value={
                uvIndex != null && uvIndex != undefined
                  ? `${uvIndex} (${uvIndexSeverity})`
                  : "-"
              }
            />
            <SideElement
              parameter={"Visibility"}
              value={
                visibility != null && visibility != undefined
                  ? `${visibilityDescription} (${visibility} m)`
                  : "-"
              }
            />
            <SideElement
              parameter={"Cloud Cover"}
              value={cloudCover}
              unit="%"
            />
            <SideElement
              parameter={"Air Quality Index"}
              value={
                airQuality != null && airQuality != undefined
                  ? `${airQuality} (${airQualityDescription})`
                  : "-"
              }
              hoverContent={[
                <div className="text-nowrap">
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    Concentration: µg/m³
                  </p>
                  
                  <div className="flex flex-col text-sm font-medium text-gray-800 gap-4">
                    <SideElement
                      parameter="Fine Particles (PM2.5)"
                      value={airQualityComponents.pm2_5}
                    />
                  
                    <SideElement
                      parameter="Coarse Particles (PM10)"
                      value={airQualityComponents.pm10}
                    />
                  
                    <SideElement
                      parameter="Nitrogen Dioxide (NO2)"
                      value={airQualityComponents.no2}
                    />
                  
                    <SideElement
                      parameter="Ozone (O3)"
                      value={airQualityComponents.o3}
                    />
                  
                    <SideElement
                      parameter="Sulphur Dioxide (SO2)"
                      value={airQualityComponents.so2}
                    />
                  
                    <SideElement
                      parameter="Carbon Monoxide (CO)"
                      value={airQualityComponents.co}
                    />
                  
                    <SideElement
                      parameter="Ammonia (NH3)"
                      value={airQualityComponents.nh3}
                    />
                  
                    <SideElement
                      parameter="Nitrogen Monoxide (NO)"
                      value={airQualityComponents.no}
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
          Data about current conditions is collected from
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-blue-600 hover:underline"
          >
            OpenWeather
          </a>
          .
        </p>
        <p>
          Data about UV index is collected from
          <a
            href="https://uvindexapi.com/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-blue-600 hover:underline"
          >
            UV Index API
          </a>
          .
        </p>
      </InfoTooltip>
    </Card>
  );
}
