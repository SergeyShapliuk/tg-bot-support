import {CSSProperties, useEffect} from "react";
import Countdown from "react-countdown";
import {initInitData} from "@telegram-apps/sdk-react";
import classes from "./Home.module.css";
import image from "../../assets/main_image.jpg";
import {FadeLoader} from "react-spinners";
import {useCountdown} from "../../context/CountdownProvider";

// const totalTimeMS = 8 * 60 * 60 * 1000; // в миллисекундах
const totalTimeMS = 60 * 1000; // в миллисекундах
// const totalTimeS = 8 * 60 * 60 * 1000 / 1000; // в секундах
const totalTimeS = 60000 / 1000; // в секундах

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
        isCountdown,
        count,
        points,
        complete,
        countdownDate,
        // startDate,
        setInitialized,
        setIsCountdown,
        setCount,
        setPoints,
        setComplete,
        setCountdownDate,
        setStartDate
    } = useCountdown();
    // const [isLoading, setLoading] = useState<boolean>(false);
    // const [progress, setProgress] = useState<string>('0');
    // console.log("isCountdown", isCountdown);
    console.log("count", count);
    console.log("points", points);
    console.log("complete", complete);
    console.log("countdownDate", countdownDate);
    useEffect(() => {
        if (!isInitialized) {
            const timeOut = setTimeout(() => {
                setInitialized(true);
            }, 1500);
            return () => clearTimeout(timeOut);
        }
    }, []);
    useEffect(() => {
        console.log("useEffect");
        // localStorage.clear();
        const now = Date.now();
        const savedEndTime = parseInt(localStorage.getItem("countdownEndTime") || "0", 10);
        const savedStartTime = parseInt(localStorage.getItem("startTime") || "0", 10);
        // const savedCount = parseInt(localStorage.getItem("count") || "0", 10);

        // console.log("savedCount", savedCount);
        // console.log("savedCount", savedCount);
        if (savedEndTime && savedEndTime > now) {
            const timePassed = now - savedStartTime; // Прошедшее время с начала
            // const elapsedTime = Math.max(0, savedEndTime - now); // Время до окончания
            setCount(Math.floor(timePassed / 1000)); // преобразуем миллисекунды в секунды
            setIsCountdown(false);
            setCountdownDate(savedEndTime);
        }
        if (savedEndTime && savedEndTime <= now) {
            // console.log("второе условие");
            // setCount(Math.floor(8 * 60 * 60 * 1000 / 1000));
            setIsCountdown(false);
            setCount(Math.floor(totalTimeS));
            setCountdownDate(savedEndTime);
        }

        // else {
        //     // const newEndTime = now + 8 * 60 * 60 * 1000; // 8 часов в миллисекундах
        //     const newEndTime = now + 5000; // 8 часов в миллисекундах
        //     localStorage.setItem("countdownEndTime", newEndTime.toString());
        //     setCountdownDate(newEndTime);
        // }
        // setLoading(false);
    }, []);

    useEffect(() => {
        if (countdownDate) {
            const intervalId = setInterval(() => {
                const now = Date.now();
                // const saveClaim = localStorage.getItem("claim");
                // if (saveClaim) {
                //     localStorage.removeItem("claim");
                //     setComplete(false);
                //     clearInterval(intervalId);
                //     return;
                // }

                if (countdownDate <= now) {
                    clearInterval(intervalId);
                    setIsCountdown(true);
                    setComplete(true);
                } else {
                    // Обновляем счётчик каждую секунду
                    setCount(prevCount => prevCount + 1);
                }
            }, 1000);

            return () => clearInterval(intervalId); // Очистка интервала при размонтировании
        }
    }, [isCountdown]);

    const setUserPoints = async (farmingPoints: number) => {
        try {
            setPoints(farmingPoints);
            setComplete(false);
            setCount(0);
            // localStorage.setItem("claim", "true");
            localStorage.removeItem("countdownEndTime");
            localStorage.removeItem("startTime");
        } catch (e) {
            console.error("Ошибка в отправке points", e);
        }
    };

    const startFarming = () => {
        const now = Date.now();
        setIsCountdown(false);
        const newEndTime = now + totalTimeMS; // 8 часов в миллисекундах
        localStorage.setItem("countdownEndTime", newEndTime.toString());
        localStorage.setItem("startTime", now.toString());
        setCountdownDate(newEndTime);
        setStartDate(now);

    };

    const renderer = ({hours, minutes, seconds, total}: any) => {
        console.log("renderer", total / 1000);
        const remaining = total / 1000;
        const progress = ((totalTimeS - remaining) / totalTimeS) * 100;// прогресс в процентах
        // setProgress(progresss.toString())
        console.log("remaining", remaining);
        console.log("totalTimeS", totalTimeS);
        console.log("progress", progress);
        return (
            <div style={{
                position: "relative",
                width: "100%",
                height: "60px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#9b9b9b",
                borderRadius: "12px",
                overflow: "hidden"
                // transition: "background 1s ease",
            }}>
                <div
                    style={{
                        position: "absolute",
                        width: `${progress}%`,
                        top: 0,
                        bottom: 0,
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        backgroundColor: "rgba(52,199,89,0.5)",
                        zIndex: 0
                    }}/>
                <span style={{flex: 1, fontSize: 19, textAlign: "center", zIndex: 1}}>
            Farming &#x20BF;{count}
                    <span style={{
                        position: "absolute",
                        top: 23,
                        right: 0,
                        paddingRight: "10px",
                        fontSize: 12,
                        zIndex: 1
                    }}>{hours}h {minutes}m {seconds}s</span>
          </span>
            </div>
        );
    };
    if (!isInitialized) return <FadeLoader color={"#34C759"} cssOverride={override} loading={!isInitialized}/>;
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
                }}>{initData?.user?.username ? initData.user.username : initData?.user?.firstName ? initData?.user?.firstName : "-----"}
                </div>
                {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                <div style={{fontSize: 27, fontWeight: 600}}>&#8383; {points}</div>
            </div>
            <div className={classes.imageBlock}>
                <img
                    src={image}
                    className={classes.image} alt="Image"/>
            </div>

            <div className={classes.buttons}>
                {isCountdown && !complete && <button className={classes.unActive} onClick={startFarming}>
                    Start farming
                </button>}
                {!isCountdown && !complete && <Timer countdownDate={countdownDate}
                                                     renderer={renderer}/>}
                {complete && <button className={classes.unActive} onClick={() => setUserPoints(count)}>
                    Claim
                </button>}
            </div>
        </div>
    );
}


function Timer({countdownDate, renderer}: any) {
    return <Countdown date={countdownDate} renderer={renderer}/>;
}

export default Home;
