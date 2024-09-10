import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api/api";
import {SetTaskType} from "../types/types";

interface SetTaskVariables {
    tg_id: string;
    task_id: number;
    stat: number;
}

export const useSetTask = (): UseMutationResult<SetTaskType, any, SetTaskVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: SetTaskVariables) => {
            const {tg_id, task_id, stat} = variables;
            const {data} = await api.setTask(tg_id, task_id, stat);
            return data;
        },
        mutationKey: ["set-task"],
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
