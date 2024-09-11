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
// import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';
//
// const initDataRaw = new URLSearchParams([
//     ['user', JSON.stringify({
//         id: 11111111113,
//         first_name: 'Andrew',
//         last_name: 'Rogue',
//         username: 'rogue1',
//         language_code: 'en',
//         is_premium: true,
//         allows_write_to_pm: true,
//     })],
//     ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
//     ['auth_date', '1716922846'],
//     ['start_param', 'debug'],
//     ['chat_type', 'sender'],
//     ['chat_instance', '8428209589180549439'],
// ]).toString();
//
// mockTelegramEnv({
//     themeParams: {
//         accentTextColor: '#6ab2f2',
//         bgColor: '#17212b',
//         buttonColor: '#5288c1',
//         buttonTextColor: '#ffffff',
//         destructiveTextColor: '#ec3942',
//         headerBgColor: '#17212b',
//         hintColor: '#708499',
//         linkColor: '#6ab3f3',
//         secondaryBgColor: '#232e3c',
//         sectionBgColor: '#17212b',
//         sectionHeaderTextColor: '#6ab3f3',
//         subtitleTextColor: '#708499',
//         textColor: '#f5f5f5',
//     },
//     initData: parseInitData(initDataRaw),
//     initDataRaw,
//     version: '7.2',
//     platform: 'tdesktop',
// });
// import {version as appVersion} from "../package.json";
//
// console.log(`App version: ${appVersion}`);

function App() {
    localStorage.clear()
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
        // const localVersion = localStorage.getItem("appVersion");
        // if (localVersion && localVersion !== appVersion) {
        //     localStorage.setItem("appVersion", appVersion);
        //     window.location.reload();
        // }
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
