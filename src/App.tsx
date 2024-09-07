import {Routes, Route, useLocation, NavLink} from "react-router-dom";
import classes from "./App.module.css";
import Home from "./components/home/Home";
import Tasks from "./components/tasks/Tasks";
import Friends from "./components/friends/Friends";
import MemoHomeIcon from "./components/svg/HomeIcon";
import MemoTasksIcon from "./components/svg/TasksIcon";
import MemoFriendsIcon from "./components/svg/FriendsIcon";
import {useEffect} from "react";
import {initMiniApp, initSwipeBehavior, initViewport} from "@telegram-apps/sdk-react";
import {ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.minimal.css";
import "react-toastify/dist/ReactToastify.css";
import MemoCloseIcon from "./components/svg/CloseIcon";
import {CountdownProvider} from "./context/CountdownProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TotalPointsProvider} from "./context/TotalPointsProvider";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: true,
            retry: false,
            staleTime: 5 * 60 * 1000
        }
    }
});

function App() {
    const [miniApp] = initMiniApp();
    const [viewport] = initViewport();
    const [swipeBehavior] = initSwipeBehavior();
    //
    // const hapticFeedback = initHapticFeedback();
    useEffect(() => {
        miniApp.ready();
        const expand = async () => {
            const vp = await viewport;
            if (!vp.isExpanded) {
                vp.expand();
            }
            await swipeBehavior.disableVerticalSwipe();
        };
        expand().then();
    }, []);


    return (
        <>
            <div className={classes.main}>
                <QueryClientProvider client={queryClient}>
                    <TotalPointsProvider>
                        <CountdownProvider>
                            <Routes>
                                <Route index element={<Home/>}/>
                                {/*<Route path={"/"} element={<Home/>}/>*/}
                                <Route path={"tasks"} element={<Tasks/>}/>
                                <Route path={"friends"} element={<Friends/>}/>

                            </Routes>
                        </CountdownProvider>
                    </TotalPointsProvider>
                </QueryClientProvider>
                <NavBar/>
            </div>
            <ToastContainer
                // position="top-right"
                autoClose={3000}
                // hideProgressBar={false}
                closeOnClick
                // pauseOnHover
                draggable
                // // draggableDirection={Slide}
                // transition={Slide} // Вы можете использовать Slide, Zoom, Flip или Bounce
                closeButton={props => (
                    <button onClick={props.closeToast} style={{width: 50, backgroundColor: "transparent"}}>
                        <MemoCloseIcon/>
                    </button>
                )}
            />
        </>
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
        <nav className={classes.nav} style={{
            // borderTopLeftRadius: "17px",
            // borderTopRightRadius: "17px",
            // boxShadow: "0 -5px 15px #FFFFFF30"
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
