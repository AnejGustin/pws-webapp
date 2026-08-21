import type { SideElementProps } from "./types";

export default function SideElement(props: SideElementProps) {
    return (
        <div>
            <p className="text-xs text-gray-500">{props.parameter}</p>
            <p className="text-sm font-medium text-gray-800">
                {
                    (props.value === undefined || props.value === null)
                    ? "-"
                    : props.value
                }
                {" "}{props.unit}
            </p>
        </div>
    )
}