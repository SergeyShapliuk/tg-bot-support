import classes from "./Tasks.module.css";
import {useEffect, useState} from "react";
import MemoCheckIcon from "../svg/CheckIcon";
import {toast} from "react-toastify";
import {useFetchTask} from "../../hooks/useFetchTask";
import TasksIcons from "../svg/tasks_icons/TasksIcons";
import {useSetTask} from "../../hooks/useSetTask";
import {initInitData} from "@telegram-apps/sdk-react";
import {FadeLoader} from "react-spinners";
import {override} from "../home/Home";
import ym from "react-yandex-metrika";
import {useScreenSize} from "../../context/ScreenSizeProvider";
import {useTotalPoints} from "../../context/TotalPointsProvider";
import {Reorder} from "framer-motion";
import {TasksItemType} from "../../types/types";
import AdsGram from "../ads/AdsGram";


// const userTasks = {
//     data: [
//         {
//             id: 1,
//             title: "sdfsdfsdfaaa111",
//             amount: 100,
//             link: "",
//             icon: "tg",
//             stat: 1,
//             dt_create: ""
//         }, {
//             id: 2,
//             title: "sdfsdfsdf dfsdf fdsdgdfgdfg222",
//             amount: 100,
//             link: "",
//             icon: "tg",
//             stat: 1,
//             dt_create: ""
//         }, {
//             id: 3,
//             title: "sdfsdfsdf dsfsd33",
//             amount: 100,
//             link: "",
//             icon: "instagram",
//             stat: 1,
//             dt_create: ""
//         }, {
//             id: 4,
//             title: "sdfsdfsdf sdfsd4",
//             amount: 100,
//             link: "",
//             icon: "discord",
//             stat: 1,
//             dt_create: ""
//         }, {
//             id: 5,
//             title: "sdfsdfsdf sdfsd5",
//             amount: 100,
//             link: "",
//             icon: "discord",
//             stat: 1,
//             dt_create: ""
//         }, {
//             id: 6,
//             title: "sdfsdfsdf sdfsd6",
//             amount: 100,
//             link: "",
//             icon: "discord",
//             stat: 1,
//             dt_create: ""
//         }
//     ]
// };

