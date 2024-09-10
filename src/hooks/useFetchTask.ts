import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api/api";
import {GetTasksType} from "../types/types";

export const useFetchTask = (tg_id: string): QueryObserverResult<GetTasksType, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserTask(tg_id);
            return data;
        },
        queryKey: ["get-task"],
        retry: 2
    });
};
