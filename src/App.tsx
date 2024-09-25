import {Routes, Route, useLocation, NavLink} from "react-router-dom";
import classes from "./App.module.css";
import Home from "./components/home/Home";
import Tasks from "./components/tasks/Tasks";
import Friends from "./components/friends/Friends";
import MemoHomeIcon from "./components/svg/HomeIcon";
import MemoTasksIcon from "./components/svg/TasksIcon";
import MemoFriendsIcon from "./components/svg/FriendsIcon";
import {CSSProperties, useEffect, useState} from "react";
import {initMiniApp, initSwipeBehavior, initViewport} from "@telegram-apps/sdk-react";
import {ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.minimal.css";
import "react-toastify/dist/ReactToastify.css";
import MemoCloseIcon from "./components/svg/CloseIcon";
import {CountdownProvider} from "./context/CountdownProvider";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TotalPointsProvider} from "./context/TotalPointsProvider";
import ModalError from "./components/ui/modal/ModalError";
import useNetworkStatus from "./hooks/useNetworkStatus";
// import {setupMockTelegramEnv} from "../telegramEnvConfig";
import MemoGameIcon from "./components/svg/GameIcon";
import GameComponent from "./components/game/GameComponent";


// import {version as appVersion} from "../package.json";
//
// console.log(`App version: ${appVersion}`);
// setupMockTelegramEnv();

function App() {
    const [miniApp] = initMiniApp();
    const [viewport] = initViewport();
    const [swipeBehavior] = initSwipeBehavior();
    const network = useNetworkStatus();
    const [error, setError] = useState<{ isOpen: boolean, message: string }>({isOpen: false, message: ""});

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        refetchOnReconnect: true,
                        retry: false,
                        staleTime: 5 * 60 * 1000
                    }
                },
                queryCache: new QueryCache({
                    onError: (error) =>
                        setError({isOpen: true, message: error.message}),

                    onSuccess: () => {
                        setError((prevError) => {
                            if (prevError.isOpen) {
                                return {isOpen: false, message: ""};
                            }
                            return prevError;
                        });
                    }
                }),
                mutationCache: new MutationCache({
                    onError: (error) =>
                        setError({isOpen: true, message: error.message}),
                    onSuccess: () => {
                        setError((prevError) => {
                            if (prevError.isOpen) {
                                return {isOpen: false, message: ""};
                            }
                            return prevError;
                        });
                    }
                })
            })
    );

    useEffect(() => {
        miniApp.ready();
        const expand = async () => {
            const vp = await viewport;
            if (!vp.isExpanded) {
                vp.expand();
            }
            await swipeBehavior.disableVerticalSwipe();
        };
        // const localVersion = localStorage.getItem("appVersion");
        // if (localVersion && localVersion !== appVersion) {
        //     localStorage.setItem("appVersion", appVersion);
        //     window.location.reload();
        // }
        expand().then();
    }, []);

    return (
        <>
            <div className={classes.main}
                 style={{pointerEvents: error.isOpen || !network.isOnline ? "none" : "visible"}}>
                <QueryClientProvider client={queryClient}>
                    <TotalPointsProvider>
                        <CountdownProvider>
                            <Routes>
                                <Route index element={<Home/>}/>
                                <Route path={"/"} element={<Home/>}/>
                                <Route path="tasks" element={<Tasks/>}/>
                                <Route path="friends" element={<Friends/>}/>
                                <Route path="game" element={<GameComponent/>}/>
                            </Routes>
                        </CountdownProvider>
                    </TotalPointsProvider>
                </QueryClientProvider>
                <NavBar/>
            </div>
            <ToastContainer
                autoClose={3000}
                closeOnClick
                draggable
                // // draggableDirection={Slide}
                // transition={Slide} // Вы можете использовать Slide, Zoom, Flip или Bounce
                closeButton={props => (
                    <button onClick={props.closeToast} style={{width: 50, backgroundColor: "transparent"}}>
                        <MemoCloseIcon/>
                    </button>
                )}
            />
            <ModalError error={network.isOnline ? error : {isOpen: true, message: "Check your internet connection"}}
                        close={() => setError({isOpen: false, message: ""})}/>
        </>
    );
}

export default App;


function NavBar() {
    const location = useLocation();
    const activeStyle = (isActive: boolean): CSSProperties => {
        return isActive ? {
            width: 119.33,
            height: 40.39,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#000000",
            borderRadius: 20,
            backgroundColor: "#3193F4",
            // padding: "0px 20px",
            textDecoration: "none",
            gap: 8.9
        } : {display: "flex", justifyContent: "center", width: "22%"};
    };
    const textStyle = {fontSize: 14, fontWeight: 400, letterSpacing: -0.2};

    return (
        <nav className={classes.nav}>
            <NavLink to="/" style={({isActive}) => activeStyle(isActive)}>
                <MemoHomeIcon fill={location.pathname === "/" ? "#0E1012" : "#434343"}/>
                {location.pathname === "/" &&
                <span style={textStyle}>Home</span>}
            </NavLink>
            <NavLink to="tasks" style={({isActive}) => activeStyle(isActive)}>
                <MemoTasksIcon fill={location.pathname === "/tasks" ? "#0E1012" : "#434343"}/>
                {location.pathname === "/tasks" && <span style={textStyle}>Tasks</span>}
            </NavLink>
            <NavLink to="friends" style={({isActive}) => activeStyle(isActive)}>
                <MemoFriendsIcon fill={location.pathname === "/friends" ? "#0E1012" : "#434343"}/>
                {location.pathname === "/friends" && <span style={textStyle}>Friends</span>}
            </NavLink>
            <NavLink to="game" style={({isActive}) => activeStyle(isActive)}>
                <MemoGameIcon fill={location.pathname === "/game" ? "#0E1012" : "#434343"}/>
                {location.pathname === "/game" && <span style={textStyle}>Game</span>}
            </NavLink>
        </nav>
    );
}
