import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bc from "./raw-assets/common{m}/common-atlas{tps}/bc.png";
import { sound } from "@pixi/sound";

// Объявляем глобальные функции для разблокировки аудио
declare global {
    interface Window {
        audioContextUnlocked: boolean;
        unlockAudioContext: () => Promise<void>;
    }
}

const PuzzleApp = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const appModuleRef = useRef<typeof import("./main") | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Функция для разблокировки AudioContext
    const unlockAudioContext = async () => {
        if (window.audioContextUnlocked) return;

        try {
            // 1. Разблокировка через создание и воспроизведение пустого звука
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const audioContext = new AudioContext();

                // Создаем пустой буфер и источник
                const buffer = audioContext.createBuffer(1, 1, 22050);
                const source = audioContext.createBufferSource();
                source.buffer = buffer;

                // Подключаем к выходу
                source.connect(audioContext.destination);

                // Воспроизводим (это разблокирует контекст)
                if (source.start) {
                    source.start(0);
                } else if ((source as any).noteOn) {
                    (source as any).noteOn(0);
                }

                // Останавливаем сразу
                if (source.stop) {
                    source.stop(0);
                }

                // Восстанавливаем если приостановлен
                if (audioContext.state === 'suspended') {
                    await audioContext.resume();
                }

                console.log("AudioContext unlocked");
            }

            // 2. Разблокировка Pixi Sound
            try {
                sound.resumeAll();
                console.log("Pixi sound unlocked");
            } catch (e) {
                console.warn("Could not unlock Pixi sound:", e);
            }

            window.audioContextUnlocked = true;
        } catch (error) {
            console.warn("AudioContext unlock failed:", error);
        }
    };

    // Сохраняем функцию в глобальной области
    useEffect(() => {
        window.unlockAudioContext = unlockAudioContext;
    }, []);

    useEffect(() => {
        let mounted = true;

        const startApp = async () => {
            if (!mounted || !containerRef.current) return;

            try {
                console.log("Starting Pixi application...");
                setError(null);

                // Динамически импортируем модуль
                appModuleRef.current = await import("./main");

                if (!containerRef.current) return;

                // Ждем немного для стабильности DOM
                await new Promise(resolve => setTimeout(resolve, 100));

                // Инициализируем Pixi приложение
                await appModuleRef.current.init(containerRef.current);

                if (!mounted) return;

                console.log("Pixi application started.");
                setIsInitialized(true);

                // Настраиваем разблокировку аудио по жесту пользователя
                const setupAudioUnlock = () => {
                    const unlockOnInteraction = () => {
                        unlockAudioContext();
                        // Убираем слушатели после первого взаимодействия
                        window.removeEventListener("pointerdown", unlockOnInteraction);
                        window.removeEventListener("touchstart", unlockOnInteraction);
                        window.removeEventListener("click", unlockOnInteraction);
                        window.removeEventListener("keydown", unlockOnInteraction);
                    };

                    // Добавляем несколько типов событий для надежности
                    const events: (keyof WindowEventMap)[] = [
                        "pointerdown",
                        "touchstart",
                        "click",
                        "keydown",
                        "mousedown"
                    ];

                    events.forEach(event => {
                        window.addEventListener(event, unlockOnInteraction, {
                            once: true,
                            passive: true
                        });
                    });

                    // Также разблокируем через 3 секунды автоматически (на всякий случай)
                    setTimeout(unlockAudioContext, 3000);
                };

                setupAudioUnlock();

            } catch (error) {
                console.error("Error loading Pixi application:", error);
                if (mounted) {
                    setError(error instanceof Error ? error.message : "Failed to initialize game");

                    // Пробуем еще раз через 2 секунды
                    setTimeout(() => {
                        if (mounted && !isInitialized) {
                            startApp();
                        }
                    }, 2000);
                }
            }
        };

        startApp();

        // Очистка
        return () => {
            mounted = false;
            const cleanup = async () => {
                if (appModuleRef.current) {
                    try {
                        await appModuleRef.current.stop();
                        console.log("Pixi application stopped.");
                    } catch (e) {
                        console.warn("Error during cleanup:", e);
                    }
                    appModuleRef.current = null;
                }
                setIsInitialized(false);
            };
            cleanup();
        };
    }, []);

    const handleBackClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        navigate(-1);
    };

    // Принудительная разблокировка аудио по кнопке
    const handleUnlockAudio = () => {
        unlockAudioContext();
    };

    return (
        <div style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: "#ffffff"
        }}>
            {/* Контейнер для PixiJS */}
            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    opacity: isInitialized ? 1 : 0,
                    transition: "opacity 0.3s"
                }}
            />

            {/* Кнопка назад */}
            <img
                src={bc}
                onClick={handleBackClick}
                style={{
                    position: "absolute",
                    top: 15,
                    left: 15,
                    zIndex: 10,
                    cursor: "pointer",
                    width: "40px",
                    height: "40px"
                }}
                alt="Back"
            />

            {/* Сообщение об ошибке */}
            {error && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    zIndex: 20,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    maxWidth: "80%"
                }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#ff4444" }}>
                        Game Error
                    </h3>
                    <p style={{ margin: "0 0 15px 0", color: "#333" }}>
                        {error}
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Reload Game
                        </button>
                        <button
                            onClick={handleUnlockAudio}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#2196F3",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Unlock Audio
                        </button>
                    </div>
                </div>
            )}

            {/* Индикатор загрузки */}
            {!isInitialized && !error && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 5,
                    color: "#666",
                    fontSize: "16px",
                    fontFamily: "Arial, sans-serif"
                }}>
                    Loading game...
                </div>
            )}
        </div>
    );
};

export default PuzzleApp;
