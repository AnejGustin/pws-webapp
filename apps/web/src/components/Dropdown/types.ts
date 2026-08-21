import type { WeatherPeriod } from "shared";
import type { WeatherParameter } from "../history/types";

export type DropdownProps = {
    value: string | number | WeatherParameter | WeatherPeriod,
    options: Array<string> | Array<number> | Array<WeatherParameter> | Array<WeatherPeriod>,
    onChange: (option: any) => void,
    hide?: boolean,
    formatDisplay?: (option: any) => string
}