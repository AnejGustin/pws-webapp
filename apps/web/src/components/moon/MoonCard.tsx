import { useQuery } from "@tanstack/react-query";
import { capitaliseEachWord, getMoonInfoForDisplay } from "../../utils/utils";
import { useState } from "react";
import Card from "../Card/Card";
import { RefreshCw } from "lucide-react";
import InfoCard from "../info/InfoCard";
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

  const {
    updateTime,
    name,
    iconName,
    iconAlt,
    illumination,
    distance,
    nextFullMoonDateFormatted,
    nextNewMoonDaysUntil,
    nextFullMoonDaysUntil,
    nextSpecialMoonDaysUntil,
    nextSpecialMoonType,
    nextMoonEclipseDaysUntil,
    nextMoonEclipseType,
    nextMoonEclipseIsBloodMoon,
    riseTimeFormatted,
    setTimeFormatted,
    nextNewMoonDateFormatted,
    nextLastQuarterDateFormatted,
    nextFirstQuarterDateFormatted,
    nextMoonEclipseDateFormatted,
    nextSpecialMoonDateFormatted,
  } = getMoonInfoForDisplay(currentMoonInfoData);

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
              icon={iconName as IconName}
              iconAlt={iconAlt}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-3 gap-x-12 pb-3 md:gap-x-12">
            <SideElement parameter={"Rise"} value={riseTimeFormatted} />
            <SideElement parameter={"Set"} value={setTimeFormatted} />

            <SideElement
              parameter={"Special Moon"}
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
              parameter={"Moon Eclipse"}
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
