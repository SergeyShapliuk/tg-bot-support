import classes from "./Tasks.module.css";
// import MemoInstagramIcon from "../svg/InstagramIcon";
import MemoTelegramIcon from "../svg/TelegramIcon";
import {useEffect, useState} from "react";
import {ListTasksType} from "../../types/types";
import MemoCheckIcon from "../svg/CheckIcon";
import {toast} from "react-toastify";
// import MemoDiscordIcon from "../svg/DiscordIcon";


const listTasks: ListTasksType[] = [
    // {name: "instagram", icon: <MemoInstagramIcon/>, title: "Follow +100sd", link: ""},
    {
        id: "1",
        name: "telegram",
        icon: <MemoTelegramIcon/>,
        title: "Follow +100sd",
        points: "100",
        link: "https://t.me/sup_durov",
        claim: false
    }
    // {name: "discord", icon: <MemoDiscordIcon/>, title: "Follow +100sd", link: ""}
];

function Tasks() {
    const [list, setList] = useState<ListTasksType[]>(listTasks);
    const [linkId, setLinkId] = useState<string[]>([]);

    useEffect(() => {
        const ids = localStorage.getItem("link_ids");
        if (ids) {
            setLinkId(JSON.parse(ids));
        }
        const claimIds = localStorage.getItem("link_claim");

        if (claimIds) {
            const claimList = JSON.parse(claimIds);
            const updatedList = listTasks.map(item => {
                if (claimList.includes(item.id)) {
                    return {...item, claim: true};
                }
                return item;
            });
            setList(updatedList);
        }
        updateListWithClaim();
        console.log("ids", ids);
    }, []);

    const onLinkHandleStart = (item_id: string) => {
        if (linkId.includes(item_id)) return;
        setLinkId(prevState => {
            const updatedLinkIds = [...prevState, item_id];
            localStorage.setItem("link_ids", JSON.stringify(updatedLinkIds));
            return updatedLinkIds;
        });
    };

    const updateListWithClaim = () => {
        setList(prevList => {
            // Сначала разделяем элементы на те, у которых claim = true, и те, у которых claim = false
            const claimedItems = prevList.filter(item => item.claim);
            const unclaimedItems = prevList.filter(item => !item.claim);

            // Объединяем их так, чтобы непроверенные элементы шли перед проверенными
            return [...unclaimedItems, ...claimedItems];
        });
    };

    const onLinkHandleClaim = (item_id: string, points: string) => {
        setLinkId(prevState => prevState.filter(itemId => itemId !== item_id));
        const claim = localStorage.getItem("link_claim");

        let claimArray: string[] = [];

        if (claim) {
            claimArray = JSON.parse(claim);
            if (!Array.isArray(claimArray)) {
                claimArray = [];
            }
        }
        if (!claimArray.includes(item_id)) {
            claimArray.push(item_id);
        }
        const updatedList = listTasks.map(item => {
            if (claimArray.includes(item.id)) {
                return {...item, claim: true};
            }
            return item;
        });
        setList(updatedList);
        localStorage.setItem("link_claim", JSON.stringify(claimArray));
        updateListWithClaim();
        toast.success(`You got a ${points} SD points`, {
            position: "top-right",
            hideProgressBar: true,
            icon: <MemoCheckIcon/>
        });
        console.log("claim", localStorage.getItem("link_claim"));
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
    console.log("LinkId", list);
    return (
        <div className={classes.main}>
            <div style={{fontSize: 31, fontWeight: 600}}>Support Durov socials</div>
            <div style={{color: "#a6a696", fontSize: 16, fontWeight: 500, paddingTop: "10px"}}>Join Support Durov
                community, be aware of new
                and following updates, find your tribe in Support Durov
            </div>
            {list.map(item => (
                <>
                    <div key={item.id}
                         style={{
                             position: "relative",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                             textAlign: "start",
                             paddingBlock: "10px",
                             opacity: item.claim ? 0.7 : 1
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
                                {item.icon}
                                <p style={{paddingLeft: 20, fontSize: 19}}>{item.title}</p>
                            </div>

                            {!item.claim && linkId.length && linkId.includes(item.id) ?
                                <button onClick={() => onLinkHandleClaim(item.id, item.points)} style={{
                                    width: 70,
                                    height: 45,
                                    color: "black",
                                    backgroundColor: "rgb(49,125,148)",
                                    fontSize: 16,
                                    borderRadius: 12
                                }}>Claim</button> :
                                !item.claim && <button style={{
                                    width: 70,
                                    height: 45,
                                    backgroundColor: "#282828",
                                    fontSize: 16,
                                    borderRadius: 12
                                }}>
                                    <a href={item.link} onClick={() => onLinkHandleStart(item.id)}
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
