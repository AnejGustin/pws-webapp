import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
} from 'recharts';
import type { LineChartProps } from './types';
import React from 'react';
import { getLineChartProperties } from '../../../../utils/utils';

function LineChartComponent(props: LineChartProps) {

  const { yStart, yEnd, yTicks, xTicks } = getLineChartProperties(props.yAxisRangeStart, props.yAxisRangeEnd, props.xAxisTimeStart, props.period);

  return (
    <div className="w-full h-[350px] sm:h-[400px] lg:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={props.weatherData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          onContextMenu={(_, e) => e.preventDefault()}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={props.stroke} stopOpacity={0.75} />
              <stop offset="95%" stopColor={props.stroke} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="observation_time"
            stroke="var(--color-text-3)"
            type="number"
            ticks={xTicks}
            domain={[xTicks[0], xTicks[xTicks.length - 1]]}
            interval={"preserveStartEnd"}
            tickFormatter={(value) =>
              new Date(value).toLocaleString("sl-SI", props.dateTimeOptions)
            }
            padding={{
                "left": 0,
                "right": 6,
              }}
          >
          </XAxis>
          <YAxis
            width="auto" stroke="var(--color-text-3)"
            domain={[yStart, yEnd]}
            ticks={yTicks}
            unit={props.unit}
            tickFormatter={(value) => value.toFixed(0) + " "}
            padding={{
                "bottom": 6,
                "top": 0,
              }}
          >
          </YAxis>
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleString("sl-SI",
              {
                ...props.dateTimeOptions,
                hour: "2-digit",
                minute: "2-digit",
              })}
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
                {value}{props.unit}
              </span>
            ]}
            animationDuration={500}
            animationEasing="ease-out"
          />
          <Legend
            iconType="line"
            layout="vertical"
            formatter={
              (value) => <span style={{ color: 'black' }}>{value}</span>
            }
          />
          {
            props.lineDataKey === "wind_direction"
              ? <Line
                isAnimationActive={true}
                type="monotone"
                dataKey={props.lineDataKey}
                stroke={props.stroke}
                strokeWidth={2}
                dot={props.dot}
                activeDot={{ r: 5, stroke: 'red' }}
                name={props.lineDataKeyDisplayName}
                animationDuration={500}
                animationEasing="ease-out"
              />
              : <Area
                isAnimationActive={true}
                type="monotone"
                dataKey={props.lineDataKey}
                stroke={props.stroke}
                fill="url(#color)"
                strokeWidth={2}
                dot={props.dot}
                activeDot={{ r: 6, stroke: 'var(--color-surface-base)' }}
                name={props.lineDataKeyDisplayName}
                animationDuration={500}
                animationEasing="ease-out"
              />
          }
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(LineChartComponent); // prevent rerenders if props are the same