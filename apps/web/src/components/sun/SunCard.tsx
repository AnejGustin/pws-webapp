import { getSunCardDisplayInfo } from "../../utils/utils";
import { useState } from "react";
import Card from "../Card/Card";
import { RefreshCw } from "lucide-react";
import InfoCard from "../info/InfoCard";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import SideElement from "../dashboard/WeatherCard/SideElement/SideElement";
import InfoTooltip from "../InfoToolTip/InfoTooltip";
import { useTranslation } from "react-i18next";
import useSunInfoQuery from "../../hooks/useSunInfoQuery";
import CardSecondaryHero from "../Card/card_secondary_hero/CardSecondaryHero";

export default function SunCard() {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const sunInfoQuery = useSunInfoQuery();

  if (sunInfoQuery.isPending) {
    return (
      <InfoCard
        message={"Loading Sun Information..."}
        textColor={"text-[var(--color-info-text)]"}
      >
        <RefreshCw
          size={20}
          className="animate-spin text-[var(--color-icon)]"
        />
      </InfoCard>
    );
  }

  if (sunInfoQuery.error) {
    console.log(sunInfoQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Sun Information"}
        textColor={"text-[var(--color-error-text)]"}
      />
    );
  }

  const sunInfoData = sunInfoQuery.data;

  if (!sunInfoData) {
    return (
      <InfoCard
        message={"No Sun Information Available"}
        textColor={"text-[var(--color-info-text)]"}
      />
    );
  }

  const {
    updateTime,
    sunriseFormatted,
    sunsetFormatted,
    dawnFormatted,
    duskFormatted,
    nauticalTwilightBeginFormatted,
    nauticalTwilightEndFormatted,
    firstLightFormatted,
    lastLightFormatted,
    sunMaxAltitude,
    dayLength,
    solarNoonFormatted,
    currentUvIndex,
    currentUvIndexSeverity,
    currentUvIndexSeverityTooltipDescription,
    todayMaxUvIndex,
    todayMaxUvIndexSeverity,
    tomorrowUvIndex,
    tomorrowUvIndexSeverity,
    tomorrowUvIndexSeverityTooltipDescription,
  } = getSunCardDisplayInfo(sunInfoData);

  function animateIcons() {
    setIsHovered(true);
  }

  function stopIconsAnimation() {
    setIsHovered(false);
  }

  return (
    <Card onMouseEnter={animateIcons} onMouseLeave={stopIconsAnimation}>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-10">{t("common.sun.Sun")}</h2>

        <div className="flex flex-col items-center text-center space-y-2 mb-10 p-2">
          <div className="space-y-1">
            <p className="text-sm text-[var(--color-secondary-card-text)]">
              {t("common.Last Update")}: {updateTime}
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <WeatherIcon icon={"sun"} iconAlt={"sun"} animate={isHovered} />
          </div>
          <div className="flex flex-row justify-center gap-8">
            <CardSecondaryHero
              value={sunriseFormatted}
              description={t("common.sun.Sunrise")}
            />

            <CardSecondaryHero
              value={solarNoonFormatted}
              description={t("common.sun.Solar Noon")}
            />

            <CardSecondaryHero
              value={sunsetFormatted}
              description={t("common.sun.Sunset")}
            />
          </div>
        </div>
        <div className="flex justify-center mt-auto pb-5">
          <div className="grid grid-cols-2 gap-y-10 md:gap-y-3 gap-x-5 md:gap-x-12">
            <SideElement
              parameter={t("common.sun.Day Length")}
              value={dayLength}
              hoverContent={[
                <div className="grid grid-cols-2 gap-y-10 md:gap-y-3 gap-x-5 md:gap-x-12">
                  <SideElement
                    parameter={t("common.sun.Civil Dawn")}
                    value={dawnFormatted}
                  />
                  <SideElement
                    parameter={t("common.sun.Civil Dusk")}
                    value={duskFormatted}
                  />
                  <SideElement
                    parameter={t("common.sun.Nautical Dawn")}
                    value={nauticalTwilightBeginFormatted}
                  />
                  <SideElement
                    parameter={t("common.sun.Nautical Dusk")}
                    value={nauticalTwilightEndFormatted}
                  />
                  <SideElement
                    parameter={t("common.sun.Astronomical Dawn")}
                    value={firstLightFormatted}
                  />
                  <SideElement
                    parameter={t("common.sun.Astronomical Dusk")}
                    value={lastLightFormatted}
                  />
                </div>,
              ]}
            />
            <SideElement
              parameter={t("common.sun.Max Altitude")}
              value={sunMaxAltitude}
              unit="°"
            />
            <SideElement
              parameter={t("weather.UV Index")}
              value={currentUvIndex}
              description={`(${t(`common.uv.severity.${currentUvIndexSeverity}`)})`}
              hoverContent={
                currentUvIndexSeverityTooltipDescription != null && todayMaxUvIndex
                  ? [
                      <div className="text-nowrap">
                        <p>
                          {t(
                            `common.uv.description.${currentUvIndexSeverityTooltipDescription}`,
                          )}
                        </p>
                        <p className="mt-2">
                          {t("common.uv.Max UV Index Today")}: {todayMaxUvIndex} ({t(`common.uv.severity.${todayMaxUvIndexSeverity}`)})
                        </p>
                      </div>,
                    ]
                  : undefined
                
              }
            />
            <SideElement
              parameter={t("common.uv.UV Index Tomorrow")}
              value={tomorrowUvIndex}
              description={`(${t(`common.uv.severity.${tomorrowUvIndexSeverity}`)})`}
              hoverContent={
                currentUvIndexSeverityTooltipDescription != null
                  ? [
                      <div className="text-nowrap">
                        <p>
                          {t(
                            `common.uv.description.${tomorrowUvIndexSeverityTooltipDescription}`,
                          )}
                        </p>
                      </div>,
                    ]
                  : undefined
              }
            />
          </div>
        </div>
        <InfoTooltip>
          <p>
            {t("common.Data about sun is collected from")}
            <a
              href="https://sunrisesunset.io"
              target="_blank"
              rel="noreferrer"
              className="ml-1 text-[var(--color-blue-text)] hover:underline"
            >
              sunrisesunset.io
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
      </div>
    </Card>
  );
}
