import Countdown from "react-countdown";
import classes from "../home/Home.module.css";

type FarmingButtonType = {
    isCountdown: boolean,
    complete: boolean,
    countdownDate: number,
    renderer: any,
    startFarming: () => void,
    setUserPoints: () => void
}

function FarmingButton({
                           isCountdown,
                           complete,
                           countdownDate,
                           renderer,
                           startFarming,
                           setUserPoints
                       }: FarmingButtonType) {

    return (
        <div className={classes.buttonContainer}>
            {isCountdown && !complete && <button className={classes.unActive} onClick={startFarming}>
                Start farming
            </button>}
            {!isCountdown && !complete && <Timer countdownDate={countdownDate}
                                                 renderer={renderer}/>}
            {complete && <button className={classes.unActive} onClick={setUserPoints}>
                Claim
            </button>}
        </div>
    );
}

export default FarmingButton;

function Timer({countdownDate, renderer}: any) {
    return <Countdown date={countdownDate} renderer={renderer}/>;
}
