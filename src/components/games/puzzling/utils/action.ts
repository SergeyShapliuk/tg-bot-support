import {initInitData} from "@telegram-apps/sdk-react";
import {api} from "../../../../api/api";
import {StartGameType} from "../../../../types/types";

const initData = initInitData();


export class Action {
    private static instance: Action;
    private game_id: number | undefined;

    constructor() {
        this.game_id = undefined; // Инициализация game_id как undefined
    }

    public static getInstance(): Action {
        if (!Action.instance) {
            Action.instance = new Action();
        }
        return Action.instance;
    }

    public startGame() {

        const userId = initData?.user?.id.toString() ?? "";
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        api.startGame(userId).then((res) => {
            // console.log("startGame", res.data);
            this.handleStartGameResponse(res.data);
        }).catch((e) => console.log("ErrorStartGame", e));
    }

    private handleStartGameResponse(data: StartGameType) {
        if (data?.resp === "ok") {
            this.game_id = data.data.game_customer_id;
        }
        if (data?.resp === "err" && data?.msg === "Game is work") {
            console.log(' if ',data?.info?.id)
            this.game_id = data?.info?.id;
        }
    }

    public stopGame(point: number) {

        const userId = initData?.user?.id.toString() ?? "";
        // console.log("stopGame1", userId);
        // console.log("stopGame2", this.game_id);
        if (!userId || !this.game_id) {
            console.error("User user_id or game_id is not available.");
            return;
        }
        api.setGame(userId, this.game_id, point)
            .then((res) => console.log("stopGame", res.request))
            .catch((e) => console.log("ErrorStopGame", e));
    }
}
