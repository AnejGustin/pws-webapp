import { useQuery } from "@tanstack/react-query";
import { getLatestWeather } from "../../api/weather";
import {
    formatTime,
    getStatusBadgeProperties,
    getTimeSinceUpdateText,
    getWindDirection,
    transformDirectionForDisplay
} from "../../utils/utils";
import WeatherCard from "./WeatherCard/WeatherCard";
import {
    Droplet,
    Gauge,
    Navigation2,
    RefreshCw,
    Thermometer,
    Wind
} from "lucide-react";
import SideElement from "./WeatherCard/SideElement/SideElement";
import {
    useEffect,
    useState
} from "react";
import StatusRow from "./StatusRow/StatusRow";
import InfoCard from "../info/InfoCard";
import { WEATHER_STATION_TIMEZONE } from "shared";
import Title from "./Title/Title";

export default function Dashboard() {

    const weatherLatestQuery = useQuery({
        queryKey: ["weather", "latest"],
        queryFn: getLatestWeather,
        refetchInterval: 1 * 30 * 1000,
        staleTime: 1 * 30 * 1000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
    })

    const [clock, setClock] = useState(Date.now())
    const localTime = formatTime(clock, WEATHER_STATION_TIMEZONE);

    useEffect(() => {
        const clockInterval = setInterval(() => {
            setClock(Date.now());
        }, 1000)

        return () => {
            clearInterval(clockInterval);
        }
    }, [])

    if (weatherLatestQuery.isPending) {
        return (
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="space-y-4">
                    <Title />

                    <StatusRow
                        localTime={localTime}
                        weatherDataObservationTime="unknown"
                        timeSinceUpdateText=""
                        statusText="OFFLINE"
                        statusColor="red"
                    />

                    <InfoCard
                        message={"Loading Latest Weather Data..."}
                        textColor={"text-gray-700"}
                    >
                        <RefreshCw
                            size={20}
                            className="animate-spin"
                        />
                    </InfoCard>
                </div>
            </div>
        )
    }

    if (weatherLatestQuery.error) {
        console.log(weatherLatestQuery.error);
        return (
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="space-y-4">
                    <Title />

                    <StatusRow
                        localTime={localTime}
                        weatherDataObservationTime="unknown"
                        timeSinceUpdateText=""
                        statusText="OFFLINE"
                        statusColor="red"
                    />

                    <InfoCard
                        message={"Error While Fetching Latest Weather Data"}
                        textColor={"text-red-600"}
                    />
                </div>
            </div>
        )
    }

    const weatherData = weatherLatestQuery.data?.data;

    if (!weatherData) {
        return (
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="space-y-4">
                    <Title />

                    <StatusRow
                        localTime={localTime}
                        weatherDataObservationTime="unknown"
                        timeSinceUpdateText=""
                        statusText="OFFLINE"
                        statusColor="red"
                    />

                    <InfoCard
                        message={"No Latest Weather Data Available"}
                        textColor={"text-gray-700"}
                    />
                </div>
            </div>
        )
    }

    const weatherDataObservationTime = formatTime(weatherData.observation_time, WEATHER_STATION_TIMEZONE);
    const timeSinceUpdateText = getTimeSinceUpdateText(clock, weatherData.observation_time);

    const { statusText, statusColor } = getStatusBadgeProperties(weatherData.observation_time);
    const windDirectionForDisplayIcon = transformDirectionForDisplay(weatherData.wind.direction);

    const windDirectionDescription = getWindDirection(weatherData.wind.direction);

    return (
        <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="space-y-4">
                <Title />

                <StatusRow
                    localTime={localTime}
                    weatherDataObservationTime={weatherDataObservationTime}
                    timeSinceUpdateText={timeSinceUpdateText}
                    statusText={statusText}
                    statusColor={statusColor}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <WeatherCard
                        title={"Temperature"}
                        titleIcon={<Thermometer />}
                        value={weatherData.temperature}
                        unit={"°C"}
                        deltaOneHour={weatherData.deltas.one_hour.temperature}
                        sideElements={[
                            <SideElement
                                parameter={"Humidity"}
                                value={weatherData.humidity}
                                unit={"%"}
                                key={"humidity"}
                            />,
                            <SideElement
                                parameter={"Dew Point"}
                                value={weatherData.dewpoint}
                                unit={"°C"}
                                key={"dewpoint"}
                            />,
                            <SideElement
                                parameter={"Feels Like"}
                                value={weatherData.heat_index}
                                unit={"°C"}
                                key={"heat_index"}
                            />,
                        ]}
                        deltaFallingColor={"text-blue-600"}
                        deltaRisingColor={"text-red-500"}
                    />

                    <WeatherCard
                        title={"Pressure"}
                        titleIcon={<Gauge />}
                        value={weatherData.pressure}
                        unit={"hPa"}
                        deltaOneHour={weatherData.deltas.one_hour.pressure}
                    />

                    <WeatherCard
                        title={"Wind"}
                        titleIcon={<Wind />}
                        value={weatherData.wind.speed}
                        unit={"km/h"}
                        sideElements={[
                            <SideElement
                                parameter={"Apparent"}
                                value={weatherData.wind.chill}
                                unit={"°C"}
                                key={"wind_chill"}
                            />,
                            <SideElement
                                parameter={"Gust"}
                                value={weatherData.wind.gust}
                                unit={"km / h"}
                                key={"wind_gust"}
                            />,
                            <SideElement
                                parameter={"Direction"}
                                value={windDirectionDescription}
                                key={"wind_direction"}
                            />,
                        ]}
                        icon={<Navigation2
                            size={50}
                            style={{
                                rotate: `${windDirectionForDisplayIcon}deg`,
                                transition: "rotate 0.5s ease-in-out",
                            }}
                        />}
                    />

                    <WeatherCard
                        title={"Precipitation"}
                        titleIcon={<Droplet />}
                        value={weatherData.precipitation.total}
                        unit={"mm"}
                        sideElements={[
                            <SideElement
                                parameter={"Rate"}
                                value={weatherData.precipitation.rate}
                                unit={"mm / h"}
                                key={"rain_rate"}
                            />,
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}