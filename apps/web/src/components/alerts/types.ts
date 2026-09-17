import type { AlertsFormat } from "shared"

export type AlertsEndPointResponse = {
    data: AlertsFormat 
} |
{
    data: null
}