import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import InfoTooltip from "../InfoToolTip/InfoTooltip";

export default function Satellite() {
  const { t } = useTranslation();

  return (
    <Card>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-10">{t("common.Satellite")}</h2>

        <div className="flex flex-col items-center min-h-100 w-full h-full overflow-hidden text-center space-y-2 mb-10 p-2">
          <iframe
            className="w-full h-full"
            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=4&overlay=satellite&product=satellite&level=surface&lat=48.078&lon=10.225&message=true"
            frameBorder="0"
          />
        </div>
      </div>
      <InfoTooltip>
        <p>
          {t("common.Satellite from")}
          <a
            href="https://www.windy.com"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-[var(--color-blue-text)] hover:underline"
          >
            Windy
          </a>
          .
        </p>
      </InfoTooltip>
    </Card>
  );
}
