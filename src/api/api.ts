import {axiosInstanceApi} from "./instanceApi";
import {AxiosResponse} from "axios";
import {
    CloseTimerType,
    GetBalanceType, GetTasksType,
    GetTimerType,
    GetUserReferrals,
    GetUserRefType, SetTaskType,
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
    }
};
