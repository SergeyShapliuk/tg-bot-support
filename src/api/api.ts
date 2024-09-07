import {axiosInstanceApi} from "./instanceApi";
import {AxiosResponse} from "axios";
import {CloseTimerType, GetBalanceType, GetTimerType, StartTimerType} from "../types/types";


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
    }
};
