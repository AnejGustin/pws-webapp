import Card from "../Card/Card";
import InfoTooltip from "../InfoToolTip/InfoTooltip";

export default function PrecipitationRadar() {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-10">Precipitation Radar</h2>

        <div className="flex flex-col items-center min-h-100 w-full h-full overflow-hidden text-center space-y-2 mb-10 p-2">
          <iframe
            className="w-full h-full"
            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=9&overlay=radar&product=radar&level=surface&lat=46.365&lon=15.427&detailLat=46.33925700403728&detailLon=15.423512179712723&marker=true&message=true"
            frameBorder="0"
          />
        </div>
      </div>
      <InfoTooltip>
        <p>
          Precipitation radar from
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
