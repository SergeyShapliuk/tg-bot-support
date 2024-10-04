import "@pixi/spine-pixi";
import * as PIXI from "pixi.js"; // Импортируем необходимые компоненты из PixiJS
import {navigation} from "./utils/navigation"; // Импортируем навигацию
import {TiledBackground} from "./ui/TiledBackground"; // Импортируем фон
import {initAssets} from "./utils/assets"; // Импортируем инициализацию активов
import {getUrlParam} from "./utils/getUrlParams"; // Импортируем получение параметров из URL
import {sound} from "@pixi/sound";
import {LoadScreen} from "./screens/LoadScreen";
import {GameScreen} from "./screens/GameScreen";
import {ResultScreen} from "./screens/ResultScreen";
import {HomeScreen} from "./screens/HomeScreen"; // Импортируем звуки

export let app: any;

/** Set up a resize function for the app */
function resize() {
    const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    // const minWidth = 300;
    // const minHeight = 500;
    //
    // // Calculate renderer and canvas sizes based on current dimensions
    // const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    // const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    // const scale = scaleX > scaleY ? scaleX : scaleY;
    // const width = windowWidth * scale;
    // const height = windowHeight * scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    // app.renderer.view.style.width = `${windowWidth}px`;
    // app.renderer.view.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    // Update renderer and navigation screens dimensions
    app.renderer.resize(width, height - 100);
    navigation.resize(width, height - 100);
}

/** Fire when document visibility changes - lose or regain focus */
function visibilityChange() {
    if (document.hidden) {
        sound.pauseAll();
        navigation.blur();
    } else {
        sound.resumeAll();
        navigation.focus();
    }
}

/** Setup app and initialise assets */
export async function init() {
    app = new PIXI.Application();
    if (app) {
        app
            .init({
                backgroundColor: 0xffffff, // Устанавливаем цвет фона
                resizeTo: window // Автоматическое изменение размера

            })
            .then(async () => {
                document.body.appendChild(app.canvas);
                //     // Trigger the first resize
                window.addEventListener("resize", resize);
                resize();

                // Add a visibility listener, so the app can pause sounds and screens
                document.addEventListener("visibilitychange", visibilityChange);

                // Setup assets bundles (see assets.ts) and start up loading everything in background
                await initAssets();

                // Add a persisting background shared by all screens
                await navigation.setBackground(TiledBackground);

                // Show initial loading screen
                await navigation.showScreen(LoadScreen);

                // Go to one of the screens if a shortcut is present in url params, otherwise go to home screen
                if (getUrlParam("game") !== null) {
                    await navigation.showScreen(GameScreen);
                } else if (getUrlParam("load") !== null) {
                    await navigation.showScreen(LoadScreen);
                } else if (getUrlParam("result") !== null) {
                    await navigation.showScreen(ResultScreen);
                } else {
                    await navigation.showScreen(HomeScreen);
                }
            });
    }

//     // Add pixi canvas element (app.view) to the document's body
//     document.body.appendChild(app.canvas);
//
//     // Whenever the window resizes, call the 'resize' function
//
//

}

// Init everything
// init().then(async () => {
//
//     // Инициализация завершена
//     console.log("Pixi application initialized");
// }).catch((error) => {
//     console.error("Error initializing Pixi application:", error);
// });

export async function stop() {
    if (app) { // Проверяем, существует ли экземпляр приложения
        await sound.stopAll(); // Останавливаем все звуки
        app.destroy(true); // Останавливаем приложение и освобождаем ресурсы
        // const canvas = app.canvas; // Получаем ссылку на canvas
        // if (canvas.parentNode) {
        //     canvas.parentNode.removeChild(canvas); // Убираем canvas со страницы
        // }

        // await navigation.showScreen(LoadScreen); // Показываем экран загрузки
        navigation.blur(); // Убираем фокус с навигации
        app = null; // Устанавливаем app в null для перезапуска
        console.log("Application stopped and resources cleared."); // Логируем остановку приложения
    }
}
