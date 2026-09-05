export type FormatTimeOptions = {
    timeZone: string,
    year?: Intl.DateTimeFormatOptions["year"],
    month?: Intl.DateTimeFormatOptions["month"],
    day?: Intl.DateTimeFormatOptions["day"],
    hour?: Intl.DateTimeFormatOptions["hour"],
    minute?: Intl.DateTimeFormatOptions["minute"],
    second?: Intl.DateTimeFormatOptions["second"],
}