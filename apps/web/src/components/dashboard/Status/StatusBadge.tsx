import type {
    PossibleStatusBadgeColors,
    StatusBadgeProperties
} from "./types";

const statusBadgeColors: Record<PossibleStatusBadgeColors, string> = {
    green: "bg-[var(--color-status-badge-green-bg)] text-[var(--color-status-badge-green-text)]",
    red: "bg-[var(--color-status-badge-red-bg)] text-[var(--color-status-badge-red-text)]",
    yellow: "bg-[var(--color-status-badge-yellow-bg)] text-[var(--color-status-badge-yellow-text)]",
};

export default function Status(props: StatusBadgeProperties) {
    return (
        <span className={`inline-flex md:ml-1 md:mt-0 mt-2 justify-center whitespace-nowrap rounded-full px-3 py-1 text-base font-semibold ${statusBadgeColors[props.statusColor]}`}>
            {props.statusText}
        </span>
    )
}