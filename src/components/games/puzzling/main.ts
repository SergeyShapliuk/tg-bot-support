import {Application} from "pixi.js";
import "@pixi/spine-pixi";
import {navigation} from "./utils/navigation";
import {TiledBackground} from "./ui/TiledBackground";
import {initAssets} from "./utils/assets";
import {getUrlParam} from "./utils/getUrlParams";
import {sound} from "@pixi/sound";
import {LoadScreen} from "./screens/LoadScreen";
import {GameScreen} from "./screens/GameScreen";
import {ResultScreen} from "./screens/ResultScreen";
import {HomeScreen} from "./screens/HomeScreen";

// Экспортируем в глобальную область для отладки
declare global {
    interface Window {
        PIXI_APP?: Application;
    }
}

export let app: Application | null = null;
let resizeListener: (() => void) | null = null;
let visibilityListener: (() => void) | null = null;
let isInitialized = false;

export async function init(container: HTMLDivElement) {
    // Если уже инициализирован, ничего не делаем
    if (isInitialized && app) {
        console.log("Pixi app already initialized");
        return;
    }

    try {
        // Очистка предыдущего приложения если есть
        if (app) {
            await stop();
        }

        // Создаём новый экземпляр приложения
        app = new Application();

        // Для Telegram WebView используем безопасные настройки
        const options = {
            width: Math.max(container.clientWidth, 300),
            height: Math.max(container.clientHeight, 400),
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            antialias: true,
            powerPreference: "high-performance" as const,
            resizeTo: container,
            // Важно для стабильности
            backgroundAlpha: 1,
            clearBeforeRender: true
        };

        await app.init(options);

        // Добавляем canvas в контейнер
        container.appendChild(app.canvas);

        // Экспортируем для отладки
        window.PIXI_APP = app;

        // Слушатели
        const handleResize = () => {
            if (!app || !container) return;

            // Получаем реальные размеры контейнера
            const w = container.clientWidth || window.innerWidth;
            const h = container.clientHeight || window.innerHeight;

            // Обновляем размеры приложения
            if (app.renderer) {
                app.renderer.resize(w, h);
            }

            // Обновляем навигацию
            if (navigation.resize) {
                navigation.resize(w, h);
            }

            // Предотвращаем скролл в Telegram
            window.scrollTo(0, 0);
        };

        const handleVisibilityChange = () => {
            if (!app) return;
            if (document.hidden) {
                try {
                    sound.pauseAll();
                } catch (e) {
                    console.warn("Cannot pause sounds:", e);
                }
                if (navigation.blur) {
                    navigation.blur();
                }
            } else {
                try {
                    sound.resumeAll();
                } catch (e) {
                    console.warn("Cannot resume sounds:", e);
                }
                if (navigation.focus) {
                    navigation.focus();
                }
            }
        };

        resizeListener = handleResize;
        visibilityListener = handleVisibilityChange;

        // Используем более стабильные события для мобильных устройств
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Инициализация ресурсов
        await initAssets();

        // Устанавливаем фон
        if (navigation.setBackground) {
            await navigation.setBackground(TiledBackground);
        }

        // Показываем экран загрузки
        if (navigation.showScreen) {
            await navigation.showScreen(LoadScreen);
        }

        // Определяем какой экран показать на основе параметров URL
        const gameParam = getUrlParam("game");
        const loadParam = getUrlParam("load");
        const resultParam = getUrlParam("result");

        if (gameParam !== null && navigation.showScreen) {
            await navigation.showScreen(GameScreen);
        } else if (loadParam !== null && navigation.showScreen) {
            await navigation.showScreen(LoadScreen);
        } else if (resultParam !== null && navigation.showScreen) {
            await navigation.showScreen(ResultScreen);
        } else if (navigation.showScreen) {
            await navigation.showScreen(HomeScreen);
        }

        // Инициализируем размеры
        handleResize();
        isInitialized = true;

        console.log("PixiJS app initialized successfully in Telegram");

    } catch (error) {
        console.error("Failed to initialize PixiJS app:", error);
        isInitialized = false;
        // Не выбрасываем ошибку, чтобы не ломать приложение
    }
}

export async function stop() {
    await sound.stopAll();
    try {
        // Удаляем слушатели
        if (resizeListener) {
            window.removeEventListener("resize", resizeListener);
            window.removeEventListener("orientationchange", resizeListener);
        }

        if (visibilityListener) {
            document.removeEventListener("visibilitychange", visibilityListener);
        }

        // Останавливаем звуки
        try {
            await sound.stopAll();
        } catch (e) {
            console.warn("Error stopping sounds:", e);
        }

        // Вызываем blur у навигации если есть
        if (navigation.blur) {
            navigation.blur();
        }

        // Уничтожаем приложение
        if (app) {
            try {
                // Сохраняем canvas
                const canvas = app.canvas;

                // Уничтожаем приложение
                app.destroy(true, {
                    children: true,
                    texture: true
                });

                // Удаляем canvas из DOM
                if (canvas && canvas.parentNode) {
                    canvas.parentNode.removeChild(canvas);
                }
            } catch (e) {
                console.warn("Error during app destruction:", e);
            }

            app = null;
        }

        // Очищаем глобальную ссылку
        delete window.PIXI_APP;

        isInitialized = false;
        console.log("Pixi application stopped.");
    } catch (error) {
        console.error("Error stopping Pixi application:", error);
    }
}

export function getApp(): Application {
    if (!app) {
        throw new Error("Pixi app not initialized");
    }
    return app;
}
