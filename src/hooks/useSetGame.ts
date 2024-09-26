import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {SetGameType} from "../types/types";


interface SetStartVariables {
    tg_id: string;
    game_customer_id: number;
    bals: number;
}

export const useSetGame = (): UseMutationResult<SetGameType, any, SetStartVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: SetStartVariables) => {
            const {tg_id, game_customer_id, bals} = variables;
            const {data} = await api.setGame(tg_id, game_customer_id, bals);
            return data;
        },
        mutationKey: ["set-game"],
        retry: 2
    });
};
