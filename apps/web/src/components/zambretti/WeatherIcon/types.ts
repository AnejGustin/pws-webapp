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