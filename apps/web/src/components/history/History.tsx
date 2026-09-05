import { useQuery } from "@tanstack/react-query";
import { getWeatherStats } from "../../api/weather.stats";
import StatsCard from "./StatsCard/StatsCard";
import {
    useEffect,
    useMemo,
    useState
} from "react";
import type { WeatherParameter } from "./types";
import {
    getDaysInMonth,
    getLineDataKey,
    getMonthAsNumber,
    getPeriodDateTimeOptions,
    getStatsCardProps,
    getStatsCardTimeAsText,
    getYearParameterOptions,
    periodToDate,
    transformHistoryResponse,
} from "../../utils/utils";
import LineChartComponent from "./charts/LineChart/LineChartComponent";
import { getWeatherHistory } from "../../api/weather.history";
import {
    WEATHER_STATION_TIMEZONE,
    type WeatherPeriod
} from "shared";
import { RefreshCw } from "lucide-react";
import Card from "../Card/Card";
import HistoryLayout from "./Layout/HistoryLayout";
import InfoCard from "../info/InfoCard";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import WindRadarChartComponent from "./charts/RadarChart/WindRadarChartComponent";
import {
    monthParameterOptions,
    weatherParameterOptions,
    weatherPeriodOptions
} from "./dropdown.options";

export default function History() {
    const weatherStationLocalDateTime = toZonedTime(Date.now(), WEATHER_STATION_TIMEZONE);

    const [selectedWeatherParameter, setSelectedWeatherParameter] = useState<WeatherParameter>("Temperature");
    const [selectedPeriod, setSelectedPeriod] = useState<WeatherPeriod>("day");
    const [selectedDay, setSelectedDay] = useState(weatherStationLocalDateTime.getDate());
    const [selectedMonth, setSelectedMonth] = useState(weatherStationLocalDateTime.getMonth());
    const [selectedYear, setSelectedYear] = useState(weatherStationLocalDateTime.getFullYear());
    const [dayOptions, setDayOptions] = useState<number[]>([]);

    const [appliedWeatherParameter, setAppliedWeatherParameter] = useState<WeatherParameter>("Temperature");
    const [appliedPeriod, setAppliedPeriod] = useState<WeatherPeriod>("day");
    const [appliedDay, setAppliedDay] = useState(weatherStationLocalDateTime.getDate());
    const [appliedMonth, setAppliedMonth] = useState(weatherStationLocalDateTime.getMonth());
    const [appliedYear, setAppliedYear] = useState(weatherStationLocalDateTime.getFullYear());

    const historyParams = periodToDate(appliedPeriod, new Date(appliedYear, appliedMonth, appliedDay));

    const dateTimeOptions = useMemo(
        () => getPeriodDateTimeOptions(appliedPeriod),
        [appliedPeriod]
    );

    useEffect(() => {
        setDays();
    }, [selectedMonth, selectedYear])

    const shouldFetchHistory = appliedPeriod != "all_time" && appliedPeriod != "year";

    const statsQuery = useQuery({
        queryKey: ["weather", "stats", appliedPeriod, appliedYear, appliedMonth, appliedDay],
        queryFn: () => getWeatherStats(
            {
                period: appliedPeriod,
                date: fromZonedTime(new Date(appliedYear, appliedMonth, appliedDay), WEATHER_STATION_TIMEZONE)
            }
        ),
        refetchInterval: 1 * 15 * 60 * 1000,
        staleTime: 1 * 15 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false
    })

    const historyQuery = useQuery({
        queryKey: ["weather", "history", historyParams.from, historyParams.to],
        queryFn: () => getWeatherHistory(
            {
                from: historyParams.from,
                to: historyParams.to
            }
        ),
        enabled: shouldFetchHistory,
        refetchInterval: 1 * 15 * 60 * 1000,
        staleTime: 1 * 15 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false
    })

    const weatherHistory = historyQuery.data?.data;
    const lineDataKey = getLineDataKey(appliedWeatherParameter);

    const weatherHistoryTransformedForChart = useMemo(
        () => weatherHistory?.map(transformHistoryResponse) ?? [],
        [weatherHistory]
    );

    const yearParameterOptions = getYearParameterOptions();

    if (statsQuery.isPending) {
        return (
            renderHistoryLayout(
                <>

                    <InfoCard
                        message={"Loading History..."}
                        textColor={"text-gray-700"}
                    >
                        <RefreshCw
                            size={20}
                            className="animate-spin"
                        />
                    </InfoCard>

                </>
            )
        )
    }

    if (statsQuery.error) {
        console.log(statsQuery.error);
        return (
            renderHistoryLayout(
                <>
                    <InfoCard
                        message={"Error While Fetching Weather Stats"}
                        textColor={"text-red-600"}
                    />
                </>
            )
        )
    }

    if (historyQuery.isPending && shouldFetchHistory) {
        return (
            renderHistoryLayout(
                <>
                    <InfoCard
                        message={"Loading History..."}
                        textColor={"text-gray-700"}
                    >
                        <RefreshCw
                            size={20}
                            className="animate-spin"
                        />
                    </InfoCard>

                </>
            )
        );
    }

    const weatherStats = statsQuery.data?.data;

    if (!weatherStats) {
        return (
            renderHistoryLayout(
                <>
                    <InfoCard
                        message={"No Weather Data History Available For Selected Parameters"}
                        textColor={"text-gray-700"}
                    />
                </>
            )
        );
    }

    const statsCardProps = getStatsCardProps(weatherStats, appliedWeatherParameter);

    if (historyQuery.error && shouldFetchHistory) {
        console.log(historyQuery.error);
        return (
            renderHistoryLayout(
                <>
                    <StatsCard
                        unit={statsCardProps.unit}
                        weatherParameter={statsCardProps.weatherParameter}
                        avg={statsCardProps.avg}
                        min={statsCardProps.min}
                        max={statsCardProps.max}
                        time={getStatsCardTimeAsText(appliedPeriod, appliedDay, appliedMonth, appliedYear)}
                    />
                    <InfoCard
                        message={"Error While Fetching History Weather Data"}
                        textColor={"text-red-600"}
                    />
                </>
            )
        )
    }

    function setDays() {
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
        const newDayParameterOptions = [];

        for (let i = 1; i <= daysInMonth; i++) {
            newDayParameterOptions.push(i);
        }

        let day = selectedDay;
        if (selectedDay > daysInMonth) {
            day = daysInMonth;
        }

        setSelectedDay(day);
        setDayOptions(newDayParameterOptions);
    }

    function setMonth(month: string) {
        const monthAsNumber = getMonthAsNumber(month);
        setSelectedMonth(monthAsNumber);
    }

    function renderHistoryLayout(children: React.ReactNode) {
        return (
            <HistoryLayout
                selectedWeatherParameter={selectedWeatherParameter}
                weatherParameterOptions={weatherParameterOptions}
                weatherParameterDropdownOnChange={setSelectedWeatherParameter}
                selectedPeriod={selectedPeriod}
                weatherPeriodOptions={weatherPeriodOptions}
                weatherPeriodDropdownOnChange={setSelectedPeriod}
                selectedYear={selectedYear}
                yearParameterOptions={yearParameterOptions}
                yearParameterDropdwonOnChange={setSelectedYear}
                selectedMonth={selectedMonth}
                monthParameterOptions={monthParameterOptions}
                monthParameterDropdwonOnChange={setMonth}
                selectedDay={selectedDay}
                dayParameterOptions={dayOptions}
                dayParameterDropdwonOnChange={setSelectedDay}
                setAppliedWeatherParameter={setAppliedWeatherParameter}
                setAppliedPeriod={setAppliedPeriod}
                setAppliedYear={setAppliedYear}
                setAppliedMonth={setAppliedMonth}
                setAppliedDay={setAppliedDay}
                statsQuery={statsQuery}
                historyQuery={historyQuery}
            >
                {children}
            </HistoryLayout>
        )
    }

    return (
        renderHistoryLayout(
            <>
                <StatsCard
                    unit={statsCardProps.unit}
                    weatherParameter={statsCardProps.weatherParameter}
                    avg={statsCardProps.avg}
                    min={statsCardProps.min}
                    max={statsCardProps.max}
                    time={getStatsCardTimeAsText(appliedPeriod, appliedDay, appliedMonth, appliedYear)}
                />

                {
                    appliedPeriod != "all_time" &&
                    appliedPeriod != "year" && (
                        <>
                            <Card>
                                <LineChartComponent
                                    weatherData={weatherHistoryTransformedForChart}
                                    lineDataKey={lineDataKey}
                                    lineDataKeyDisplayName={appliedWeatherParameter}
                                    yAxisRangeStart={
                                        appliedWeatherParameter === "Wind Direction"
                                            ? 0
                                            : statsCardProps.min
                                    }
                                    yAxisRangeEnd={
                                        appliedWeatherParameter === "Wind Direction"
                                            ? 355
                                            : statsCardProps.max
                                    }
                                    xAxisTimeStart={historyParams.from.getTime()}
                                    xAxisTimeEnd={historyParams.to.getTime()}
                                    stroke={
                                        appliedWeatherParameter === "Wind Direction"
                                            ? "none"
                                            : "red"
                                    }
                                    dot={
                                        appliedWeatherParameter === "Wind Direction"
                                            ? { fill: "red", r: 4 }
                                            : false
                                    }
                                    dateTimeOptions={dateTimeOptions}
                                    unit={statsCardProps.unit}
                                    period={appliedPeriod}
                                />
                            </Card>

                            {appliedWeatherParameter === "Wind Direction" && (
                                <Card>
                                    <WindRadarChartComponent
                                        weatherData={weatherHistoryTransformedForChart}
                                    />
                                </Card>
                            )}
                        </>
                    )
                }
            </>
        )
    )
}