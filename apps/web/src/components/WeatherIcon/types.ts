export type WeatherIconProps = {
    icon: IconName,
    iconAlt: string,
    animate?: boolean,
};

export type IconName = "rain"
    | "cloudy"
    | "clearDay"
    | "showery"
    | "mostlyClearDay"
    | "becomingUnsettled"
    | "stormy"
    | "improving"
    | "worsening"
    | "clear sky"
    | "few clouds"
    | "scattered clouds"
    | "broken clouds"
    | "shower rain"
    | "thunderstorm"
    | "snow"
    | "mist"
    | "clear sky night"
    | "few clouds night"
    | "scattered clouds night"
    | "broken clouds night"
    | "shower rain night"
    | "thunderstorm night"
    | "snow night"
    | "mist night"
    | "unknown"