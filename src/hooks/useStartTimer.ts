import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {StartTimerType} from "../types/types";

export const useStartTimer = (tg_id: string): UseMutationResult<StartTimerType, any, void, unknown> => {
    return useMutation({
        mutationFn: async () => {
            const {data} = await api.setStartTimer(tg_id);
            return data;
        },
        mutationKey: ["start-timer"],
        // enabled: false,
        retry: 2
        // onError: (error) => {
        //     console.error("Ошибка при запуске таймера:", error);
        // },
        // onSuccess: (data) => {
        //     console.log("Таймер успешно запущен:", data);
        // }
    });
};
