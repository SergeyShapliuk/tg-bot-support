import {NavLink, Outlet, useLocation} from "react-router-dom";
import classes from "./GameComponent.module.css";



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
        location.pathname === "/game/stack" || location.pathname === "/game/puzzle" ?
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
            </div>

    );
};

export default GameComponent;

function NavGames() {

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
    const textStyle = {color: "#fff", fontSize: 36, fontWeight: 700, lineHeight: "35px", letterSpacing: -0.3};

    return (
        <nav className={classes.navGame}>
            <NavLink to="/game/stack" className={classes.nav_item} style={{textDecoration: "none"}}>
                {/*<MemoHomeIcon fill={location.pathname === "/" ? "#0E1012" : "#434343"}/>*/}
                <div style={textStyle}>STACK</div>
            </NavLink>
            <NavLink to="/game/puzzle" className={classes.nav_item} style={{textDecoration: "none"}}>
                {/*<MemoTasksIcon fill={location.pathname === "/tasks" ? "#0E1012" : "#434343"}/>*/}
                <div style={textStyle}>PUZZLING POTIONS</div>
            </NavLink>
        </nav>
    );
}
