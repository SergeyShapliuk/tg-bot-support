import {Container, Sprite, Texture} from "pixi.js";
import {app} from "../main";


/**
 * The app's animated background based on Sprite, always present on the screen
 */
export class TiledBackground extends Container {
    private sprite: Sprite;

    constructor() {
        super();

        // Инициализация Sprite с текстурой
        this.sprite = new Sprite(Texture.from("background"));
        this.sprite.anchor.set(0.5);  // Центрирование по середине
        this.addChild(this.sprite);

        // Подписка на изменение размеров окна
        app.renderer.on("resize", this.onResize.bind(this));

        // Инициализация размеров
        this.resize(app.screen.width, app.screen.height);
    }

    /** Обновление размеров спрайта при изменении размера окна */
    private onResize() {
        this.resize(app.screen.width, app.screen.height);
    }

    /** Применение эффекта cover при изменении размеров */
    public resize(screenWidth: number, screenHeight: number) {
        const textureRatio = this.sprite.texture.width / this.sprite.texture.height;
        const screenRatio = screenWidth / screenHeight;

        let scaleFactor;

        // Масштабируем по ширине или высоте, чтобы занять весь экран
        if (screenRatio > textureRatio) {
            scaleFactor = screenWidth / this.sprite.texture.width;
        } else {
            scaleFactor = screenHeight / this.sprite.texture.height;
        }

        // Устанавливаем масштаб спрайта
        this.sprite.width = this.sprite.texture.width * scaleFactor;
        this.sprite.height = this.sprite.texture.height * scaleFactor;

        // Центрируем спрайт по экрану
        this.sprite.x = screenWidth / 2;
        this.sprite.y = screenHeight / 2;
    }

    /** Анимация обновления каждый кадр */
    public renderUpdate() {
        // Тут можно добавить любую анимацию, если необходимо
    }
}
