import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bc from "./raw-assets/common{m}/common-atlas{tps}/bc.png";
import { sound } from "@pixi/sound";

const PuzzleApp = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let appModule: typeof import("./main") | null = null;

        const startApp = async () => {
            try {
                appModule = await import("./main");
                if (containerRef.current && appModule) {
                    await appModule.init(containerRef.current);
                    console.log("Pixi application started.");

                    // Разблокировка AudioContext один раз
                    const unlockAudio = () => {
                        sound.resumeAll();
                        window.removeEventListener("click", unlockAudio);
                    };
                    window.addEventListener("click", unlockAudio, { once: true });
                }
            } catch (error) {
                console.error("Error loading Pixi application:", error);
            }
        };

        startApp();

        return () => {
            if (appModule) {
                appModule.stop();
                console.log("Pixi application stopped.");
            }
        };
    }, []);

    const handleBackClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        navigate(-1);
    };

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
            <img
                src={bc}
                onClick={handleBackClick}
                style={{ position: "absolute", top: 15, left: 15, zIndex: 10, cursor: "pointer" }}
            />
        </div>
    );
};

export default PuzzleApp;
