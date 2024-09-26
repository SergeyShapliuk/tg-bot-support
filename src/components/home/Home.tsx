import {CSSProperties, useEffect} from "react";
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


    console.log("Timer", timer);
    console.log("error", e);


    useEffect(() => {
        if (isSuccessBalance && isSuccessTimer && !isFetching) {
            // const timeOut = setTimeout(() => {
            setPoints(balance.amount);
            setInitialized(true);
            // }, 1000);
            // return () => clearTimeout(timeOut);
        }
    }, [isSuccessBalance, isSuccessTimer, isFetching]);

    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <div className={classes.main}>
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
                                    fontSize: "27px",
                                    fontWeight: "500",
                                    lineHeight: "24px"
                                }}>Game
                            </div>
                            <div style={{
                                color: "#FFFFFF",
                                fontSize: "14px",
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
                            width: 75,
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "16px",
                            backgroundColor: "rgba(249,249,249,0.31)"
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
                    lineHeight: "27px",
                    maxWidth: "100%", // Ограничивает ширину
                    wordWrap: "break-word", // Переносит текст на новую строку,
                    textAlign: "left"
                    // padding: ".5em",
                    // marginTop: "10px"
                }}>
                    Hello, {initData?.user?.username ? initData.user.username : initData?.user?.firstName ? initData?.user?.firstName : "-----"}!
                </div>
                {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                <img
                    src={image}
                    className={classes.image} alt="Image"/>
                <div style={{fontSize: "20px", letterSpacing: -0.3, textAlign: "left"}}>Your
                    balance
                </div>
                <div style={{
                    fontSize: "36px",
                    fontWeight: 600,
                    letterSpacing: -0.2,
                    textAlign: "left"
                }}>{points ? points : "0"} SD
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <FarmingComponent timer={timer} refetchTimer={() => refetchTimer()}/>
            </div>
        </div>
    );
}


export default Home;
