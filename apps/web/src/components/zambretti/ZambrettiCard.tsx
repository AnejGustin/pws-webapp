import { useQuery } from "@tanstack/react-query";
import { getLatestZambrettiForecast } from "../../api/forecast.zambretti";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { forecastTextToIconProps } from "./forecastTextToIconPropsMap";
import InfoTooltip from "../InfoToolTip/InfoTooltip";
import { formatTime } from "../../utils/utils";
import { useState } from "react";
import Card from "../Card/Card";
import { RefreshCw } from "lucide-react";
import InfoCard from "../info/InfoCard";
import { WEATHER_STATION_TIMEZONE } from "shared";
import { useTranslation } from "react-i18next";

export default function ZambrettiCard() {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const zambrettiLatestQuery = useQuery({
    queryKey: ["weather", "forecast", "zambretti", "latest"],
    queryFn: getLatestZambrettiForecast,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  if (zambrettiLatestQuery.isPending) {
    return (
      <InfoCard
        message={"Loading Latest Zambretti Forecast..."}
        textColor={"text-[var(--color-info-text)]"}
      >
        <RefreshCw size={20} className="animate-spin text-[var(--color-icon)]" />
      </InfoCard>
    );
  }

  if (zambrettiLatestQuery.error) {
    console.log(zambrettiLatestQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Latest Zambretti Forecast"}
        textColor={"text-[var(--color-error-text)]"}
      />
    );
  }

  const zambrettiForecastData = zambrettiLatestQuery.data?.data;

  if (!zambrettiForecastData) {
    return (
      <InfoCard
        message={"No Zambretti Forecast Available"}
        textColor={"text-[var(--color-info-text)]"}
      />
    );
  }

  const forecastTime = formatTime(zambrettiForecastData.created_at, {
    timeZone: WEATHER_STATION_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const forecastText = zambrettiForecastData.forecast_text;
  const { icon, iconAlt, trend, trendAlt } =
    forecastTextToIconProps[forecastText];

  function animateIcons() {
    setIsHovered(true);
  }

  function stopIconsAnimation() {
    setIsHovered(false);
  }

  return (
    <Card onMouseEnter={animateIcons} onMouseLeave={stopIconsAnimation}>
      <h2 className="text-xl font-semibold mb-10">{t("common.Short Term Forecast")}</h2>

      <div className="flex flex-col items-center text-center space-y-15 mb-10 p-2">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-[var(--color-primary-card-text)]">{t(`weather.forecast.zambretti.${forecastText}`)}</p>

          <p className="text-sm text-[var(--color-secondary-card-text)]">
            {t("common.Last Forecast Run")}: {forecastTime}
          </p>
        </div>
        <div className="grid w-full grid-cols-2 pl-6">
          <div className="flex justify-center">
            <WeatherIcon icon={icon} iconAlt={iconAlt} animate={isHovered} />
          </div>

          <div className="flex justify-center">
            <WeatherIcon icon={trend} iconAlt={trendAlt} animate={isHovered} />
          </div>
        </div>
      </div>
      <InfoTooltip>
        <p>
          {t("common.zambretti.info.text1")}
        </p>

        <p>
          {t("common.zambretti.info.text2")}
        </p>

        <p>
          {t("common.zambretti.info.text3")}
        </p>

        <a
          href="https://github.com/AnejGustin/pws-webapp#zambretti-algorithm"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-blue-text)] hover:underline"
        >
          {t("common.More details")}
        </a>
      </InfoTooltip>
    </Card>
  );
}
