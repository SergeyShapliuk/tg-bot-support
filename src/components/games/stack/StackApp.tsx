import {useCallback, useEffect, useState} from "react";
import {initInitData} from "@telegram-apps/sdk-react";
import ym from "react-yandex-metrika";
import {ThemeInitializer} from "./contexts/ThemeContext";
import {Game} from "./components/Game";
import {useStartGame} from "../../../hooks/useStartGame";
import {useSetGame} from "../../../hooks/useSetGame";
import {useStatistics} from "./features/stats";


const StackApp = () => {
    const initData = initInitData();
    const {globalStats} = useStatistics();

    const [isStarted, setStarted] = useState<boolean>(false);
    const [isEnded, setEnd] = useState<boolean>(false);
    const [currentScore, setCurrentScore] = useState<number>(0);

    const {mutate: startGame, data: dataStartGame} = useStartGame();
    const {mutate: stopGame, data} = useSetGame();
    console.log("dataStart", dataStartGame);
    console.log("dataStop", data);

    useEffect(() => {
        if (isStarted && !isEnded) {
            setCurrentScore(globalStats.totalScore);
            startGame({tg_id: initData?.user?.id.toString() ?? "test_user3"});
            ym("hit", "/game/stack");
            ym("reachGoal", "stack_start");
        }
        if (!isStarted && isEnded) {
            let game_id: number | undefined;
            if (dataStartGame && dataStartGame.resp === "ok") {
                game_id = dataStartGame.data.game_customer_id;
            }
            if (dataStartGame && dataStartGame.resp === "err" && dataStartGame.msg === "Game is work") {
                game_id = dataStartGame.info?.id;
            }
            if (game_id) {
                stopGame({
                    tg_id: initData?.user?.id.toString() ?? "test_user3",
                    game_customer_id: game_id,
                    bals: globalStats.totalScore - currentScore
                });
            }
            setEnd(false);
        }
    }, [isStarted, isEnded]);

    const setStartGame = useCallback(() => {
        setStarted(true);
    }, [isStarted]);

    const setEndGame = useCallback(() => {
        setEnd(true);
        setStarted(false);
    }, [isStarted, isEnded]);


    return (
        <ThemeInitializer>
            <Game setStartGame={setStartGame} setEndGame={setEndGame} autoplay={false}/>
        </ThemeInitializer>

    );
};

export default StackApp;
