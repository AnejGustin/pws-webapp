export type FormatTimeOptions = {
    timezone: string,
    year?: Intl.DateTimeFormatOptions["year"],
    month?: Intl.DateTimeFormatOptions["month"],
    day?: Intl.DateTimeFormatOptions["day"],
    hour?: Intl.DateTimeFormatOptions["hour"],
    minute?: Intl.DateTimeFormatOptions["minute"],
    second?: Intl.DateTimeFormatOptions["second"],
}