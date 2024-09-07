import {CSSProperties, useEffect} from "react";
import {initInitData} from "@telegram-apps/sdk-react";
import classes from "./Home.module.css";
import image from "../../assets/main_image.jpg";
import {FadeLoader} from "react-spinners";
import {useFetchTimer} from "../../hooks/useFetchTimer";
import FarmingComponent from "./FarmingComponent";
import {useTotalPoints} from "../../context/TotalPointsProvider";
import {useFetchBalance} from "../../hooks/useFetchBalance";


const override: CSSProperties = {
    position: "absolute",
    top: "45%",
    left: "50%",
    display: "block",
    margin: "0 auto",
    zIndex: 999
};

function Home() {
    const initData = initInitData();
    // const cloudStorage = initCloudStorage();

    const {
        isInitialized,
        points,
        setInitialized,
        setPoints
    } = useTotalPoints();
    const {data: balance} = useFetchBalance(initData?.user?.id.toString() ?? "", true);
    const {data: timer, isPending} = useFetchTimer(initData?.user?.id.toString() ?? "");


    // const [isLoading, setLoading] = useState<boolean>(false);
    // const [progress, setProgress] = useState<string>('0');
    // console.log("isCountdown", isCountdown);

    // console.log("timer", timer);
    // console.log("isPending", isPending);
    // console.log("isLoading", isLoading);
    // console.log("balance", balance);
    // console.log("count", count);
    // console.log("points", points);
    // console.log("complete", complete);
    // console.log("countdownDate", countdownDate);
    // console.log("date", Date.now());
    // console.log("datecalc", 1725723424 - 1725698224);
    // console.log("timestamp", new Date(1725698224 * 1000));
    useEffect(() => {
        if (!isPending && timer && balance) {
            // const timeOut = setTimeout(() => {
            setPoints(balance.amount);
            setInitialized(true);
            // }, 1000);
            // return () => clearTimeout(timeOut);
        }
    }, [timer, balance]);
    //
    //
    //
    //
    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <div className={classes.main}>
            <div style={{textAlign: "center"}}>
                <div style={{
                    // flex: 1,
                    // fontFamily:'sans-serif',
                    fontSize: 24,
                    fontWeight: 600,
                    maxWidth: "100%", // Ограничивает ширину
                    wordWrap: "break-word", // Переносит текст на новую строку,
                    padding: "1em"
                }}>
                    {initData?.user?.username ? initData.user.username : initData?.user?.firstName ? initData?.user?.firstName : "-----"}
                </div>
                {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                <div style={{fontSize: 27, fontWeight: 600}}>&#8383;{points ? points : "0"}</div>
            </div>
            <div className={classes.imageBlock}>
                <img
                    src={image}
                    className={classes.image} alt="Image"/>
            </div>
            <div className={classes.buttonContainer}>
                <FarmingComponent timer={timer}/>
            </div>
        </div>
    );
}


export default Home;
