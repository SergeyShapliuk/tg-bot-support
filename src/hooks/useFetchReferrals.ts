import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api/api";
import {GetUserReferrals} from "../types/types";


export const useFetchReferrals = (tg_id: string, limit: number, offset: number): QueryObserverResult<GetUserReferrals, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserReferrals(tg_id, limit, offset);
            return data;
        },
        queryKey: ["get-user-referrals", tg_id, limit, offset],
        retry: 2
    });
};
