import { RefreshCw } from "lucide-react";
import type { FetchButtonProps } from "./types";

export default function FetchButton(props: FetchButtonProps) {
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
            `}
        >
            <RefreshCw
                size={16}
                className={props.loading ? "animate-spin" : ""}
            />

            {props.loading ? "Loading" : "Load Weather Data"}
        </button>
    );
}