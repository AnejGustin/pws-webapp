import Card from "../../Card/Card";
import StatsElement from "./StatsElement/StatsElement";
import type { StatsCardProps } from "./types";

export default function StatsCard(props: StatsCardProps) {
    return (
        <div className="mt-8 mb-10">
            <Card>
                <h3 className="text-sm font-semibold text-gray-900 mb-10">
                    {props.weatherParameter} Stats For {props.time}
                </h3>

                <div className="grid grid-cols-3 divide-x divide-gray-300">
                    <StatsElement 
                        text={"Minimum"}
                        value={props.min}
                        unit={props.unit}
                    />
                    <StatsElement 
                        text={"Maximum"}
                        value={props.max}
                        unit={props.unit}
                    />
                    <StatsElement 
                        text={"Average"}
                        value={props.avg}
                        unit={props.unit}
                    />
                </div>
            </Card>
        </div>
    );
}