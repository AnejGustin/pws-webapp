import { useTranslation } from "react-i18next";
import useLanguage from "../../../hooks/useLanguage";
import useTheme from "../../../hooks/useTheme";
import ToggleButton from "../../ToggleButton/ToggleButton";
import Status from "../Status/StatusBadge";
import type { StatusRowProps } from "./types";

export default function StatusRow(props: StatusRowProps) {
  const { changeTheme, themeDisplay } = useTheme();
  const { changeLanguage, languageDisplay } = useLanguage();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:justify-between border-b border-b-[var(--border-color)] md:flex-row md:items-center gap-3 md:gap-0 md:pb-4">
      <div className="flex flex-col flex-wrap gap-1 text-sm text-[var(--color-ordinary-text)] md:gap-2 md:flex-row md:items-center">
        <span>{t("common.Live weather conditions")}</span>
        <span className="hidden md:inline">·</span>
        <span>
          {t("time.Local time")}: {props.localTime}
        </span>
        <span className="hidden md:inline">·</span>
        <span>
          {t("common.Last update")}: {props.weatherDataObservationTime != "unknown" ? `${props.weatherDataObservationTime} (${props.timeSinceUpdateText})` : t(`common.${props.weatherDataObservationTime}`)}
        </span>
        <Status statusText={props.statusText} statusColor={props.statusColor} />
      </div>
      <div className="flex gap-3 mb-3 md:mb-0">
        <ToggleButton text={themeDisplay} onClick={changeTheme} />
        <ToggleButton text={languageDisplay} onClick={changeLanguage} />
      </div>
    </div>
  );
}
