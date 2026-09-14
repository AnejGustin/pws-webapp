import { useTranslation } from "react-i18next"

export default function Title() {
    const { t } = useTranslation();
    return (
        <h1 className="text-3xl font-semibold text-[var(--color-title)] mb-1">
            {t("common.stationName")}
        </h1>
    )
}