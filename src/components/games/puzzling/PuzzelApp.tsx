import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import bc from "./raw-assets/common{m}/common-atlas{tps}/bc.png";


const PuzzleApp = () => {
    const location = useLocation();
    const navigate = useNavigate();


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


    const handleBackClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
