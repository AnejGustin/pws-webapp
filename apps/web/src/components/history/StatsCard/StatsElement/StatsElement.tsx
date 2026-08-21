import type { StatsElementProps } from "./types";

export default function StatsElement(props: StatsElementProps) {

    let value: number | string;
    if(!props.value){
        value = "-"
    } else {
        value = props.value;
    }

    return (
        <div className="text-center px-3">
            <p className="text-xs text-gray-500 mb-1.5">
                {props.text}
            </p>
            <p className="text-lg font-bold text-gray-900">
                {value} {props.unit}
            </p>
        </div>
    )
}