import { useQuery } from "@tanstack/react-query";
import { capitaliseEachWord, formatTime } from "../../utils/utils";
import { useState } from "react";
import Card from "../Card/Card";
import { RefreshCw } from "lucide-react";
import InfoCard from "../info/InfoCard";
import { WEATHER_STATION_TIMEZONE } from "shared";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import SideElement from "../dashboard/WeatherCard/SideElement/SideElement";
import InfoTooltip from "../InfoToolTip/InfoTooltip";
import type { IconName } from "../WeatherIcon/types";
import { getCurrentMoonInfo } from "../../api/current.moon.info";
import CardSecondaryHero from "../card_secondary_hero/CardSecondaryHero";

export default function MoonCard() {
  const [isHovered, setIsHovered] = useState(false);

  const currentMoonInfoQuery = useQuery({
    queryKey: ["moon", "current"],
    queryFn: getCurrentMoonInfo,
    refetchInterval: 1 * 60 * 60 * 1000,
    staleTime: 1 * 60 * 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  if (currentMoonInfoQuery.isPending) {
    return (
      <InfoCard
        message={"Loading Current Moon Info..."}
        textColor={"text-gray-700"}
      >
        <RefreshCw size={20} className="animate-spin" />
      </InfoCard>
    );
  }

  if (currentMoonInfoQuery.error) {
    console.log(currentMoonInfoQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Current Moon Info"}
        textColor={"text-red-600"}
      />
    );
  }

  const currentMoonInfoData = currentMoonInfoQuery.data?.data;

  if (!currentMoonInfoData) {
    return (
      <InfoCard
        message={"No Current Moon Data Available"}
        textColor={"text-gray-700"}
      />
    );
  }

  let updateTime;
  if (currentMoonInfoData.last_update_time) {
    updateTime = formatTime(currentMoonInfoData.last_update_time, {
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

  const name = currentMoonInfoData.name ?? "-";
  const illumination = currentMoonInfoData.illumination
    ? currentMoonInfoData.illumination * 100
    : "-";
  const riseTime = currentMoonInfoData.rise_set.rise_time;
  const setTime = currentMoonInfoData.rise_set.set_time;
  const distance = currentMoonInfoData.distance_km ?? "-";

  const nextFullMoon = currentMoonInfoData.forecast.full_moon.date;
  const nextFullMoonDaysUntil =
    currentMoonInfoData.forecast.full_moon.days_until;

  const nextFirstQuarter = currentMoonInfoData.forecast.first_quarter.date;

  const nextLastQuarter = currentMoonInfoData.forecast.last_quarter.date;

  const nextNewMoon = currentMoonInfoData.forecast.new_moon.date;
  const nextNewMoonDaysUntil = currentMoonInfoData.forecast.new_moon.days_until;

  const nextSpecialMoon = currentMoonInfoData.forecast.next_special_moon.date;
  const nextSpecialMoonDaysUntil =
    currentMoonInfoData.forecast.next_special_moon.days_until;
  const nextSpecialMoonType =
    currentMoonInfoData.forecast.next_special_moon.type ?? "-";

  const nextMoonEclipse = currentMoonInfoData.forecast.next_eclipse.date;
  const nextMoonEclipseDaysUntil =
    currentMoonInfoData.forecast.next_eclipse.days_until;
  const nextMoonEclipseType =
    currentMoonInfoData.forecast.next_eclipse.type ?? "-";
  const nextMoonEclipseIsBloodMoon =
    currentMoonInfoData.forecast.next_eclipse.is_blood_moon;

  let riseTimeFormatted;
  if (riseTime) {
    riseTimeFormatted = formatTime(new Date(riseTime), {
      timeZone: WEATHER_STATION_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    riseTimeFormatted = "-";
  }

  let setTimeFormatted;
  if (setTime) {
    setTimeFormatted = formatTime(new Date(setTime), {
      timeZone: WEATHER_STATION_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    setTimeFormatted = "-";
  }

  let nextNewMoonDateFormatted;
  if (nextNewMoon) {
    nextNewMoonDateFormatted = formatTime(new Date(nextNewMoon), {
      timeZone: WEATHER_STATION_TIMEZONE,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else {
    nextNewMoonDateFormatted = "-";
  }

  let nextLastQuarterDateFormatted;
  if (nextLastQuarter) {
    nextLastQuarterDateFormatted = formatTime(new Date(nextLastQuarter), {
      timeZone: WEATHER_STATION_TIMEZONE,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else {
    nextLastQuarterDateFormatted = "-";
  }

  let nextFirstQuarterDateFormatted;
  if (nextFirstQuarter) {
    nextFirstQuarterDateFormatted = formatTime(new Date(nextFirstQuarter), {
      timeZone: WEATHER_STATION_TIMEZONE,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else {
    nextFirstQuarterDateFormatted = "-";
  }

  let nextFullMoonDateFormatted;
  if (nextFullMoon) {
    nextFullMoonDateFormatted = formatTime(new Date(nextFullMoon), {
      timeZone: WEATHER_STATION_TIMEZONE,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else {
    nextFullMoonDateFormatted = "-";
  }

  let nextSpecialMoonDateFormatted;
  if (nextSpecialMoon) {
    nextSpecialMoonDateFormatted = formatTime(new Date(nextSpecialMoon), {
      timeZone: WEATHER_STATION_TIMEZONE,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else {
    nextSpecialMoonDateFormatted = "-";
  }

  let nextMoonEclipseDateFormatted;
  if (nextMoonEclipse) {
    nextMoonEclipseDateFormatted = formatTime(new Date(nextMoonEclipse), {
      timeZone: WEATHER_STATION_TIMEZONE,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else {
    nextMoonEclipseDateFormatted = "-";
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
        <h2 className="text-xl font-semibold mb-10">Moon</h2>

        <div className="flex flex-col items-center text-center space-y-2 mb-10 p-2">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">{name}</p>

            <p className="text-sm text-gray-500">Last Update: {updateTime}</p>
          </div>
          <div className="flex justify-center mt-10">
            <WeatherIcon
              icon={name as IconName}
              iconAlt={name ? name : ""}
              animate={isHovered}
            />
          </div>
          <div className="flex flex-row justify-center gap-8">
            <CardSecondaryHero 
              value={illumination}
              unit="%"
              description="Illumination"
            />

            <CardSecondaryHero 
              value={distance.toLocaleString()}
              unit="km"
              description="Distance"
            />
          </div>
        </div>
        <div className="flex justify-center mt-auto pb-5 gap-5">
          <div className="grid grid-cols-4 gap-y-3 gap-x-7 pb-3">
            <SideElement parameter={"Rise"} value={riseTimeFormatted} />
            <SideElement parameter={"Set"} value={setTimeFormatted} />

            <SideElement
              parameter={"Next Special Moon"}
              value={nextSpecialMoonDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium text-gray-800 gap-4">
                    <SideElement
                      parameter="Days Until"
                      value={nextSpecialMoonDaysUntil?.toFixed(0)}
                    />

                    <SideElement
                      parameter="Type"
                      value={capitaliseEachWord(nextSpecialMoonType)}
                    />
                  </div>
                </div>,
              ]}
            />
            <SideElement
              parameter={"Next Moon Eclipse"}
              value={nextMoonEclipseDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium text-gray-800 gap-4">
                    <SideElement
                      parameter="Days Until"
                      value={nextMoonEclipseDaysUntil?.toFixed(0)}
                    />

                    <SideElement
                      parameter="Type"
                      value={capitaliseEachWord(nextMoonEclipseType)}
                    />

                    <SideElement
                      parameter="Blood Moon"
                      value={
                        nextMoonEclipseIsBloodMoon != undefined &&
                        nextMoonEclipseIsBloodMoon != null
                          ? nextMoonEclipseIsBloodMoon
                            ? "Yes"
                            : "No"
                          : "-"
                      }
                    />
                  </div>
                </div>,
              ]}
            />

            <SideElement
              parameter={"New Moon"}
              value={nextNewMoonDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium text-gray-800 gap-4">
                    <SideElement
                      parameter="Days Until"
                      value={nextNewMoonDaysUntil?.toFixed(0)}
                    />
                  </div>
                </div>,
              ]}
            />
            <SideElement
              parameter={"First Quarter"}
              value={nextFirstQuarterDateFormatted}
            />
            <SideElement
              parameter={"Full Moon"}
              value={nextFullMoonDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium text-gray-800 gap-4">
                    <SideElement
                      parameter="Days Until"
                      value={nextFullMoonDaysUntil?.toFixed(0)}
                    />
                  </div>
                </div>,
              ]}
            />
            <SideElement
              parameter={"Last Quarter"}
              value={nextLastQuarterDateFormatted}
            />
          </div>
        </div>
      </div>
      <InfoTooltip>
        <p>
          Data about moon is collected from
          <a
            href="https://www.freeastroapi.com/moon"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-blue-600 hover:underline"
          >
            FreeAstroAPI
          </a>
          .
        </p>
      </InfoTooltip>
    </Card>
  );
}
