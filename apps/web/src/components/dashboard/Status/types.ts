export type StatusBadgeProperties = {
    statusText: PossibleStatusStates,
    statusColor: PossibleStatusBadgeColors,
};

export type PossibleStatusStates = "ONLINE" | "STALE" | "OFFLINE";
export type PossibleStatusBadgeColors = "green" | "yellow" | "red"