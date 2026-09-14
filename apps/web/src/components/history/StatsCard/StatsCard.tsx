import { useTranslation } from "react-i18next";
import Card from "../../Card/Card";
import StatsElement from "./StatsElement/StatsElement";
import type { StatsCardProps } from "./types";

export default function StatsCard(props: StatsCardProps) {
    const { t } = useTranslation();

    return (
        <div className="mt-8 mb-10">
            <Card>
                <h3 className="text-sm font-semibold text-[var(--color-primary-card-text)] mb-10">
                    {t("common.Statistics For")}: {t(`dropdowns.${props.weatherParameter}`)}, {props.time}
                </h3>

                <div className="grid grid-cols-3 divide-x divide-[var(--border-color)]">
                    <StatsElement 
                        text={t("common.Minimum")}
                        value={props.min}
                        unit={props.unit}
                    />
                    <StatsElement 
                        text={t("common.Maximum")}
                        value={props.max}
                        unit={props.unit}
                    />
                    <StatsElement 
                        text={t("common.Average")}
                        value={props.avg}
                        unit={props.unit}
                    />
                </div>
            </Card>
        </div>
    );
}