import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api/api";
import {GetBalanceType} from "../types/types";

export const useFetchBalance = (tg_id: string): QueryObserverResult<GetBalanceType, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserBalance(tg_id);
            return data;
        },
        queryKey: ["get-balance"],
        retry: 2,
        refetchOnMount: "always"
    });
};
