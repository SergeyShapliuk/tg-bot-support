import {useEffect} from "react";


const PuzzleApp = () => {

    // Очистка при размонтировании компонента
    useEffect(() => {
        const startApp = async () => {
            const module = await import("./main");
            module.init();
        };
        startApp();
        return () => {
            // if (isRunning) {
            const stopAppEf = async () => {
                const module = await import("./main"); // Импортируйте модуль снова
                module.stop(); // Остановите приложение
            };
            stopAppEf();
            // }
        };
    }, []);

    return null;
};

export default PuzzleApp;
