import {Routes, Route, Link, useLocation} from "react-router-dom";
import classes from "./App.module.css";
import Home from "./components/home/Home";
import Tasks from "./components/tasks/Tasks";
import Friends from "./components/friends/Friends";
import MemoHomeIcon from "./components/svg/HomeIcon";
import MemoTasksIcon from "./components/svg/TasksIcon";
import MemoFriendsIcon from "./components/svg/FriendsIcon";


function App() {
    // // const {tg} = useTelegram();
    // const initDatas = initInitData();
    // console.log('innit',initDatas)
    // useEffect(() => {
    //     // tg.ready();
    //     setTimeout(() => {
    //         // console.log("tg:", tg);
    //     }, 500);
    // }, []);


    return (
        <div className={classes.main}>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={"home"} element={<Home/>}/>
                <Route path={"tasks"} element={<Tasks/>}/>
                <Route path={"friends"} element={<Friends/>}/>

            </Routes>
            <NavBar/>
        </div>
    );
}

export default App;


function NavBar() {
    const location = useLocation(); // Get current route location

    return (
        <nav style={location.pathname === "/home" ? {
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "#171717",
            // backgroundColor: "rgba(255,255,255,0.15)",
            padding: 10,
            // borderTopLeftRadius: "17px",
            // borderTopRightRadius: "17px",
            // boxShadow: "0 -5px 15px #FFFFFF30",
            boxSizing: "border-box" // Ensure padding does not overflow
        } : {
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "#171717",
            // backgroundColor: "rgba(255,255,255,0.15)",
            padding: 10,
            borderTopLeftRadius: "17px",
            borderTopRightRadius: "17px",
            boxShadow: "0 -5px 15px #FFFFFF30",
            boxSizing: "border-box"
        }}>
            <NavLink to="home" currentPath={location.pathname}>
                <MemoHomeIcon stroke={location.pathname === "/home" ? "white" : "#a6a6a6"}/>
                <div style={{fontSize: 16, fontWeight: 400}}>Home</div>
            </NavLink>
            <NavLink to="tasks" currentPath={location.pathname}>
                <MemoTasksIcon stroke={location.pathname === "/tasks" ? "white" : "#a6a6a6"}/>
                <div style={{fontSize: 16, fontWeight: 400}}>Tasks</div>
            </NavLink>
            <NavLink to="friends" currentPath={location.pathname}>
                <MemoFriendsIcon stroke={location.pathname === "/friends" ? "white" : "#a6a6a6"}/>
                <div style={{fontSize: 16, fontWeight: 400}}>Friends</div>
            </NavLink>
        </nav>
    );
}

function NavLink({to, currentPath, children}: { to: string; currentPath: string; children: React.ReactNode }) {
    const isActive = currentPath === `/${to}`;
    const activeStyle = isActive ? {color: "#FFFFFF", fontWeight: "bold"} : {color: "#a6a6a6"}; // Define active style

    return (
        <Link to={to} style={{
            textDecoration: "none",
            color: "inherit",
            padding: 10,
            // borderRadius: 17,
            // backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "",
            textAlign: "center"
        }}>
            <div style={activeStyle}>
                {children}
            </div>
        </Link>
    );
}
