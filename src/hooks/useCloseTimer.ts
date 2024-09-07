import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {CloseTimerType} from "../types/types";


export const useCloseTimer = (tg_id: string): UseMutationResult<CloseTimerType, any, void, unknown> => {
    return useMutation({
        mutationFn: async () => {
            const {data} = await api.setCloseTimer(tg_id);
            return data;
        },
        mutationKey: ["close-timer"],
        retry: 2
    });
};
