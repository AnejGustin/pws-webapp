import type { WeatherIconProps } from "./types";
import { icons } from "./icons";

export default function WeatherIcon(props: WeatherIconProps) {
    return props.animate ? (
        <img
            src={icons[props.icon].animated}
            alt={props.iconAlt}
            className="w-40 h-40"
        />
    ) : (
        <img
            src={icons[props.icon].normal}
            alt={props.iconAlt}
            className="w-40 h-40"
        />
    )
}