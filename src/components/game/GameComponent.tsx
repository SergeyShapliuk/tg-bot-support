// import MemoHandcuffIcon from "../svg/HandcuffIcon";

import {ThemeInitializer} from "./contexts/ThemeContext";
import {Game} from "./components/Game";

const GameComponent = () => {


    return (
        <ThemeInitializer>
            <Game autoplay={false}/>
        </ThemeInitializer>
        // return (
        //     <div style={{
        //         width: "100%",
        //         height: "100%",
        //         display: "flex",
        //         flexDirection: "column",
        //         justifyContent: "center",
        //         alignItems: "center"
        //     }}>
        //         <div style={{
        //             color: "#3193F4",
        //             fontFamily: "Onest",
        //             fontSize: "29px",
        //             fontWeight: "500",
        //             lineHeight: "33px",
        //             marginTop: 20
        //         }}>Game
        //         </div>
        //         <div style={{
        //             color: "#FFFFFF",
        //             fontFamily: "Onest",
        //             fontWeight: "400",
        //             fontSize: "20px",
        //             lineHeight: "22px",
        //             marginTop: 104
        //         }}>А game will
        //             start soon
        //         </div>
        //         <MemoHandcuffIcon style={{position: "absolute", bottom: 0}}/>
        //     </div>
    );
};

export default GameComponent;
