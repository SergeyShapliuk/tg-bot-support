import {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {useFetchTask} from "../hooks/useFetchTask";
import {initInitData} from "@telegram-apps/sdk-react";

interface TotalPointsContextProps {
    isInitialized: boolean;
    points: number | string | null;
    badge: number;
    setInitialized: (value: boolean) => void;
    setPoints: (value: number | string | null) => void;
    setBadge: (value: number) => void;
}


export const TotalPointsContext = createContext<TotalPointsContextProps | undefined>(undefined);


export const TotalPointsProvider = ({children}: { children: ReactNode }) => {
    const initData = initInitData();

    const [isInitialized, setInitialized] = useState<boolean>(false);
    const [points, setPoints] = useState<number | string | null>(null);
    const [badge, setBadge] = useState<number>(0);

    const {data: userTasks, isSuccess, isFetching} = useFetchTask(initData?.user?.id.toString() ?? "test");
    console.log("isFetching", isFetching);

    useEffect(() => {
        if (isSuccess) {
            const supBadge = localStorage.getItem("sup_badge");
            if (supBadge) {
                const badgeInt = parseInt(supBadge, 10);
                if (userTasks?.data?.length > badgeInt) {
                    const count = userTasks?.data?.length - badgeInt;
                    setBadge(count);
                }
            }
        }
    }, [isFetching]);
    return (
        <TotalPointsContext.Provider value={{
            isInitialized,
            points,
            badge,
            setInitialized,
            setPoints,
            setBadge
        }}>
            {children}
        </TotalPointsContext.Provider>
    );
};

// Custom hook to use the context
export const useTotalPoints = () => {
    const context = useContext(TotalPointsContext);
    if (!context) {
        throw new Error("useCountdown must be used within a CountdownProvider");
    }
    return context;
};
