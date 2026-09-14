import { t } from "i18next";
import Card from "../Card/Card";
import type { InfoCardProps } from "./types";

export default function InfoCard(props: InfoCardProps) {
  return (
    <Card>
      <div className="flex w-full h-full items-center justify-center text-center gap-2 mb-3">
        {props.children}
        <p className={`flex text-sm font-semibold ${props.textColor}`}>{t(`info.${props.message}`)}</p>
      </div>
    </Card>
  );
}