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

export let app: Application | null = null;

let resizeListener = () => {
};
let visibilityListener = () => {
};

export async function init(container: HTMLDivElement) {
    // Создаём новый экземпляр приложения
    app = new Application();

    // ⚡ В PixiJS v8 можно сразу передать container
    await app.init({
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 0xffffff,
        resizeTo: container // <--- автоматически ставит canvas в контейнер
    });

    // Теперь canvas доступен
    container.appendChild(app.canvas); // безопасно, canvas уже создан

    // Слушатели
    resizeListener = () => {
        if (!app) return;
        const w = window.visualViewport?.width || window.innerWidth;
        const h = window.visualViewport?.height || window.innerHeight;
        app.resize();
        navigation.resize(w, h);
        window.scrollTo(0, 0);
    };
    visibilityListener = () => {
        if (!app) return;
        if (document.hidden) {
            sound.pauseAll();
            navigation.blur();
        } else {
            sound.resumeAll();
            navigation.focus();
        }
    };

    window.addEventListener("resize", resizeListener);
    document.addEventListener("visibilitychange", visibilityListener);

    // Загрузка активов и экранов
    await initAssets();
    await navigation.setBackground(TiledBackground);
    await navigation.showScreen(LoadScreen);

    const gameParam = getUrlParam("game");
    if (gameParam !== null) await navigation.showScreen(GameScreen);
    else if (getUrlParam("load") !== null) await navigation.showScreen(LoadScreen);
    else if (getUrlParam("result") !== null) await navigation.showScreen(ResultScreen);
    else await navigation.showScreen(HomeScreen);

    resizeListener();
}

export async function stop() {
    if (!app) return;

    window.removeEventListener("resize", resizeListener);
    document.removeEventListener("visibilitychange", visibilityListener);

    await sound.stopAll();
    navigation.blur();

    app.destroy(true, {children: true, texture: true, baseTexture: true});
    if (app.canvas.parentNode) app.canvas.parentNode.removeChild(app.canvas);
    app = null;

    console.log("Pixi application stopped.");
}