function Tasks() {
    const initData = initInitData();
    const {setBadge} = useTotalPoints();
    const {screenSize} = useScreenSize();


    const {data: userTasks, refetch: getTasks} = useFetchTask(initData?.user?.id.toString() ?? "test");
    const {mutate, isSuccess} = useSetTask();
    const [list, setList] = useState<TasksItemType[]>();
    // const [linkId, setLinkId] = useState<string[]>([]);

    // console.log("task", userTasks);
    console.log("list", list);
    // console.log("dataMutate", data);
    const moveStat3ToEnd = (tasks: TasksItemType[]) => {
        if (!tasks) return tasks;

        // Фильтруем элементы с stat === 3
        const incompleteItems = tasks.filter(item => item.user_stat !== 3);
        const completedItems = tasks.filter(item => item.user_stat === 3);

        // Возвращаем массив с элементами, где stat !== 3 в начале, и stat === 3 в конце
        return [...incompleteItems, ...completedItems];
    };

    useEffect(() => {
        localStorage.setItem("sup_badge", JSON.stringify(userTasks?.data?.length));
        setBadge(0);
        // localStorage.setItem("sup_badge", JSON.stringify(1));
    }, []);
    useEffect(() => {
        // Перемещаем только если есть данные
        if (userTasks && userTasks.data?.length > 0) {
            const reorderedTasks = moveStat3ToEnd(userTasks.data);
            setList(reorderedTasks);
        }
    }, [userTasks]);
    // useEffect(() => {
    //         localStorage.clear()
    // if (userTasks?.data?.length) {
    //     setList(userTasks.data);
    //         const ids = localStorage.getItem("link_ids");
    //         if (ids) {
    //             setLinkId(JSON.parse(ids));
    //         }
    //         const claimIds = localStorage.getItem("link_claim");
    //         // console.log("ids", ids);
    //         // console.log("claimIds", claimIds);
    //         if (claimIds) {
    //             const claimList = JSON.parse(claimIds);
    //             const updatedList: TasksItemTypeWithClaim[] = userTasks.data.map(item => ({
    //                 ...item,
    //                 claim: claimList.includes(String(item.id))
    //             }));
    //             setList(updatedList);
    //         } else {
    //             const updatedList: TasksItemTypeWithClaim[] = userTasks.data.map(item => ({
    //                 ...item,
    //                 claim: false
    //             }));
    //             setList(updatedList);
    //         }
    //         updateListWithClaim();
    //         // console.log("ids", ids);
    //         //     if (claimIds) {
    //         //         const claimList = JSON.parse(claimIds);
    //         //         const claimedTasks: TasksItemType[] = [];
    //         //         const unclaimedTasks: TasksItemType[] = [];
    //         //
    //         //         // Separate claimed and unclaimed tasks without modifying claim
    //         //         userTasks?.data?.forEach(item => {
    //         //             if (claimList.includes(item.id)) {
    //         //                 claimedTasks.push(item); // No change to claim property
    //         //             } else {
    //         //                 unclaimedTasks.push(item);
    //         //             }
    //         //         });
    //         //
    //         //         // Add claimed tasks at the end of the list
    //         //         setList([...unclaimedTasks, ...claimedTasks]);
    //         //     } else {
    //         //         // If no claimList, just set the tasks normally
    //         //         setList(userTasks?.data);
    //         //     }
    //         updateListWithClaim();
    //         //     // console.log("ids", ids);
    //
    //
    // }
    // }, [userTasks]);

    useEffect(() => {
        if (isSuccess) {
            getTasks().then();
            // if (data?.data?.stat === 3) {
            //     refetch().then();
            // }
        }
    }, [isSuccess]);


    const onLinkHandleStart = (tg_id: string, task_id: number, stat: number) => {
        mutate({tg_id, task_id, stat});
        // if (linkId.includes(String(task_id))) return;
        // setLinkId(prevState => {
        //     const updatedLinkIds = [...prevState, String(task_id)];
        //     localStorage.setItem("link_ids", JSON.stringify(updatedLinkIds));
        //     return updatedLinkIds;
        // });
    };

    // const updateListWithClaim = () => {
    //     setList(prevList => {
    //         const validList = prevList || [];
    //
    //         // Сначала разделяем элементы на те, у которых claim = true, и те, у которых claim = false
    //         const claimedItems = validList.filter(item => item.claim);
    //         const unclaimedItems = validList.filter(item => !item.claim);
    //
    //         // Объединяем их так, чтобы непроверенные элементы шли перед проверенными
    //         return [...unclaimedItems, ...claimedItems];
    //     });
    // };

    const onLinkHandleClaim = async (tg_id: string, task_id: number, stat: number, amount: number) => {
        await mutate({tg_id, task_id, stat});
        // setLinkId(prevState => prevState.filter(itemId => Number(itemId) !== task_id));
        // const claim = localStorage.getItem("link_claim");
        //
        // let claimArray: string[] = [];
        //
        // if (claim) {
        //     claimArray = JSON.parse(claim);
        //     if (!Array.isArray(claimArray)) {
        //         claimArray = [];
        //     }
        // }
        // if (!claimArray.includes(String(task_id))) {
        //     claimArray.push(String(task_id));
        // }
        // const updatedList: TasksItemTypeWithClaim[] = userTasks?.data ? userTasks.data.map(item => ({
        //     ...item,
        //     claim: claimArray.includes(String(item.id))
        // })) : [];
        // setList(updatedList);
        // localStorage.setItem("link_claim", JSON.stringify(claimArray));
        // updateListWithClaim();
        toast.success(`You got a ${amount} points`, {
            position: "top-right",
            hideProgressBar: true,
            icon: <MemoCheckIcon/>
        });
        ym("hit", "/tasks");
        ym("reachGoal", "task_claim");
        // console.log("claim", localStorage.getItem("link_claim"));
    };
    // const notify = () => {
    //     toast("Default Notification !");
    //
    //     toast.success("Success Notification !", {
    //         position: "top-center"
    //     });
    //
    //     toast.error("Error Notification !", {
    //         position: "top-left"
    //     });
    //
    //     toast.warn("Warning Notification !", {
    //         position: "bottom-left"
    //     });
    //
    //     toast.info("Info Notification !", {
    //         position: "bottom-center"
    //     });
    //
    //     toast("Custom Style Notification with css class!", {
    //         position: "bottom-right",
    //         className: 'foo-bar'
    //     });
    // };
    // console.log("LinkId", list);
    if (!list?.length) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override}/>;

    return (
        <div className={classes.main}>
            <AdsGram blockId="4304"/>
            <div style={{
                position: "relative",
                fontSize: "60px",
                fontWeight: "600",
                letterSpacing: -0.3,
                textAlign: "center"
            }}>TASKS
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: 27,
                    gap: 0,
                    opacity: 0.27,
                    rotate: "-15deg",
                    background: "radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(100, 115, 131, 0) 100%)", top: 30
                }}/>
            </div>
            <div style={{
                fontSize: "15px",
                fontWeight: "500",
                letterSpacing: -0.4,
                textAlign: "center"
                // paddingRight: "16px",
                // paddingLeft: "16px",
            }}>Just Support
                Durov community, be
                aware of new and following updates, find your tribe in SD
            </div>
            {/*<div style={{*/}
            {/*    height: "100%",*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "column",*/}
            {/*    overflowX: 'hidden',*/}
            {/*    overflow: "auto",*/}
            {/*    // paddingBottom:10,*/}
            {/*    gap: 7*/}
            {/*}}>*/}
            <Reorder.Group axis="y" values={list} onReorder={setList} style={{
                // width:'100%',
                height: screenSize.height - 270,
                display: "flex",
                flexDirection: "column",
                marginTop: "25px",
                padding: "2px",
                overflow: "auto",
                gap: 7
            }}>
                {list?.map(item => (
                    <Reorder.Item key={item.id}
                        // as={"div"}
                                  drag={false}
                                  layout
                                  value={item}
                        // style={{
                        //     backgroundColor: item.isCompleted ? "#d3ffd3" : "red", // Задаем цвет фона при перетаскивании
                        //     // opacity: 0.3, // Устанавливаем opacity
                        // }}
                        //           whileDrag={{
                        //               opacity: 0.8 // Задайте уровень прозрачности при перетаскивании
                        //           }}
                                  className="popup">
                        <div style={{
                            position: "relative",
                            width: "100%",
                            height: 37,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 999
                        }}>
                            <div style={{flex: 1, display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    {/*<img src={item.icon} alt={`Icon ${item.name}`}/>*/}
                                    {item.icon ? <TasksIcons name={item.icon}/> : item.img ?
                                        <img src={item.img} style={{width: 35, height: 35, borderRadius: 50}}/> : null}
                                    <p style={{
                                        flex: 1,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        fontSize: screenSize.width >= 370 ? "15px" : screenSize.width * 0.038,
                                        letterSpacing: -0.4
                                    }}>{item.title}</p>
                                </div>
                            </div>
                            {item.user_stat === 2 ?
                                <button
                                    onClick={() => onLinkHandleClaim(String(initData?.user?.id) ?? "test", item.id, 3, item.amount)}
                                    style={{
                                        width: 75,
                                        height: 30,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 15,
                                        color: "#3193F4",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        lineHeight: "16px",
                                        backgroundColor: "#FFFFFF"
                                    }}>Claim</button> :
                                item.user_stat <= 1 &&
                                <button style={{
                                    width: 75,
                                    height: 30,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 15,
                                    color: "#fff",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "16px",
                                    letterSpacing: -0.1,
                                    backgroundColor: "rgba(249,249,249,0.31)"
                                }}>
                                    <a href={item.link}
                                       onClick={() => onLinkHandleStart(String(initData?.user?.id) ?? "test", item.id, 2)}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       style={{color: "white", textDecoration: "none"}}>Start</a>
                                </button>
                            }
                            {item.user_stat === 3 &&
                            <div style={{
                                width: 75,
                                height: 30,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 15,
                                border: "1px solid #86A9C5",
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: "400",
                                lineHeight: "16px"
                                // backgroundColor: "rgba(249,249,249,0.31)"
                            }}>
                                <MemoCheckIcon/>
                            </div>}
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            {/*</div>*/}
        </div>
    )
        ;
}

export default Tasks;
