import FarmingButton from "../ui/FarmingButton";
import {useCountdown} from "../../context/CountdownProvider";
import {useStartTimer} from "../../hooks/useStartTimer";
import {memo, useEffect, useState} from "react";
import {GetTimerType} from "../../types/types";
import {useCloseTimer} from "../../hooks/useCloseTimer";
import {useFetchBalance} from "../../hooks/useFetchBalance";
import {initInitData} from "@telegram-apps/sdk-react";

// const totalTimeMS = 8 * 60 * 60 * 1000; // в миллисекундах
const totalTimeMS = 60 * 1000; // в миллисекундах
// const totalTimeS = 8 * 60 * 60 * 1000 / 1000; // в секундах
// const totalTimeS = 60000 / 1000; // в секундах

type FarmingComponentProps = {
    timer: GetTimerType | undefined
}

function FarmingComponent({timer}: FarmingComponentProps) {
    const initData = initInitData();
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

    const [fetchEnabled, setFetchEnabled] = useState<boolean>(false);

    const {refetch} = useFetchBalance(initData?.user?.id.toString() ?? "", fetchEnabled);
    const {mutate: startTimer, data: startTimerData} = useStartTimer(initData?.user?.id.toString() ?? "");
    const {mutate: stopTimer} = useCloseTimer(initData?.user?.id.toString() ?? "");
    // console.log("startTimerData", startTimerData);
    // console.log("timer", timer);
    // console.log("countdownDate", countdownDate);
    // console.log("stopTimerData", stopTimerData);
    useEffect(() => {
        // if (timer) {
        //     console.log("useEffect");
        // localStorage.clear();
        const now = Date.now();
        const savedLocalEndTime = parseInt(localStorage.getItem("countdownEndTime") || "0", 10);
        const savedLocalStartTime = parseInt(localStorage.getItem("startTime") || "0", 10);
        // const savedCount = parseInt(localStorage.getItem("count") || "0", 10);
        const savedEndTime = timer?.info?.time_end ? timer?.info?.time_end * 1000 : savedLocalEndTime;
        const savedStartTime = timer?.info?.time_start ? timer?.info?.time_start * 1000 : savedLocalStartTime;
        // console.log("savedEndTime", savedEndTime);
        // console.log("savedStartTime", savedStartTime);
        if (savedEndTime && savedEndTime > now) {
            const timePassed = now - savedStartTime; // Прошедшее время с начала
            // const elapsedTime = Math.max(0, savedEndTime - now); // Время до окончания
            setCount(Math.floor(timePassed / 1000)); // преобразуем миллисекунды в секунды
            setIsCountdown(false);
            setStartDate(savedStartTime);
            setCountdownDate(savedEndTime);
        }
        if (savedEndTime && savedEndTime <= now) {
            // console.log("второе условие");
            // setCount(Math.floor(8 * 60 * 60 * 1000 / 1000));
            setIsCountdown(false);
            setCount(timer?.info?.amount ?? Math.floor(savedEndTime - savedStartTime));
            setStartDate(savedStartTime);
            setCountdownDate(savedEndTime);
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

    useEffect(() => {
        if (startTimerData && startTimerData.resp === "ok") {
            const now = startTimerData.info.time_start * 1000 ?? Date.now();
            const newEndTime = startTimerData.info.time_end * 1000 ?? Date.now() + totalTimeMS;
            console.log("now", now);
            console.log("newEndTime", newEndTime);
            localStorage.setItem("countdownEndTime", newEndTime.toString());
            localStorage.setItem("startTime", now.toString());
            setIsCountdown(false);
            setCountdownDate(newEndTime);
            setStartDate(now);
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

    const setUserPoints = async () => {
        try {
            stopTimer();
            setComplete(false);
            setCount(0);
            localStorage.removeItem("countdownEndTime");
            localStorage.removeItem("startTime");
            setFetchEnabled(true);
            await refetch();
        } catch (e) {
            console.error("Ошибка в отправке points", e);
        }
    };

    const renderer = ({hours, minutes, total}: any) => {
        // console.log("renderer", total);
        const remaining = total;
        const totalTime = countdownDate - startDate;
        // console.log("totalTime", totalTime);
        const progress = ((totalTime - remaining) / totalTime) * 100;// прогресс в процентах
        // setProgress(progresss.toString())
        // console.log("remaining", remaining);
        // console.log("progress", progress);
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
                    fontSize: 19,
                    textAlign: "center",
                    zIndex: 1
                }}>
                    <span style={{position: "relative", right: 25, top: "27%"}}>Farming &#x20BF;<span
                        style={{position: "absolute"}}>{count}</span></span>
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
        <FarmingButton isCountdown={isCountdown} complete={complete} countdownDate={countdownDate} renderer={renderer}
                       startFarming={() => startFarming()} setUserPoints={() => setUserPoints()}/>
    );
}

export default memo(FarmingComponent);
