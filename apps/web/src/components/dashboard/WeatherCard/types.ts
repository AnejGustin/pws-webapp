export type WeatherCardProps = {
    title: string,
    titleIcon: React.ReactNode,
    value: number | null,
    unit: string
    deltaOneHour?: number | null,
    sideElements?: Array<React.ReactNode>
    icon?: React.ReactNode,
    deltaRisingColor?: string,
    deltaFallingColor?: string,
}