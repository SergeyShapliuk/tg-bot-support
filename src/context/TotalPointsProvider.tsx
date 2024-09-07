import {createContext, useState, useContext, ReactNode} from "react";

interface TotalPointsContextProps {
    isInitialized: boolean;
    points: number | string | null;
    setInitialized: (value: boolean) => void;
    setPoints: (value: number | string | null) => void;
}


const TotalPointsContext = createContext<TotalPointsContextProps | undefined>(undefined);


export const TotalPointsProvider = ({children}: { children: ReactNode }) => {
    const [isInitialized, setInitialized] = useState<boolean>(false);
    const [points, setPoints] = useState<number | string | null>(null);

    return (
        <TotalPointsContext.Provider value={{
            isInitialized,
            points,
            setInitialized,
            setPoints
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
