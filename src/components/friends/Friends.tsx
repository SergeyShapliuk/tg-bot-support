import {useState} from "react";
import classes from "./Friends.module.css";
import MemoInviteIcon from "../svg/InviteFriends";
import {Sheet} from "react-modal-sheet";
import MemoCloseIcon from "../svg/CloseIcon";
import {QRCodeSVG} from "qrcode.react";


type ShareState = "pending" | "success" | "error";
type FriendsState = { id: string, name: string, referral: string, points: string };
// const onError: (error?: unknown) => void = null;


const listInvite = [
    {title: "Share your invitation link", subTitle: "Get a  play pass for each friends"},
    {title: "Your friends join Support Durov", subTitle: "And start farming points"},
    {title: "Score 20% from buddies", subTitle: ""}
];

const listInviteFrens: FriendsState[] = [
    {id: "1", name: "Alex", referral: "0", points: "2323"},
    {id: "2", name: "eflexe", referral: "2", points: "2323"},
    {id: "3", name: "Fexw", referral: "7", points: "2323"},
    {id: "4", name: "Fexw", referral: "7", points: "2323"},
    {id: "5", name: "Fexw", referral: "7", points: "2323"},
    {id: "6", name: "Fexw", referral: "7", points: "2323"},
    {id: "7", name: "Nlexe", referral: "0", points: "2323"}
];

function Friends() {
    // const initData = initInitData();
    // const initData = "test";
    const [isOpen, setOpen] = useState<boolean>(false);
    const [state, setState] = useState<ShareState>("pending");
    // const [friends, setFriends] = useState<FriendsState[]>(listInviteFrens);


    const copyClicked = async () => {
        try {
            await navigator.clipboard.writeText("https://t.me/supDurovBot?start");
            setState("success");
        } catch (err) {
            // onError && onError(err);
            setState("error");
        }
    };
    const getButtonText = (state: ShareState) => {
        switch (state) {
            case "success":
                return "Link copied";
            case "pending":
            default:
                return "Copy link";
        }
    };
    return (
        <>
            <div className={classes.main}>
                <MemoInviteIcon/>
                <div className={classes.title}>Invite friends. Earn a points.</div>
                <div style={{height: "100%", paddingBottom: 160}}>
                    {listInviteFrens.length ?
                        <>
                            <div style={{color: "rgba(255,255,255,0.7)"}}>Score 20% from buddies +2.5% from their
                                referrals
                            </div>
                            <div className={classes.listFriends}>{`${listInviteFrens.length} friends`}
                                {listInviteFrens.map(friend => (
                                    <div className={classes.itemFriends} key={friend.id}>
                                        <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                            <div style={{
                                                width: 30,
                                                height: 30,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "50%",
                                                fontWeight: 500,
                                                color: "black",
                                                backgroundColor: "#34c759"
                                            }}>{friend.name.slice(0, 1)}</div>
                                            <div>
                                                <div>{friend.name}</div>
                                                <div style={{
                                                    color: "rgba(255,255,255,0.7)",
                                                    fontSize: 12,
                                                    textAlign: "start"
                                                }}>{friend.referral === "0" ? "0" : `+ ${friend.referral}`}</div>
                                            </div>
                                        </div>
                                        <div>{`${friend.points} SD`}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        : (
                            <>
                                <div className={classes.subTitle}>How it works</div>
                                <div className={classes.description}>
                                    {listInvite.map((item, index) => (
                                        <div key={index} className={classes.item}>
                                            {/*<div className={classes.circleContainer}>*/}
                                            {/*<div className={classes.circle}/>*/}
                                            {/*{index < listInvite.length - 1 && <div className={classes.line}/>}*/}
                                            {/*{item.title}*/}
                                            <div style={{paddingLeft: 50}}>
                                                <div style={{fontSize: 19}}>{item.title}</div>
                                                <div style={{fontSize: 16}}>{item.subTitle}</div>
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>)}
                </div>
                <div className={classes.inviteButtonContainer}>
                    <button onClick={() => setOpen(true)} className={classes.inviteButton}>Invite a friends</button>
                </div>
            </div>
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)} disableDrag>
                <Sheet.Container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1c1c1e"
                }}>
                    {/*<Sheet.Header disableDrag/>*/}
                    <div style={{padding: 20, fontSize: 24, fontWeight: 500}}>Invite a friends</div>
                    <div onClick={() => {
                        setOpen(false);
                        setState("pending");
                    }}>
                        <MemoCloseIcon style={{position: "absolute", top: 20, right: 20}}/>
                    </div>
                    <Sheet.Scroller style={{textAlign: "center", padding: "1em"}}>
                        <QRCodeSVG value={`https://t.me/supDurovBot?start`}
                                   title={"QR code"}
                                   size={300}
                                   bgColor={"#ffffff"}
                                   fgColor={"#000000"}
                                   level={"L"}
                                   marginSize={1}
                                   imageSettings={{
                                       src: "https://coin.golden-media.by/wp-content/uploads/2023/04/2322.png",
                                       x: undefined,
                                       y: undefined,
                                       height: 30,
                                       width: 50,
                                       opacity: 1,
                                       excavate: true
                                   }}
                                   style={{paddingTop: 50}}/>
                        <a className={classes.shareButton}
                           href={"https://t.me/share/url?url=https://wallpapers.com/images/hd/lightning-letter-d-7jyf54ms4gj6aibd.jpg"}
                           target="_blank"
                           rel="noopener noreferrer">Send
                        </a>
                        <button onClick={copyClicked} style={{
                            height: 50,
                            color: "#fff",
                            fontSize: 19,
                            margin: "25px 0 25px 0",
                            backgroundColor: "#282828"
                        }}>{getButtonText(state)}</button>
                        {/*<button onClick={() => setOpen(false)}*/}
                        {/*        style={{*/}
                        {/*            height: 50,*/}
                        {/*            color: "#fff",*/}
                        {/*            fontSize: 19,*/}
                        {/*            marginTop: 25,*/}
                        {/*            backgroundColor: "transparent"*/}
                        {/*        }}>Close*/}
                        {/*</button>*/}
                    </Sheet.Scroller>
                </Sheet.Container>
                <Sheet.Backdrop style={{backgroundColor: "#00000099"}}/>
            </Sheet>
        </>
    );
}

export default Friends;
