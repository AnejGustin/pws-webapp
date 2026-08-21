import type {
    PossibleStatusBadgeColors,
    PossibleStatusStates
} from "../Status/types"

export type StatusRowProps = {
    localTime: string,
    weatherDataObservationTime: string,
    timeSinceUpdateText: string,
    statusText: PossibleStatusStates,
    statusColor: PossibleStatusBadgeColors
}