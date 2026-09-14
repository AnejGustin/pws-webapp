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
import CardSecondaryHero from "../Card/card_secondary_hero/CardSecondaryHero";
import { useTranslation } from "react-i18next";

export default function MoonCard() {
  const { t } = useTranslation();

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
        textColor={"text-[var(--color-info-text)]"}
      >
        <RefreshCw size={20} className="animate-spin text-[var(--color-icon)]" />
      </InfoCard>
    );
  }

  if (currentMoonInfoQuery.error) {
    console.log(currentMoonInfoQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Current Moon Info"}
        textColor={"text-[var(--color-error-text)]"}
      />
    );
  }

  const currentMoonInfoData = currentMoonInfoQuery.data?.data;

  if (!currentMoonInfoData) {
    return (
      <InfoCard
        message={"No Current Moon Data Available"}
        textColor={"text-[var(--color-info-text)]"}
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
        <h2 className="text-xl font-semibold mb-10">{t("common.moon.Moon")}</h2>

        <div className="flex flex-col items-center text-center space-y-2 mb-10 p-2">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[var(--color-primary-card-text)]">{t(`common.moon.phases.${name}`)}</p>

            <p className="text-sm text-[var(--color-secondary-card-text)]">{t("common.Last Update")}: {updateTime}</p>
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
              description={t("common.Illumination")}
            />

            <CardSecondaryHero
              value={distance.toLocaleString()}
              unit="km"
              description={t("common.Distance")}
            />
          </div>
        </div>
        <div className="flex justify-center mt-auto pb-5 gap-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-3 gap-x-12 pb-3 md:gap-x-12">
            <SideElement parameter={t("common.Rise")} value={riseTimeFormatted} />
            <SideElement parameter={t("common.Set")} value={setTimeFormatted} />

            <SideElement
              parameter={t("common.moon.Special Moon")}
              value={nextSpecialMoonDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium gap-4">
                    <SideElement
                      parameter={t("common.Days Until")}
                      value={nextSpecialMoonDaysUntil?.toFixed(0)}
                    />

                    <SideElement
                      parameter={t("common.Type")}
                      value={t(`common.moon.${capitaliseEachWord(nextSpecialMoonType)}`)}
                    />
                  </div>
                </div>,
              ]}
            />
            <SideElement
              parameter={t("common.moon.Moon Eclipse")}
              value={nextMoonEclipseDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium gap-4">
                    <SideElement
                      parameter={t("common.Days Until")}
                      value={nextMoonEclipseDaysUntil?.toFixed(0)}
                    />

                    <SideElement
                      parameter={t("common.Type")}
                      value={t(`common.moon.${capitaliseEachWord(nextMoonEclipseType)}`)}
                    />

                    <SideElement
                      parameter={t("common.moon.Blood Moon")}
                      value={
                        nextMoonEclipseIsBloodMoon != undefined &&
                        nextMoonEclipseIsBloodMoon != null
                          ? nextMoonEclipseIsBloodMoon
                            ? t("common.Yes")
                            : t("common.No")
                          : "-"
                      }
                    />
                  </div>
                </div>,
              ]}
            />

            <SideElement
              parameter={t("common.moon.phases.New Moon")}
              value={nextNewMoonDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium gap-4">
                    <SideElement
                      parameter={t("common.Days Until")}
                      value={nextNewMoonDaysUntil?.toFixed(0)}
                    />
                  </div>
                </div>,
              ]}
            />
            <SideElement
              parameter={t("common.moon.phases.First Quarter")}
              value={nextFirstQuarterDateFormatted}
            />
            <SideElement
              parameter={t("common.moon.phases.Full Moon")}
              value={nextFullMoonDateFormatted}
              hoverContent={[
                <div className="text-nowrap">
                  <div className="flex flex-col text-sm font-medium gap-4">
                    <SideElement
                      parameter={t("common.Days Until")}
                      value={nextFullMoonDaysUntil?.toFixed(0)}
                    />
                  </div>
                </div>,
              ]}
            />
            <SideElement
              parameter={t("common.moon.phases.Last Quarter")}
              value={nextLastQuarterDateFormatted}
            />
          </div>
        </div>
      </div>
      <InfoTooltip>
        <p>
          {t("common.Data about moon is collected from")}
          <a
            href="https://www.freeastroapi.com/moon"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-[var(--color-blue-text)] hover:underline"
          >
            FreeAstroAPI
          </a>
          .
        </p>
      </InfoTooltip>
    </Card>
  );
}
