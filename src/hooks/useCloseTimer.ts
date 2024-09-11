import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {CloseTimerType} from "../types/types";


interface SetCloseVariables {
    tg_id: string;
}

export const useCloseTimer = (): UseMutationResult<CloseTimerType, any, SetCloseVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: SetCloseVariables) => {
            const {tg_id} = variables;
            const {data} = await api.setCloseTimer(tg_id);
            return data;
        },
        mutationKey: ["close-timer"],
        retry: 2
    });
};
