import {createContext, useState, useContext, ReactNode} from "react";

// Define the shape of the context data
interface CountdownContextProps {
    isInitialized: boolean;
    isCountdown: boolean;
    count: number;
    points: number;
    complete: boolean;
    countdownDate: number;
    startDate: number;
    setInitialized: (value: boolean) => void;
    setIsCountdown: (value: boolean) => void;
    setCount: (value: number | ((prevCount: number) => number)) => void;
    setPoints: (value: number) => void;
    setComplete: (value: boolean) => void;
    setCountdownDate: (value: number) => void;
    setStartDate: (value: number) => void;
}

// Create the context
const CountdownContext = createContext<CountdownContextProps | undefined>(undefined);

// Create the provider component
export const CountdownProvider = ({children}: { children: ReactNode }) => {
    const [isInitialized, setInitialized] = useState<boolean>(false);
    const [isCountdown, setIsCountdown] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [complete, setComplete] = useState<boolean>(false);
    const [countdownDate, setCountdownDate] = useState<number>(0);
    const [startDate, setStartDate] = useState<number>(0);

    return (
        <CountdownContext.Provider value={{
            isInitialized,
            isCountdown,
            count,
            points,
            complete,
            countdownDate,
            startDate,
            setInitialized,
            setIsCountdown,
            setCount,
            setPoints,
            setComplete,
            setCountdownDate,
            setStartDate
        }}>
            {children}
        </CountdownContext.Provider>
    );
};

// Custom hook to use the context
export const useCountdown = () => {
    const context = useContext(CountdownContext);
    if (!context) {
        throw new Error("useCountdown must be used within a CountdownProvider");
    }
    return context;
};
