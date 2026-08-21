import Status from "../Status/StatusBadge";
import type { StatusRowProps } from "./types";

export default function StatusRow(props: StatusRowProps) {
    return (
        <div className="flex flex-col flex-wrap gap-1 text-sm text-gray-500 md:flex-row md:items-center md:gap-2 mt-2 md:mt-0 pb-3 border-b border-b-gray-300">
            <span>Live weather conditions</span>
            <span className="hidden md:inline">·</span>
            <span>Local time: {props.localTime}</span>
            <span className="hidden md:inline">·</span>
            <span>
                Last update: {props.weatherDataObservationTime} {props.timeSinceUpdateText}
            </span>
            <Status statusText={props.statusText} statusColor={props.statusColor} />
        </div>
    )
}