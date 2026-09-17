import Card from "../../Card/Card";
import type { WeatherCardProps } from "./types";

export default function WeatherCard(props: WeatherCardProps) {

    let deltaRisingColor, deltaFallingColor;

    if(!props.deltaFallingColor) {
        deltaFallingColor = "text-[var(--color-error-text)]";
    } else {
        deltaFallingColor = props.deltaFallingColor;
    }
    if(!props.deltaRisingColor) {
        deltaRisingColor = "text-[var(--color-green-text)]";
    } else {
        deltaRisingColor = props.deltaRisingColor;
    }

    return (
        <Card>
            <div className="flex flex-col h-full">
                <div className="flex flex-row items-center gap-2">
                    {props.titleIcon}
                    <h3 className="text-sm font-semibold ">
                        {props.title}
                    </h3>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center text-center space-y-2 mb-7">

                    <div className="space-y-5">
                        <div className="flex justify-center">
                            {props.icon}
                        </div>

                        <p className="text-5xl font-bold text-[var(--color-primary-card-text)] tracking-tight">
                            {
                                props.value === null 
                                ? "-" 
                                : props.value
                            }
                        </p>
                    </div>
                    <p className="text-sm text-[var(--color-secondary-card-text)]">
                        {props.unit}
                    </p>

                    {props.deltaOneHour != null  &&
                        <p className={`text-xs ${props.deltaOneHour > 0
                            ? deltaRisingColor
                            : props.deltaOneHour < 0
                                ? deltaFallingColor
                                : "text-[var(--color-secondary-card-text)]"
                            }`}>
                            {props.deltaOneHour > 0 ? "↑" : props.deltaOneHour < 0 ? "↓" : "→"}
                            {" "}
                            {props.deltaOneHour} {props.unit} / h
                        </p>
                    }
                </div>

                <div className="flex flex-row justify-start gap-4 mt-auto">
                    {props.sideElements}
                </div>
                {props.children}
            </div>
        </Card>
    )
}