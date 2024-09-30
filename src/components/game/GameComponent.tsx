// import MemoHandcuffIcon from "../svg/HandcuffIcon";

import {ThemeInitializer} from "./contexts/ThemeContext";
import {Game} from "./components/Game";
import {useCallback, useEffect, useState} from "react";
import {initInitData} from "@telegram-apps/sdk-react";
import {useStartGame} from "../../hooks/useStartGame";
import {useSetGame} from "../../hooks/useSetGame";
import {useStatistics} from "./features/stats";
import ym from "react-yandex-metrika";

const GameComponent = () => {
    const initData = initInitData();
    const {globalStats} = useStatistics();

    const [isStarted, setStarted] = useState<boolean>(false);
    const [isEnded, setEnd] = useState<boolean>(false);
    const [currentScore, setCurrentScore] = useState<number>(0);

    const {mutate: startGame, data: dataStartGame} = useStartGame();
    const {mutate: stopGame} = useSetGame();
    console.log("dataStart", dataStartGame);

    useEffect(() => {
        if (isStarted && !isEnded) {
            setCurrentScore(globalStats.totalScore);
            startGame({tg_id: initData?.user?.id.toString() ?? "test_user3"});
            ym("hit", "/game");
            ym("reachGoal", "start");
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
        // return (
        //     <div style={{
        //         width: "100%",
        //         height: "100%",
        //         display: "flex",
        //         flexDirection: "column",
        //         justifyContent: "center",
        //         alignItems: "center"
        //     }}>
        //         <div style={{
        //             color: "#3193F4",
        //             fontFamily: "Onest",
        //             fontSize: "29px",
        //             fontWeight: "500",
        //             lineHeight: "33px",
        //             marginTop: 20
        //         }}>Game
        //         </div>
        //         <div style={{
        //             color: "#FFFFFF",
        //             fontFamily: "Onest",
        //             fontWeight: "400",
        //             fontSize: "20px",
        //             lineHeight: "22px",
        //             marginTop: 104
        //         }}>А game will
        //             start soon
        //         </div>
        //         <MemoHandcuffIcon style={{position: "absolute", bottom: 0}}/>
        //     </div>
    );
};

export default GameComponent;
