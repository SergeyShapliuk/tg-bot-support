import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api/api";
import {GetTimerType} from "../types/types";

export const useFetchTimer = (tg_id: string): QueryObserverResult<GetTimerType, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserTimer(tg_id);
            return data;
        },
        queryKey: ["get-timer"],
        retry: 2,
    });
};
