import classes from "./Tasks.module.css";
// import MemoInstagramIcon from "../svg/InstagramIcon";
import {useEffect, useState} from "react";
import {TasksItemType} from "../../types/types";
import MemoCheckIcon from "../svg/CheckIcon";
import {toast} from "react-toastify";
import {useFetchTask} from "../../hooks/useFetchTask";
import TasksIcons from "../svg/tasks_icons/TasksIcons";
import {useSetTask} from "../../hooks/useSetTask";
import {initInitData} from "@telegram-apps/sdk-react";


type TasksItemTypeWithClaim = TasksItemType & {
    claim: boolean;
};

// const userTasks = [
//     {
//         id: 1,
//         title: "sdfsdfsdf",
//         amount: 100,
//         link: "",
//         icon: "tg",
//         stat: 1,
//         dt_create: ""
//     }, {
//         id: 2,
//         title: "sdfsdfsdf dfsdf fdsdgdfgdfg",
//         amount: 100,
//         link: "",
//         icon: "tg",
//         stat: 1,
//         dt_create: ""
//     }, {
//         id: 3,
//         title: "sdfsdfsdf dsfsd",
//         amount: 100,
//         link: "",
//         icon: "instagram",
//         stat: 1,
//         dt_create: ""
//     }, {
//         id: 4,
//         title: "sdfsdfsdf sdfsd",
//         amount: 100,
//         link: "",
//         icon: "discord",
//         stat: 1,
//         dt_create: ""
//     }
// ];

