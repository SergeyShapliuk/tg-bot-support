import {CSSProperties, lazy, useEffect} from "react";
import {initInitData} from "@telegram-apps/sdk-react";
import classes from "./Home.module.css";
import image from "../../assets/main_image.jpg";
import {FadeLoader} from "react-spinners";
import {useFetchTimer} from "../../hooks/useFetchTimer";
import FarmingComponent from "./FarmingComponent";
import {useTotalPoints} from "../../context/TotalPointsProvider";
import {useFetchBalance} from "../../hooks/useFetchBalance";
import MemoGameIconFill from "../svg/GameIconFill";
import {NavLink} from "react-router-dom";
import {useScreenSize} from "../../context/ScreenSizeProvider";

const Ads = lazy(() => import("../ads/Ads"));


export const override: CSSProperties = {
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
    const {screenSize} = useScreenSize();

    const {
        isInitialized,
        points,
        setInitialized,
        setPoints
    } = useTotalPoints();
    const {
        data: balance,
        isSuccess: isSuccessBalance,
        isFetching
    } = useFetchBalance(initData?.user?.id.toString() ?? "test_user3");
    const {
        data: timer,
        isSuccess: isSuccessTimer,
        refetch: refetchTimer,
        error: e
    } = useFetchTimer(initData?.user?.id.toString() ?? "test_user3");

    // console.log("Timer", timer);
    console.log("error", e);
    // console.log("refHeight", refHeight.current?.clientHeight);


    useEffect(() => {
        if (isSuccessBalance && isSuccessTimer && !isFetching) {
            // const timeOut = setTimeout(() => {
            setPoints(balance.amount);
            setInitialized(true);
            // }, 1000);
            // return () => clearTimeout(timeOut);
        }
    }, [isSuccessBalance, isSuccessTimer, isFetching]);

    // useEffect(() => {
    //     const initAdfox = () => {
    //         const adContainer = document.getElementById("adfox_172890647605499958");
    //         console.log("YaadContainer:", adContainer);
    //         if (adContainer) {
    //             adContainer.style.position = "absolute";
    //             adContainer.style.display = "block";
    //             adContainer.style.width = "100%";
    //             adContainer.style.height = "100%";
    //             adContainer.style.zIndex = "10";
    //             // adContainer.style.backgroundColor = "red";
    //             window.yaContextCb = window.yaContextCb || [];
    //             window.yaContextCb.push(function () {
    //                 console.log("Ya:", window.Ya);
    //                 console.log("Ya.adfoxCodes:", window.Ya && window.Ya.adfoxCode);
    //                 if (window.Ya && window.Ya.adfoxCode) {
    //                     // const platform = /Mobi|Android/i.test(navigator.userAgent) ? 'touch' : 'desktop';
    //                     Ya.adfoxCode.create({
    //                         ownerId: 10885266,
    //                         containerId: "adfox_172890647605499958",
    //                         type: "fullscreen", // Добавляем тип
    //                         platform: "touch", // Добавляем платформу
    //                         params: {
    //                             p1: "delme",
    //                             p2: "hiuq",
    //                             ext_duid: "7546029935"
    //
    //                         }
    //                     });
    //                 } else {
    //                     console.error("Adfox нсе инициализирован, проверьте подключение скрипта.");
    //                 }
    //             });
    //         } else {
    //             console.error("Контейнер для рекламы не найден");
    //         }
    //     };
    //     (function (d, w, c) {
    //         w[c] = w[c] || [];
    //         w[c].push(initAdfox);
    //         const n = d.createElement("script");
    //         n.src = "https://yandex.ru/ads/system/context.js";
    //         n.async = true;
    //         const s = d.getElementsByTagName("script")[0];
    //         s.parentNode.insertBefore(n, s);
    //     })(document, window, "yaContextCb");
    //
    //     return () => {
    //         const adContainer = document.getElementById("adfox_172890647605499958");
    //         if (adContainer) {
    //             adContainer.style.display = "none";
    //         }
    //     };
    // }, []);

    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <div className={classes.main}>
            <Ads/>
            {/*<div style={{textAlign: "center"}}>*/}
            <div className="popup">
                <div style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 10
                }}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <MemoGameIconFill/>
                        <div style={{textAlign: "start", marginLeft: 22}}>
                            <div
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: screenSize.width * 0.069,
                                    fontWeight: "500",
                                    lineHeight: "24px"
                                }}>Game
                            </div>
                            <div style={{
                                color: "#FFFFFF",
                                fontSize: screenSize.width * 0.035,
                                fontWeight: "400",
                                lineHeight: "18px"
                            }}>is ready, try it now!
                            </div>
                        </div>
                    </div>
                    <NavLink to={"/game"} style={{
                        textDecoration: "none",
                        textAlign: "center"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            color: "#fff",
                            fontSize: screenSize.width * 0.035,
                            fontWeight: "400",
                            lineHeight: "16px",
                            backgroundColor: "rgba(249,249,249,0.31)",
                            padding: "7px 20px"
                        }}>Open
                        </div>
                    </NavLink>
                </div>
            </div>
            {/*</div>*/}
            <div className={classes.imageBlock}>
                <div style={{
                    // flex: 1,
                    // fontFamily:'sans-serif',
                    fontSize: "27px",
                    fontWeight: "500",
                    lineHeight: "34px",
                    letterSpacing: -0.4,
                    maxWidth: "100%", // Ограничивает ширину
                    wordWrap: "break-word", // Переносит текст на новую строку,
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                    // lineClamp: 1
                    // padding: ".5em",
                    // marginTop: "10px"
                }}>
                    Hello, {initData?.user?.username ? initData.user.username : initData?.user?.firstName ? initData?.user?.firstName : "-----"}!
                </div>
                {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                <div style={{height: screenSize.height - 450, display: "flex", alignItems: "center"}}>
                    <img
                        src={image}
                        className={classes.image} alt="Image"/>
                </div>
                {/*<div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',background:'red',}}>*/}
                <div style={{fontSize: "20px", letterSpacing: -0.3, textAlign: "left"}}>Your
                    balance
                </div>
                <div style={{
                    fontSize: screenSize.width * 0.097,
                    fontWeight: 600,
                    letterSpacing: -0.2,
                    textAlign: "left"
                }}>{points ? points : "0"} SD
                </div>
                {/*</div>*/}
            </div>
            <div className={classes.buttonContainer}>
                <FarmingComponent timer={timer} refetchTimer={() => refetchTimer()}/>
            </div>
        </div>
    );
}


export default Home;
