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
    amount: number | string | null;
    resp: string;
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
    second: { go: number, last: number }
    resp: string;
}
export type GetUserRefType = {
    codes: { code: string, stat: number, link_code: string }[];
    resp: string;
}
export type UserReferrals = {
    customer: string,
    name: string,
    amount: string,
    referal_count: string
}
export type GetUserReferrals = {
    data: UserReferrals[]
    info: { cols_ref: string }
    resp: string;
}
export type TasksItemType = {
    id: number;
    title: string;
    amount: number;
    link: string;
    icon: string;
    stat: number;
    user_stat: number;
    dt_create: string;
}
export type GetTasksType = {
    data: TasksItemType[]
    resp: string;
}
export type SetTaskType = {
    data: {
        id: number;
        customer_id: number;
        amount: number;
        stat: number;
        task_id: number;
        dt_create: string;
    },
    resp: string;
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
export type SetUserTaskType = {
    info: {
        amount: number;
        customer_id: number;
        dt_create: string;
        id: number;
    };
    resp: string;
}
