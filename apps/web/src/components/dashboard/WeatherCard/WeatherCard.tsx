import Card from "../../Card/Card";
import type { WeatherCardProps } from "./types";

export default function WeatherCard(props: WeatherCardProps) {

    let deltaRisingColor, deltaFallingColor;

    if(!props.deltaFallingColor) {
        deltaFallingColor = "text-red-500";
    } else {
        deltaFallingColor = props.deltaFallingColor;
    }
    if(!props.deltaRisingColor) {
        deltaRisingColor = "text-green-600";
    } else {
        deltaRisingColor = props.deltaRisingColor;
    }

    return (
        <Card>
            <div className="flex flex-col h-full">
                <div className="flex flex-row items-center gap-2">
                    {props.titleIcon}
                    <h3 className="text-sm font-semibold">
                        {props.title}
                    </h3>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center text-center space-y-2 mb-7">

                    <div className="space-y-5">
                        <div className="flex justify-center">
                            {props.icon}
                        </div>

                        <p className="text-5xl font-bold text-gray-900 tracking-tight">
                            {
                                props.value === null 
                                ? "-" 
                                : props.value
                            }
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {props.unit}
                    </p>

                    {props.deltaOneHour != null  &&
                        <p className={`text-xs ${props.deltaOneHour > 0
                            ? deltaRisingColor
                            : props.deltaOneHour < 0
                                ? deltaFallingColor
                                : "text-gray-500"
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
            </div>
        </Card>
    )
}