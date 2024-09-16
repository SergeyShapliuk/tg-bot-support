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
        error: e
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
                <div style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#1E1E1E",
                    borderRadius: 12,
                    borderWidth: 1.2,
                    borderStyle: "solid",
                    borderColor: "#3193F4",
                    padding: "12px 22px 10px 22px"
                }}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <MemoGameIconFill style={{marginTop: 3}}/>
                        <div style={{textAlign: "start", marginLeft: 22}}>
                            <div
                                style={{color: "#3193F4", fontSize: "17px", fontWeight: "500", lineHeight: "20px"}}>Game
                            </div>
                            <div>coming soon</div>
                        </div>
                    </div>
                    <NavLink to={"/game"} style={{
                        textDecoration: "none",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: 63,
                            height: 26,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 7,
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "16px",
                            backgroundColor: "#333232"
                        }}>Open
                        </div>
                    </NavLink>
                </div>
                <div style={{
                    // flex: 1,
                    // fontFamily:'sans-serif',
                    fontSize: 24,
                    fontWeight: 600,
                    maxWidth: "100%", // Ограничивает ширину
                    wordWrap: "break-word", // Переносит текст на новую строку,
                    padding: ".5em",
                    marginTop: "10px"
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
