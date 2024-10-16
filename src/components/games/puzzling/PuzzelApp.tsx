import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import bc from "./raw-assets/common{m}/common-atlas{tps}/bc.png";
import ym from "react-yandex-metrika";


const PuzzleApp = () => {
    // const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        let isMounted = true;

        const startApp = async () => {
            try {
                const module = await import("./main");
                if (isMounted) {
                    // await init()
                    await module.init(); // Инициализация PixiJS
                    console.log("Pixi application started.");
                    ym("hit", "/game/blaster");
                    ym("reachGoal", "blaster_start");

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
                    await module.stopApp(); // Остановка PixiJS
                    console.log("Pixi application stopped.");
                }
            };
            stopAppEf();
        };
    }, []);


    const handleBackClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Останавливаем распространение события
        navigate(-1); // Возвращаем на предыдущую страницу
    };

    return (
        <div onClick={event => handleBackClick(event)}>
            <img src={bc} style={{position: "absolute", top: 15, left: 15, zIndex: 10}}/>
        </div>
    );
};

export default PuzzleApp;
