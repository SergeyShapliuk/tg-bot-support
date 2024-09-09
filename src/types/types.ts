export type ListTasksType = {
    id: string;
    name: string;
    icon: JSX.Element;
    title: string;
    points: string;
    link: string;
    claim: boolean;
}
export type GetBalanceType = {
    resp: string;
    amount: number | string | null;
}
export type GetTimerType = {
    info: {
        amount: number;
        customer_id: number;
        dt_create: string;
        id: number;
        stat: number;
        time_end: number;
        time_start: number;
    };
    resp: string;
    second: { go: number, last: number }
}
export type StartTimerType = {
    info: {
        amount: number;
        customer_id: number;
        dt_create: string;
        id: number;
        stat: number;
        time_end: number;
        time_start: number;
    };
    resp: string;
}
export type CloseTimerType = {
    info: {
        amount: number;
        customer_id: number;
        dt_create: string;
        id: number;
    };
    resp: string;
}
export type GetUserRefType = {
    codes: { code: string, stat: number }[];
    resp: string;
}
