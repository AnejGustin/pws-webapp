import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import InfoTooltip from "../InfoToolTip/InfoTooltip";
import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "../../api/alerts";
import InfoCard from "../info/InfoCard";
import { RefreshCw } from "lucide-react";
import { formatTime, getAlertIcon } from "../../utils/utils";
import { WEATHER_STATION_TIMEZONE } from "shared";
import Alert from "./Alert/Alert";
import i18n from "../../i18n/config/i18n";

export default function AlertsCard() {
  const { t } = useTranslation();

  const alertsQuery = useQuery({
    queryKey: ["alerts"],
    queryFn: getAlerts,
    refetchInterval: 1 * 30 * 60 * 1000,
    staleTime: 1 * 30 * 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  if (alertsQuery.isPending) {
    return (
      <InfoCard
        message={"Loading Weather Alerts..."}
        textColor={"text-[var(--color-info-text)]"}
      >
        <RefreshCw
          size={20}
          className="animate-spin text-[var(--color-icon)]"
        />
      </InfoCard>
    );
  }

  if (alertsQuery.error) {
    console.log(alertsQuery.error);
    return (
      <InfoCard
        message={"Error While Fetching Weather Alerts"}
        textColor={"text-[var(--color-error-text)]"}
      />
    );
  }

  const alertsData = alertsQuery.data?.data;

  if (!alertsData) {
    return (
      <Card>
        <div className="flex flex-col w-full h-full min-h-100">
          <h2 className="text-xl font-semibold mb-6">
            {t("common.Weather Alerts")}
          </h2>
          <div className="flex flex-1 font-semibold items-center justify-center">
            <p>{t("info.There Are Currently No Issued Weather Alerts")}</p>
          </div>
        </div>
      </Card>
    );
  }

  let updateTime;
  if (alertsData.last_update_time) {
    updateTime = formatTime(alertsData.last_update_time, {
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

  const activeAlerts = alertsData.alerts.active;
  const upcomingAlerts = alertsData.alerts.upcoming;

  return (
    <Card>
      <div className="flex flex-col w-full h-full min-h-100">
        <h2 className="text-xl font-semibold mb-6">
          {t("common.Weather Alerts")}
        </h2>

        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <p className="text-sm text-[var(--color-secondary-card-text)]">
            {t("common.Last Update")}: {updateTime}
          </p>
        </div>

        <div className="flex-1 max-h-65 lg:max-h-90 overflow-y-auto pr-2 space-y-3">
          {activeAlerts.map((alert) =>
            alert.language === i18n.language ? (
              <Alert
                headline={alert.headline}
                icon={getAlertIcon(alert.category)}
                alertStartTime={formatTime(new Date(alert.onset).getTime(), {
                  timeZone: WEATHER_STATION_TIMEZONE,
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                alertEndTime={formatTime(new Date(alert.expires).getTime(), {
                  timeZone: WEATHER_STATION_TIMEZONE,
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                color={alert.color}
                status={"ACTIVE"}
                description={alert.description}
                instructions={alert.instruction}
              />
            ) : (
              ""
            ),
          )}

          {upcomingAlerts.map((alert) =>
            alert.language === i18n.language ? (
              <Alert
                headline={alert.headline}
                icon={getAlertIcon(alert.category)}
                alertStartTime={formatTime(new Date(alert.onset).getTime(), {
                  timeZone: WEATHER_STATION_TIMEZONE,
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                alertEndTime={formatTime(new Date(alert.expires).getTime(), {
                  timeZone: WEATHER_STATION_TIMEZONE,
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                color={alert.color}
                status={"UPCOMING"}
                description={alert.description}
                instructions={alert.instruction}
              />
            ) : (
              ""
            ),
          )}
        </div>
      </div>
      <InfoTooltip>
        <p>
          {t("common.Alerts source")}:
          <a
            href="https://meteo.arso.gov.si/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-[var(--color-blue-text)] hover:underline"
          >
            Agencija Republike Slovenije za okolje
          </a>
          .
        </p>
      </InfoTooltip>
    </Card>
  );
}
