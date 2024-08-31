import "./App.css";
import home from "./assets/home.svg";
import tasks from "./assets/tasks.svg";
import invite from "./assets/invite-frens.svg";
import {Routes, Route, Link, useLocation} from "react-router-dom";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Friends from "./components/Friends";
import {useEffect} from "react";
// import {useTelegram} from "./hooks/useTelegram";
import {initInitData} from "@telegram-apps/sdk";


function App() {
    // const {tg} = useTelegram();
    const initDatas = initInitData();
    console.log('innit',initDatas)
    useEffect(() => {
        // tg.ready();
        setTimeout(() => {
            // console.log("tg:", tg);
        }, 500);
    }, []);


    return (
        <div style={{position: "relative", width: "100vw", height: "100vh"}}>
            {JSON.stringify(initDatas)}
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
        <nav style={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "#171717",
            padding: 10,
            width: "100vw",
            boxSizing: "border-box" // Ensure padding does not overflow
        }}>
            <NavLink to="home" currentPath={location.pathname}>
                <img src={home} alt="Logo home"/>
                <div style={{fontSize: 19, fontWeight: 400}}>Home</div>
            </NavLink>
            <NavLink to="tasks" currentPath={location.pathname}>
                <img src={tasks} alt="Logo tasks"/>
                <div style={{fontSize: 19, fontWeight: 400}}>Tasks</div>
            </NavLink>
            <NavLink to="friends" currentPath={location.pathname}>
                <img src={invite} alt="Logo friends"/>
                <div style={{fontSize: 19, fontWeight: 400}}>Friends</div>
            </NavLink>
        </nav>
    );
}

function NavLink({to, currentPath, children}: { to: string; currentPath: string; children: React.ReactNode }) {
    const isActive = currentPath === `/${to}`;
    const activeStyle = isActive ? {color: "#FFFFFF", fontWeight: "bold"} : {color: "#FFFFFF"}; // Define active style

    return (
        <Link to={to} style={{
            textDecoration: "none",
            color: "inherit",
            padding: 10,
            borderRadius: 17,
            backgroundColor: isActive ? "rgba(255,255,255,0.05)" : ""
        }}>
            <div style={activeStyle}>
                {children}
            </div>
        </Link>
    );
}
