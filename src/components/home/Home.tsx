import {CSSProperties, useEffect} from "react";
import {initInitData} from "@telegram-apps/sdk-react";
import classes from "./Home.module.css";
import image from "../../assets/main_image.jpg";
import {FadeLoader} from "react-spinners";
import {useFetchTimer} from "../../hooks/useFetchTimer";
import FarmingComponent from "./FarmingComponent";
import {useTotalPoints} from "../../context/TotalPointsProvider";
import {useFetchBalance} from "../../hooks/useFetchBalance";
import MemoHandcuffIcon from "../svg/HandcuffIcon";


const override: CSSProperties = {
    position: "absolute",
    top: "45%",
    left: "49%",
    // right:'50%',
    // transform:"translate(-50%, -50%)",
    display: "block",
    margin: "0 auto",
    zIndex: 999
};


function Home() {
    const initData = initInitData();
    // const initData = null;

    const {
        isInitialized,
        points,
        setInitialized,
        setPoints
    } = useTotalPoints();
    const {
        data: balance,
        isSuccess: isSuccessBalance
    } = useFetchBalance(initData?.user?.id.toString() ?? "test_user3");
    const {
        data: timer,
        isSuccess: isSuccessTimer,
        refetch: refetchTimer,
        error:e
    } = useFetchTimer(initData?.user?.id.toString() ?? "test_user3");


    console.log("Timer", timer);
    console.log("error", e);


    useEffect(() => {
        if (isSuccessBalance && isSuccessTimer) {
            // const timeOut = setTimeout(() => {
            setPoints(balance.amount);
            setInitialized(true);
            // }, 1000);
            // return () => clearTimeout(timeOut);
        }
    }, [isSuccessBalance, isSuccessTimer]);


    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <div className={classes.main}>
            <div style={{textAlign: "center"}}>
                <div style={{position: "relative", display: "inline-block"}}>
                    <MemoHandcuffIcon/>
                    <div
                        style={{
                            position: "absolute",
                            top: "50%", // Выровнять по вертикали
                            left: "50%", // Выровнять по горизонтали
                            transform: "translate(-50%, -50%)", // Центрирование по X и Y
                            textAlign: "center", // Выровнять текст по центру, если потребуется
                            color: "white", // Задать цвет текста, чтобы он был виден на иконке
                            fontWeight: "bold" // Сделать текст жирным (опционально)
                        }}
                    >
                        {initData?.user?.username
                            ? initData.user.username.slice(0, 1)
                            : initData?.user?.firstName?.slice(0, 1) || ""}

                    </div>
                </div>
                <div style={{
                    // flex: 1,
                    // fontFamily:'sans-serif',
                    fontSize: 24,
                    fontWeight: 600,
                    maxWidth: "100%", // Ограничивает ширину
                    wordWrap: "break-word", // Переносит текст на новую строку,
                    padding: ".5em"
                }}>
                    {initData?.user?.username ? initData.user.username : initData?.user?.firstName ? initData?.user?.firstName : "-----"}
                </div>
                {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                <div style={{fontSize: 27, fontWeight: 600}}>SD {points ? points : "0"}</div>
            </div>
            <div className={classes.imageBlock}>
                <img
                    src={image}
                    className={classes.image} alt="Image"/>
            </div>
            <div className={classes.buttonContainer}>
                <FarmingComponent timer={timer} refetchTimer={() => refetchTimer()}/>
            </div>
        </div>
    );
}


export default Home;
