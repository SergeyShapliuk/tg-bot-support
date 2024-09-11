import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {StartTimerType} from "../types/types";


interface SetStartVariables {
    tg_id: string;
}

export const useStartTimer = (): UseMutationResult<StartTimerType, any, SetStartVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: SetStartVariables) => {
            const {tg_id} = variables;
            const {data} = await api.setStartTimer(tg_id);
            return data;
        },
        mutationKey: ["start-timer"],
        retry: 2
    });
};
