export type AlertsFeedResponse = {
    alert: {
        info: Array<{
            language: string,
            onset: string,
            expires: string,
            headline: string,
            description: string,
            instruction: string,
            parameter: Array<{
                valueName: string,
                value: string,
            }>
        }>
    }
}