import {useEffect} from "react";
import {useLocation} from "react-router-dom";


const PuzzleApp = () => {
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const startApp = async () => {
            try {
                const module = await import("./main");
                if (isMounted) {
                    await module.init(); // Инициализация PixiJS
                    console.log("Pixi application started.");
                }
            } catch (error) {
                console.error("Error loading Pixi application:", error);
            }
        };

        startApp();

        return () => {
            isMounted = false;
            const stopAppEf = async () => {
                const module = await import("./main");
                if (!isMounted) {
                    await module.stop(); // Остановка PixiJS
                    console.log("Pixi application stopped.");
                }
            };
            stopAppEf();
        };
    }, [location]);

    return null;
};

export default PuzzleApp;
