import {Routes, Route, useLocation, NavLink} from "react-router-dom";
import classes from "./App.module.css";
import Home from "./components/home/Home";
import Tasks from "./components/tasks/Tasks";
import Friends from "./components/friends/Friends";
import MemoHomeIcon from "./components/svg/HomeIcon";
import MemoTasksIcon from "./components/svg/TasksIcon";
import MemoFriendsIcon from "./components/svg/FriendsIcon";
import {useEffect} from "react";
import {initViewport} from "@telegram-apps/sdk";


function App() {
    const [viewport] = initViewport();
    // // const {tg} = useTelegram();
    // const initDatas = initInitData();
    // console.log('innit',initDatas)
    useEffect(() => {
        // tg.ready();
        const expand = async () => {
            const vp = await viewport;
            if (!vp.isExpanded) {
                vp.expand();
            }
        };
        expand().then();
    }, []);


    return (
        <div className={classes.main}>
            <Routes>
                <Route index element={<Home/>}/>
                {/*<Route path={"/"} element={<Home/>}/>*/}
                <Route path={"tasks"} element={<Tasks/>}/>
                <Route path={"friends"} element={<Friends/>}/>

            </Routes>
            <NavBar/>
        </div>
    );
}

export default App;


function NavBar() {
    const location = useLocation();
    const activeStyle = (isActive: boolean): React.CSSProperties => {
        return {
            textDecoration: "none",
            textAlign: "center",
            color: isActive ? "#FFFFFF" : "#a6a6a6"
        };
    };
    return (
        <nav className={classes.nav} style={location.pathname === "/" ? {} : {
            borderTopLeftRadius: "17px",
            borderTopRightRadius: "17px",
            boxShadow: "0 -5px 15px #FFFFFF30"
        }}>
            <NavLink to="/" style={({isActive}) => activeStyle(isActive)}>
                <MemoHomeIcon stroke={location.pathname === "/" ? "white" : "#a6a6a6"}/>
                <div style={{fontSize: 14, fontWeight: 400}}>Home</div>
            </NavLink>
            <NavLink to="tasks" style={({isActive}) => activeStyle(isActive)}>
                <MemoTasksIcon stroke={location.pathname === "/tasks" ? "white" : "#a6a6a6"}/>
                <div style={{fontSize: 14, fontWeight: 400}}>Tasks</div>
            </NavLink>
            <NavLink to="friends" style={({isActive}) => activeStyle(isActive)}>
                <MemoFriendsIcon stroke={location.pathname === "/friends" ? "white" : "#a6a6a6"}/>
                <div style={{fontSize: 14, fontWeight: 400}}>Friends</div>
            </NavLink>
        </nav>
    );
}
