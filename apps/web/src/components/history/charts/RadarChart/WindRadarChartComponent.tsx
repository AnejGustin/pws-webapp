import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    Tooltip,
} from 'recharts';
import React from 'react';
import type { RadarChartComponentProps } from './types';
import {
    countWindDirections,
    transformWindDirectionsDataForRadarChart
} from '../../../../utils/utils';


function WindRadarChartComponent(props: RadarChartComponentProps) {
    const windDirectionsCounted: Record<string, number> = {
        "N": 0,
        "NNE": 0,
        "NE": 0,
        "ENE": 0,
        "E": 0,
        "ESE": 0,
        "SE": 0,
        "SSE": 0,
        "S": 0,
        "SSW": 0,
        "SW": 0,
        "WSW": 0,
        "W": 0,
        "WNW": 0,
        "NW": 0,
        "NNW": 0,
    }

    countWindDirections(props.weatherData, windDirectionsCounted);
    const windDirectionsData = transformWindDirectionsDataForRadarChart(windDirectionsCounted);

    return (
        <div className="w-full h-[350px] sm:h-[400px] lg:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    onContextMenu={(_, e) => e.preventDefault()}
                    outerRadius="75%"
                    data={windDirectionsData}
                    margin={{
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 20,
                    }}
                >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="windDirection" />
                    <Radar name="Wind Direction Count" dataKey="count" stroke="red" fill="red" fillOpacity={0.25} />
                    <Tooltip
                        cursor={false}
                        contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            border: "1px solid var(--color-border-2)",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                        isAnimationActive={true}
                        formatter={(value) => [
                            <span style={{ color: "red" }}>
                                {value}
                            </span>
                        ]}
                        animationDuration={500}
                        animationEasing="ease-out"
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default React.memo(WindRadarChartComponent); // prevent rerenders if props are the same