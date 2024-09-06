import {axiosInstanceApi} from "./instanceApi";

export const api = {
    setStartDate(date: Date) {
        return axiosInstanceApi.post<any>("", date,{
            headers: {
                //       'Content-Type': 'multipart/form-data',
            }
        });
    }
};
