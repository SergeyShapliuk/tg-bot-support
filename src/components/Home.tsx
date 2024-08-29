import {useEffect, useMemo, useState} from "react";
import Countdown from "react-countdown";
import {useTelegram} from "../hooks/useTelegram";


function Home() {
    const {user} = useTelegram();
    const [isCountdown, setIsCountdown] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    const countdownDate = useMemo(() => Date.now() + 28800000, []);

    useEffect(() => {
        let interval: number;

        if (!isCountdown) {
            interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
        }

        // Очистка интервала при размонтировании компонента или при изменении isCountdown
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isCountdown]);

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
        <>
            <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <p style={{flex: 1, fontSize: 34}}>{user ? user : "-----"}</p>
                <p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {0}</p>
            </div>
            <img
                src={"https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_66cb251a38922e1b53f17b2a_66cb2726a927611e52d8e8fa/scale_1200"}
                className="image" alt="Image"/>
            <div className="card">
                {isCountdown ? <button style={{}} onClick={() => setIsCountdown(false)}>
                    Start
                </button> : <button><Timer countdownDate={countdownDate} renderer={renderer}/></button>}
            </div>
        </>
    );
}

export default Home;

function Timer({countdownDate, renderer}: any) {
    return <Countdown date={countdownDate} renderer={renderer}/>;
}
