import { useQuery } from "@tanstack/react-query";
import { getSunInfo } from "../api/sun";

export default function useSunInfoQuery() {
    const sunInfoQuery = useQuery({
        queryKey: ["sun"],
        queryFn: getSunInfo,
        refetchInterval: 10 * 60 * 1000,
        staleTime: 10 * 60 * 1000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
    });

    const sunInfoData = sunInfoQuery.data?.data;

    return ({
        isPending: sunInfoQuery.isPending,
        error: sunInfoQuery.error,
        data: sunInfoData,
    })
}