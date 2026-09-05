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

export default function ZambrettiCard() {
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
        textColor={"text-gray-700"}
      >
        <RefreshCw size={20} className="animate-spin" />
      </InfoCard>
    );
  }

  if (zambrettiLatestQuery.error) {
    console.log(zambrettiLatestQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Latest Zambretti Forecast"}
        textColor={"text-red-600"}
      />
    );
  }

  const zambrettiForecastData = zambrettiLatestQuery.data?.data;

  if (!zambrettiForecastData) {
    return (
      <InfoCard
        message={"No Zambretti Forecast Available"}
        textColor={"text-gray-700"}
      />
    );
  }

  const forecastTime = formatTime(zambrettiForecastData.created_at, {
    timezone: WEATHER_STATION_TIMEZONE,
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
      <h2 className="text-xl font-semibold mb-10">Short Term Forecast</h2>

      <div className="flex flex-col items-center text-center space-y-15 mb-10 p-2">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900">{forecastText}</p>

          <p className="text-sm text-gray-500">
            Last Forecast Run: {forecastTime}
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
          This forecast is a short-term atmospheric tendency prediction valid
          for up to 12 hours ahead, and up to 24 hours under stable conditions.
        </p>

        <p>
          It is based on a modified Zambretti algorithm that uses barometric
          pressure trends as the primary driver. Wind direction, wind speed, and
          seasonal context are included as secondary factors with limited
          influence on the final outcome.
        </p>

        <p>
          This model is calibrated for Slovenian weather patterns and is
          intended for trend indication rather than precise meteorological
          forecasting.
        </p>

        <a
          href="https://github.com/AnejGustin/pws-webapp#zambretti-algorithm"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          More details
        </a>
      </InfoTooltip>
    </Card>
  );
}
