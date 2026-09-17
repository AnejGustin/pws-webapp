import { RefreshCw } from "lucide-react";
import type { FetchButtonProps } from "./types";
import { useTranslation } from "react-i18next";

export default function FetchButton(props: FetchButtonProps) {
    const { t } = useTranslation();

    return (
        <button
            onClick={props.onClick}
            disabled={props.loading}
            className={`
                flex items-center gap-2 px-4 py-2
                bg-blue-600 text-white text-sm font-medium
                rounded-xl
                hover:bg-blue-700 active:bg-blue-800
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
                select-none
            `}
        >
            <RefreshCw
                size={16}
                className={props.loading ? "animate-spin" : ""}
            />

            {props.loading ? t("common.Loading") : t("common.Load Weather Data")}
        </button>
    );
}