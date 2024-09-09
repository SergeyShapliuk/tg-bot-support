import FarmingButton from "../ui/FarmingButton";
import {useCountdown} from "../../context/CountdownProvider";
import {useStartTimer} from "../../hooks/useStartTimer";
import {memo, useEffect} from "react";
import {GetTimerType} from "../../types/types";
import {useCloseTimer} from "../../hooks/useCloseTimer";
import {useFetchBalance} from "../../hooks/useFetchBalance";
import {initInitData} from "@telegram-apps/sdk-react";
import CountUp from "react-countup";
import {useFetchTimer} from "../../hooks/useFetchTimer";

// const totalTimeMS = 8 * 60 * 60 * 1000; // в миллисекундах
const totalTimeMS = 60 * 1000; // в миллисекундах
// const totalTimeS = 8 * 60 * 60 * 1000 / 1000; // в секундах
// const totalTimeS = 60000 / 1000; // в секундах

type FarmingComponentProps = {
    timer: GetTimerType | undefined;
    refetchTimer: any;
}

function FarmingComponent({timer}: FarmingComponentProps) {
    const initData = initInitData();
    // const initData = null;
    const {
        isCountdown,
        count,
        complete,
        countdownDate,
        startDate,
        setIsCountdown,
        setCount,
        // setPoints,
        setComplete,
        setCountdownDate,
        setStartDate
    } = useCountdown();

    // useCountUp({
    //     ref: "counter",
    //     start: 0,        // Начальное значение
    //     end: 1234567,    // Конечное значение
    //     duration: 5,     // Продолжительность анимации в секундах
    //     decimals: 2,     // Количество знаков после запятой
    //     separator: ","  // Разделитель тысяч
    // });


    const {refetch, data} = useFetchBalance(initData?.user?.id.toString() ?? "ttt");
    const {refetch: refetchTimer} = useFetchTimer(initData?.user?.id.toString() ?? "ttt");

    const {mutate: startTimer, data: startTimerData} = useStartTimer(initData?.user?.id.toString() ?? "ttt");
    const {mutate: stopTimer, data: dataStopTimer} = useCloseTimer(initData?.user?.id.toString() ?? "ttt");
    console.log("data", data);
    console.log("timer", timer);
    console.log("countdownDate", countdownDate);
    console.log("dataStopTimer", dataStopTimer);
    console.log("startTimerData", startTimerData);
    useEffect(() => {
        // if (timer) {
        //     console.log("useEffect");
        // localStorage.clear();
        const now = Date.now();
        const savedLocalEndTime = parseInt(localStorage.getItem("countdownEndTime") || "0", 10);
        const savedLocalStartTime = parseInt(localStorage.getItem("startTime") || "0", 10);
        const savedLocalAmount = localStorage.getItem("amount");
        const savedLocalDuration = localStorage.getItem("duration");
        // const savedCount = parseInt(localStorage.getItem("count") || "0", 10);
        const savedEndTime = timer?.info?.time_end ? timer?.info?.time_end * 1000 : savedLocalEndTime;
        const savedStartTime = timer?.info?.time_start ? timer?.info?.time_start * 1000 : savedLocalStartTime;

        console.log("savedLocalAmount", savedLocalAmount);
        console.log("savedLocalDuration", savedLocalDuration);
        if (savedEndTime && savedEndTime > now) {
            const timePassedMs = now - savedStartTime; // Прошедшее время в миллисекундах
            const timePassedSec = timePassedMs / 1000; // Прошедшее время в секундах

            const totalPoints = Number(savedLocalAmount);
            const durationSec = Number(savedLocalDuration); // 60 секунд
            const pointsPerSec = totalPoints / durationSec; // Поинты в секунду
            // Рассчитываем количество поинтов
            const points = Math.round(pointsPerSec * timePassedSec);

            // Устанавливаем количество поинтов, не превышая 99
            setCount(Math.min(totalPoints, points));
            if (timer?.resp === "ok") {
                refetchTimer();
            }
            // const elapsedTime = Math.max(0, savedEndTime - now); // Время до окончания
            setCount(points); // преобразуем миллисекунды в секунды
            setIsCountdown(false);
            setStartDate(savedStartTime);
            setCountdownDate(savedEndTime);
            console.log("timePassed", points);
        }
        if (savedEndTime && savedEndTime <= now) {
            // console.log("второе условие");
            // setCount(Math.floor(8 * 60 * 60 * 1000 / 1000));
            setIsCountdown(true);
            setComplete(true);
            // setCount(timer?.info?.amount ?? Math.floor(savedEndTime - savedStartTime));
            // setStartDate(savedStartTime);
            // setCountdownDate(savedEndTime);
        }

        // else {
        //     // const newEndTime = now + 8 * 60 * 60 * 1000; // 8 часов в миллисекундах
        //     const newEndTime = now + 5000; // 8 часов в миллисекундах
        //     localStorage.setItem("countdownEndTime", newEndTime.toString());
        //     setCountdownDate(newEndTime);
        // }
        // setLoading(false);
        // }

    }, []);

    // useEffect(() => {
    //     if (countdownDate) {
    //         const now = Date.now();
    //         if (countdownDate <= now) {
    //             setIsCountdown(true);
    //             setComplete(true);
    //         }
    //     }
    // }, [isCountdown]);

    useEffect(() => {
        if (dataStopTimer?.resp === "ok") {
            setComplete(false);
            setIsCountdown(true);
            setCount(0);
            setStartDate(0);
            setCountdownDate(0);
            localStorage.removeItem("countdownEndTime");
            localStorage.removeItem("startTime");
            localStorage.removeItem("amount");
            localStorage.removeItem("duration");
            refetchTimer();
            refetch();

        }

    }, [dataStopTimer]);

    useEffect(() => {
        if (startTimerData && startTimerData.resp === "ok") {
            console.log("startTimerDatauseEffect", timer);
            const now = startTimerData.info.time_start * 1000 ?? Date.now();
            const newEndTime = startTimerData.info.time_end * 1000 ?? Date.now() + totalTimeMS;
            // console.log("now", now);
            // console.log("newEndTime", newEndTime);
            localStorage.setItem("countdownEndTime", newEndTime.toString());
            localStorage.setItem("startTime", now.toString());
            setIsCountdown(false);
            setCountdownDate(newEndTime);
            setStartDate(now);
            refetchTimer().then(res => {
                if (res?.data) {
                    localStorage.setItem("amount", res?.data?.info?.amount.toString() as string);
                    localStorage.setItem("duration", res?.data?.second?.last.toString() as string);
                }
                console.log("fdsfsd", res);
            });

        }
    }, [startTimerData]);

    const startFarming = () => {
        startTimer();
    };

    // const startFarmingTest = () => {
    //     const now = Date.now();
    //     const newEndTime = Date.now() + totalTimeMS;
    //     localStorage.setItem("countdownEndTime", newEndTime.toString());
    //     localStorage.setItem("startTime", now.toString());
    //     setIsCountdown(false);
    //     setCountdownDate(newEndTime);
    //     setStartDate(now);
    // };

    const setUserPoints = () => {
        stopTimer();
    };

    const renderer = ({hours, minutes, total, completed}: any) => {
        // console.log("renderer", total);
        const remaining = total;
        const totalTime = countdownDate - startDate;
        // console.log("totalTime", totalTime);
        const progress = ((totalTime - remaining) / totalTime) * 100;// прогресс в процентах
        // setProgress(progresss.toString())
        // console.log("remaining", remaining);
        if (completed) {
            setComplete(true);
            // stopTimer();
        }
        // console.log("progress", completed);
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
                        backgroundColor: "rgb(49,125,148)",
                        zIndex: 0
                    }}/>
                <div style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    fontSize: "1.3em",
                    textAlign: "center",
                    zIndex: 1
                }}>
                    <span style={{position: "relative", right: 25, top: "27%"}}>Farming &#x20BF;<span
                        style={{position: "absolute"}}>{timer?.resp === "ok" &&
                    <CountUp start={count} end={timer?.info?.amount}
                             duration={timer?.second?.last}
                             decimals={3}
                             decimal=","
                             useEasing={false}/>}</span></span>
                    <span style={{
                        position: "absolute",
                        top: 23,
                        right: 0,
                        paddingRight: "10px",
                        fontSize: 12,
                        zIndex: 1
                    }}>{hours}h {minutes}m</span>
                </div>
            </div>
        );
    };
    return (
        <FarmingButton loading={false} isCountdown={isCountdown} complete={complete} countdownDate={countdownDate}
                       renderer={renderer}
                       startFarming={() => startFarming()} setUserPoints={() => setUserPoints()}/>
    );
}

export default memo(FarmingComponent);
