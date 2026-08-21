export type StatsCardProps = {
    max?: number | null,
    min?: number | null,
    avg: number,
    weatherParameter: string,
    unit: string,
    time: string
}