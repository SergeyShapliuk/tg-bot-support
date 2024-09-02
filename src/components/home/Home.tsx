import {useEffect, useMemo, useState} from "react";
import Countdown from "react-countdown";
import {initCloudStorage, initInitData} from "@telegram-apps/sdk";
import classes from "./Home.module.css";


function Home() {
    const initData = initInitData();
    const cloudStorage = initCloudStorage();
    const [isCountdown, setIsCountdown] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);

    const countdownDate = useMemo(() => Date.now() + 28800000, []);

    useEffect(() => {
        const getPoints = async () => {
            const userPoints = await cloudStorage.get("points");
            if (userPoints) setPoints(Number(userPoints));
            // console.log("useEffect");
            // const p = await tg.CloudStorage.getItem('points')
            // const response = await fetch("http://localhost:8000/points/?chatId=909630753");
            // // const response = await fetch(`http://78.155.197.92:8000/points/?chatId=909630753`);
            // const data = await response.json();
            // if (data?.points) setPoints(data.points);
            // console.log("localStorage", p);
            // console.log("user", user);
        };
        getPoints().then();
    }, []);

    useEffect(() => {
        let interval: any;

        if (!isCountdown) {
            interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 3000);
        }

        // Очистка интервала при размонтировании компонента или при изменении isCountdown
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isCountdown]);

    const setUserPoints = async (points: number) => {
        try {
            await cloudStorage.set("points", JSON.stringify(points));
            // await localStorage.setItem("points", JSON.stringify(points));
            // await fetch("http://localhost:8000/set-points/", {
            // // await fetch("http://78.155.197.92:8000/set-points", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         chatId: "909630753",
            //         points
            //     })
            // });
        } catch (e) {
            console.log("Ошибка в отправке points", e);
        }

    };

    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({hours, minutes, completed}: any) => {
        if (completed) {
            // Render a completed state
            return <Completionist/>;
        } else {
            // Render a countdown
            // setCount(prevState => prevState+1)
            return <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <span style={{flex: 1, fontSize: 21}}>Farming &#x20BF;{count}<span style={{
                    position: "absolute",
                    top: 5,
                    right: 0,
                    paddingRight: "10px",
                    fontSize: 16
                }}>{hours}h {minutes}m</span></span></div>;
        }
    };
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
                }}>{initData?.user?.username ? initData.user.username : "-----"}
                </div>
                {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                <div style={{fontSize: 27, fontWeight: 600}}>&#8383; {points}</div>
            </div>
            <div className={classes.imageBlock}>
                <img
                    src={"https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_66cb251a38922e1b53f17b2a_66cb2726a927611e52d8e8fa/scale_1200"}
                    className={classes.image} alt="Image"/>
            </div>

            <div className={classes.buttons}>
                {isCountdown ? <button className={classes.unActive} onClick={() => setIsCountdown(false)}>
                    Start farming
                </button> : <button onClick={() => {
                    setIsCountdown(true);
                    setUserPoints(count).then();
                }}><Timer countdownDate={countdownDate}
                          renderer={renderer}/></button>}
            </div>
        </div>
    );
}

export default Home;

function Timer({countdownDate, renderer}: any) {
    return <Countdown date={countdownDate} renderer={renderer}/>;
}
