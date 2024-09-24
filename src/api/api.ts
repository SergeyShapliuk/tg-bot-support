import {axiosInstanceApi} from "./instanceApi";
import {AxiosResponse} from "axios";
import {
    CloseTimerType,
    GetBalanceType, GetTasksType,
    GetTimerType,
    GetUserReferrals,
    GetUserRefType, SetGameType, SetTaskType, StartGameType,
    StartTimerType
} from "../types/types";


export const api = {
    async getUserBalance(telegram_id: string) {
        const response = await axiosInstanceApi.get<string, AxiosResponse<GetBalanceType>>(`get-user-balance?telegram_id=${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserTimer(telegram_id: string) {
        const response = await axiosInstanceApi.get<string, AxiosResponse<GetTimerType>>(`get-user-timer?telegram_id=${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserTask(telegram_id: string) {
        const response = await axiosInstanceApi.get<string, AxiosResponse<GetTasksType>>(`get-task?telegram_id=${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserRef(telegram_id: string) {
        const response = await axiosInstanceApi.get<string, AxiosResponse<GetUserRefType>>(`get-user-ref-code?telegram_id=${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserReferrals(telegram_id: string, limit: number, offset: number) {
        const response = await axiosInstanceApi.get<string, AxiosResponse<GetUserReferrals>>(`get-user-referals?telegram_id=${telegram_id}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    // _tdiff:30
    async setStartTimer(telegram_id: string) {
        const response = await axiosInstanceApi.post<string, AxiosResponse<StartTimerType>>("start-user-timer", {telegram_id}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async setCloseTimer(telegram_id: string) {
        const response = await axiosInstanceApi.post<string, AxiosResponse<CloseTimerType>>("close-user-timer", {telegram_id}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async setTask(telegram_id: string, task_id: number, stat: number) {
        const response = await axiosInstanceApi.post<string, AxiosResponse<SetTaskType>>("set-user-task-stat", {
            telegram_id,
            task_id,
            stat
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async startGame(telegram_id: string) {
        console.log("startGametelegram_id", telegram_id);
        const response = await axiosInstanceApi.post<string, AxiosResponse<StartGameType>>("start-game", {
            telegram_id,
            game_id: 1

        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async setGame(telegram_id: string, game_customer_id: number, bals: number) {
        const response = await axiosInstanceApi.post<string, AxiosResponse<SetGameType>>("confim-game", {
            telegram_id,
            game_customer_id,
            bals
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }
};
