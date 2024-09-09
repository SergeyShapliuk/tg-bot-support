import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api/api";
import {GetUserRefType} from "../types/types";

export const useFetchRef = (tg_id: string): QueryObserverResult<GetUserRefType, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserRef(tg_id);
            return data;
        },
        queryKey: ["get-ref"],
        retry: 2
    });
};
