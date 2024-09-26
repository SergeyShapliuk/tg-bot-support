import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {StartGameType} from "../types/types";


interface SetStartVariables {
    tg_id: string;
}

export const useStartGame = (): UseMutationResult<StartGameType, any, SetStartVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: SetStartVariables) => {

            const {tg_id} = variables;
            const {data} = await api.startGame(tg_id);
            return data;
        },
        mutationKey: ["start-game"],
        retry: 2
    });
};
