import Countdown from "react-countdown";
import classes from "../home/Home.module.css";
// import {BeatLoader} from "react-spinners";
// import {CSSProperties} from "react";

type FarmingButtonType = {
    loading: boolean;
    isCountdown: boolean;
    complete: boolean;
    countdownDate: number;
    renderer: any;
    startFarming: () => void;
    setUserPoints: () => void;
}

// const override: CSSProperties = {
//     position: "absolute",
//     top: "53%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     display: "block",
//     margin: "0 auto",
//     zIndex: 999
// };

function FarmingButton({
                           // loading,
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
            {/*<BeatLoader*/}
            {/*    color={"red"}*/}
            {/*    loading={loading}*/}
            {/*    cssOverride={override}*/}
            {/*    size={15}*/}
            {/*    // aria-label="Loading Spinner"*/}
            {/*    // data-testid="loader"*/}
            {/*/>*/}
        </div>
    );
}

export default FarmingButton;

function Timer({countdownDate, renderer}: any) {
    return <Countdown date={countdownDate} renderer={renderer}/>;
}
