import {NavLink, Outlet, useLocation} from "react-router-dom";
import classes from "./GameComponent.module.css";
import MemoStackIcon from "../svg/StackIcon";
import {useScreenSize} from "../../context/ScreenSizeProvider";
import blaster from "../../assets/blaster.png";


const GameComponent = () => {
    const location = useLocation();

    // const [isRunning, setIsRunning] = useState<"stack" | "puzzle" | string>("");

    // const startStack = () => {
    //     if (isRunning !== "stack") {
    //         setIsRunning("stack");
    //     }
    // };
    // const startPuzzleApp = () => {
    //     if (isRunning !== "puzzle") {
    //         setIsRunning("puzzle");
    //     }
    // };
    // // Останавливаем приложение
    // const stopPuzzleApp = async () => {
    //     if (isRunning) {
    //         console.log("PuzzleApp unmounted");
    //         const module = await import("./puzzling/main"); // Импортируйте модуль снова
    //         module.stop(); // Остановите приложение
    //         setIsRunning("");
    //     }
    // };

    return (
        <div key={location.pathname}>
            {location.pathname === "/game/stack" || location.pathname === "/game/puzzle" ?
                <Outlet/> :
                <div className={classes.main}>
                    <div style={{
                        position: "relative",
                        fontSize: "60px",
                        fontWeight: "600",
                        letterSpacing: -0.3,
                        textAlign: "center"
                    }}>GAME
                        <div style={{
                            position: "absolute",
                            width: "100%",
                            height: 27,
                            gap: 0,
                            opacity: 0.27,
                            rotate: "-15deg",
                            background: "radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(100, 115, 131, 0) 100%)",
                            top: 30
                        }}/>
                    </div>
                    <NavGames/>
                </div>}
        </div>

    );
};

export default GameComponent;

function NavGames() {
    const {screenSize} = useScreenSize();
    // const {badge} = useTotalPoints();
    // const activeStyle = (isActive: boolean): CSSProperties => {
    //     return isActive ? {
    //         width: 119.33,
    //         height: 40.39,
    //         display: "inline-flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         textAlign: "center",
    //         color: "#000000",
    //         borderRadius: 20,
    //         backgroundColor: "#3193F4",
    //         // padding: "0px 20px",
    //         textDecoration: "none",
    //         gap: 8.9
    //     } : {position: "relative", display: "flex", justifyContent: "center", width: "22%", textDecoration: "none"};
    // };
    const textStyle = {
        color: "#fff",
        fontSize: screenSize.width * 0.092,
        fontWeight: 700,
        lineHeight: "46px",
        letterSpacing: -0.3,
        zIndex: 1
    };

    return (
        <nav className={classes.navGame}>
            <NavLink to="/game/stack" className={classes.nav_item} style={{textDecoration: "none"}}>
                <div style={textStyle}>STACK</div>
                <div style={{
                    alignSelf: "self-start",
                    borderRadius: 15,
                    color: "#fff",
                    fontSize: screenSize.width * 0.035,
                    fontWeight: "400",
                    lineHeight: "16px",
                    backgroundColor: "rgba(249,249,249,0.31)",
                    padding: "7px 20px"
                }}>Open
                </div>
                <MemoStackIcon style={{position: "absolute", bottom: 0, right: 0}}/>
            </NavLink>
            <NavLink to="/game/puzzle" className={classes.nav_item} style={{textDecoration: "none"}}>
                <div style={textStyle}>BLASTER</div>
                <div style={{
                    alignSelf: "self-start",
                    borderRadius: 15,
                    color: "#fff",
                    fontSize: screenSize.width * 0.035,
                    fontWeight: "400",
                    lineHeight: "16px",
                    backgroundColor: "rgba(249,249,249,0.31)",
                    padding: "7px 20px"
                }}>Open
                </div>
                <img src={blaster} style={{
                    position: "absolute",
                    width: 159,
                    height: 154,
                    bottom: 0,
                    right: 0,
                    objectFit: "cover",
                    zIndex: 2
                }}/>
            </NavLink>
        </nav>
    );
}