function Tasks() {
    const initData = initInitData();
    // const initData = null;
    const {data: userTasks} = useFetchTask(initData?.user?.id.toString() ?? "test");
    const {mutate, data} = useSetTask();
    const [list, setList] = useState<TasksItemTypeWithClaim[] | undefined>([]);
    const [linkId, setLinkId] = useState<string[]>([]);

    console.log("task", userTasks);
    console.log("list", list);
    console.log("dataMutate", data);

    useEffect(() => {
        // localStorage.clear()
        if (userTasks?.data?.length) {
            const ids = localStorage.getItem("link_ids");
            if (ids) {
                setLinkId(JSON.parse(ids));
            }
            const claimIds = localStorage.getItem("link_claim");
            // console.log("ids", ids);
            // console.log("claimIds", claimIds);
            if (claimIds) {
                const claimList = JSON.parse(claimIds);
                const updatedList: TasksItemTypeWithClaim[] = userTasks.data.map(item => ({
                    ...item,
                    claim: claimList.includes(String(item.id))
                }));
                setList(updatedList);
            } else {
                const updatedList: TasksItemTypeWithClaim[] = userTasks.data.map(item => ({
                    ...item,
                    claim: false
                }));
                setList(updatedList);
            }
            updateListWithClaim();
            // console.log("ids", ids);
            //     if (claimIds) {
            //         const claimList = JSON.parse(claimIds);
            //         const claimedTasks: TasksItemType[] = [];
            //         const unclaimedTasks: TasksItemType[] = [];
            //
            //         // Separate claimed and unclaimed tasks without modifying claim
            //         userTasks?.data?.forEach(item => {
            //             if (claimList.includes(item.id)) {
            //                 claimedTasks.push(item); // No change to claim property
            //             } else {
            //                 unclaimedTasks.push(item);
            //             }
            //         });
            //
            //         // Add claimed tasks at the end of the list
            //         setList([...unclaimedTasks, ...claimedTasks]);
            //     } else {
            //         // If no claimList, just set the tasks normally
            //         setList(userTasks?.data);
            //     }
            updateListWithClaim();
            //     // console.log("ids", ids);


        }
    }, [userTasks]);


    const onLinkHandleStart = (tg_id: string, task_id: number, stat: number) => {
        mutate({tg_id, task_id, stat});
        if (linkId.includes(String(task_id))) return;
        setLinkId(prevState => {
            const updatedLinkIds = [...prevState, String(task_id)];
            localStorage.setItem("link_ids", JSON.stringify(updatedLinkIds));
            return updatedLinkIds;
        });
    };

    const updateListWithClaim = () => {
        setList(prevList => {
            const validList = prevList || [];

            // Сначала разделяем элементы на те, у которых claim = true, и те, у которых claim = false
            const claimedItems = validList.filter(item => item.claim);
            const unclaimedItems = validList.filter(item => !item.claim);

            // Объединяем их так, чтобы непроверенные элементы шли перед проверенными
            return [...unclaimedItems, ...claimedItems];
        });
    };

    const onLinkHandleClaim = (tg_id: string, task_id: number, stat: number, amount: number) => {
        mutate({tg_id, task_id, stat});
        setLinkId(prevState => prevState.filter(itemId => Number(itemId) !== task_id));
        const claim = localStorage.getItem("link_claim");

        let claimArray: string[] = [];

        if (claim) {
            claimArray = JSON.parse(claim);
            if (!Array.isArray(claimArray)) {
                claimArray = [];
            }
        }
        if (!claimArray.includes(String(task_id))) {
            claimArray.push(String(task_id));
        }
        const updatedList: TasksItemTypeWithClaim[] = userTasks?.data ? userTasks.data.map(item => ({
            ...item,
            claim: claimArray.includes(String(item.id))
        })) : [];
        setList(updatedList);
        localStorage.setItem("link_claim", JSON.stringify(claimArray));
        updateListWithClaim();
        toast.success(`You got a ${amount} points`, {
            position: "top-right",
            hideProgressBar: true,
            icon: <MemoCheckIcon/>
        });
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
    return (
        <div className={classes.main}>
            <div style={{fontSize: 31, fontWeight: 600}}>Support Durov socials</div>
            <div style={{color: "#a6a696", fontSize: 16, fontWeight: 500, paddingTop: "10px"}}>Join Support Durov
                community, be aware of new
                and following updates, find your tribe in Support Durov
            </div>
            {list?.map(item => (
                <>
                    <div key={item.id}
                         style={{
                             position: "relative",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                             textAlign: "start",
                             paddingBlock: "10px",
                             opacity: item.stat > 1 ? 0.7 : 1
                         }}>
                        <div style={{
                            // flex: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"

                        }}>
                            <div style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                {/*<img src={item.icon} alt={`Icon ${item.name}`}/>*/}
                                <TasksIcons name={item.icon}/>
                                <p style={{paddingLeft: 20, fontSize: 19}}>{item.title}</p>
                            </div>

                            {!item.claim && linkId.length && linkId.includes(String(item.id)) ?
                                <button
                                    onClick={() => onLinkHandleClaim(String(initData?.user?.id) ?? "test", item.id, 3, item.amount)}
                                    style={{
                                        width: 70,
                                        height: 45,
                                        color: "black",
                                        backgroundColor: "rgb(49,125,148)",
                                        fontSize: 16,
                                        borderRadius: 12
                                    }}>Claim</button> :
                                !item.claim &&
                                <button style={{
                                    width: 70,
                                    height: 45,
                                    backgroundColor: "#282828",
                                    fontSize: 16,
                                    borderRadius: 12
                                }}>
                                    <a href={item.link}
                                       onClick={() => onLinkHandleStart(String(initData?.user?.id) ?? "test", item.id, 2)}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       style={{color: "white", textDecoration: "none"}}>Start</a>
                                </button>
                            }
                            {item.claim &&
                            <div style={{width: 70, textAlign: "center"}}>
                                <MemoCheckIcon/>
                            </div>}
                        </div>
                    </div>
                    <div style={{height: 1, backgroundColor: "#282828", marginRight: 10, marginLeft: 10}}/>
                </>
            ))

            }
            {/*<ToastContainer/>*/}
        </div>
    );
}

export default Tasks;
