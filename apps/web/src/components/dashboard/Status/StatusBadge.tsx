import type {
    PossibleStatusBadgeColors,
    StatusBadgeProperties
} from "./types";

const statusBadgeColors: Record<PossibleStatusBadgeColors, string> = {
    green: "bg-green-200 text-green-600",
    red: "bg-red-500 text-white",
    yellow: "bg-yellow-300 text-black",
};

export default function Status(props: StatusBadgeProperties) {
    return (
        <span className={`inline-flex md:ml-1 md:mt-0 mt-2 justify-center whitespace-nowrap rounded-full px-3 py-1 text-base font-semibold ${statusBadgeColors[props.statusColor]}`}>
            {props.statusText}
        </span>
    )
}