import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col text-[var(--color-ordinary-text)] pt-1 flex-wrap gap-1 md:flex-row md:items-center md:gap-2 mt-6 border-t border-t-[var(--border-color)]">
      <span>
        <a
          href="https://stats.uptimerobot.com/XnM5o6H2OZ"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-blue-text)] hover:underline"
        >
          {t("common.Service Status")}
        </a>
      </span>
      <span className="hidden md:inline">·</span>
      <span>
        <a
          href="https://github.com/AnejGustin/pws-webapp"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-blue-text)] hover:underline"
        >
          GitHub
        </a>
      </span>
      <span className="hidden md:inline">·</span>
      <span>
        <a
          href="https://weather-station-slov-konjice.onrender.com/api/v1/docs/"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-blue-text)] hover:underline"
        >
          {t("common.API Documentation")}
        </a>
      </span>
      <span className="hidden md:inline">·</span>
      <span>
        <a
          href="https://github.com/AnejGustin/pws-webapp#weather-station"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-blue-text)] hover:underline"
        >
          {t("common.About Weather Station")}
        </a>
      </span>
    </div>
  );
}
