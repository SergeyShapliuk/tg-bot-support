import {useState} from "react";
import classes from "./Friends.module.css";
import MemoInviteIcon from "../svg/InviteFriends";
import {Sheet} from "react-modal-sheet";
import MemoCloseIcon from "../svg/CloseIcon";
import {useFetchRef} from "../../hooks/useFetchRef";
import {initHapticFeedback, initInitData} from "@telegram-apps/sdk-react";
import {useFetchReferrals} from "../../hooks/useFetchReferrals";
import MemoUsersIcon from "../svg/UsersIcon";
import {toast} from "react-toastify";
import MemoCheckIcon from "../svg/CheckIcon";


type ShareState = "pending" | "success" | "error";
// type FriendsState = { customer: string, name: string, referal_count: string, amount: string };
// const onError: (error?: unknown) => void = null;


const listInvite = [
    {title: "Share your invitation link", subTitle: "Get a  play pass for each friends"},
    {title: "Your friends join Support Durov", subTitle: "And start farming points"},
    {title: "Score 20% from buddies", subTitle: ""}
];

// const listInviteFrens: FriendsState[] = [
//     {customer: "1", name: "Alex", referal_count: "0", amount: "2323"},
//     {customer: "2", name: "eflexe", referal_count: "2", amount: "2323"},
//     {customer: "3", name: "Fexw", referal_count: "7", amount: "2323"},
//     {customer: "4", name: "Fexw", referal_count: "7", amount: "2323"},
//     {customer: "5", name: "Fexw", referal_count: "7", amount: "2323"},
//     {customer: "6", name: "Fexw", referal_count: "7", amount: "2323"},
//     {customer: "7", name: "Nlexe", referal_count: "0", amount: "2323"}
// ];

function Friends() {
    const initData = initInitData();
    const hapticFeedback = initHapticFeedback();


    const {data: userRef} = useFetchRef(initData?.user?.id.toString() ?? "test_user3");
    const {data: referrals} = useFetchReferrals(initData?.user?.id.toString() ?? "test_user3");

    const [isOpen, setOpen] = useState<boolean>(false);
    const [state, setState] = useState<ShareState>("pending");
    // const [friends, setFriends] = useState<FriendsState[]>(listInviteFrens);

    // console.log("userRef", userRef);
    // console.log("referrals", referrals);

    // useEffect(() => {
    //     const canvas = document.querySelector("qrcode") as HTMLCanvasElement;
    //     if (!canvas) throw new Error("<canvas> not found in the DOM");
    //     const pngUrl = canvas
    //         .toDataURL("image/png")
    //         .replace("image/png", "image/octet-stream");
    //     const downloadLink = document.createElement("a");
    //     downloadLink.href = pngUrl;
    //     downloadLink.download = "QRCode.png";
    //     setLink(downloadLink)
    //     // document.body.appendChild(downloadLink);
    //     // downloadLink.click();
    //     // document.body.removeChild(downloadLink);
    // }, []);
    // const handleSendQRCode = () => {
    // const canvas = document.getElementById("qrcode");
    // if (canvas) {
    //     canvas.toBlob((blob) => {
    //         const file = new File([blob], 'qr-code.png', { type: 'image/png' });
    //
    //         if (navigator.share) {
    //             navigator.share({
    //                 title: 'QR Code',
    //                 text: 'Here is your QR code',
    //                 files: [file],  // QR-код файл для отправки
    //             })
    //                 .then(() => console.log('Successful share'))
    //                 .catch((error) => console.log('Error sharing', error));
    //         } else {
    //             alert('Web Share API не поддерживается на вашем устройстве.');
    //         }
    //     });
    // }


    // Открытие ссылки для отправки QR-кода

    // };

    const copyClicked = async () => {
        try {
            await navigator.clipboard.writeText(`https://t.me/supDurovBot?start=ref_${userRef?.codes[0]?.code} \n Join me on SupportDurov! Use my invite link to join us. 🚀`);
            setState("success");
            setOpen(false);
            hapticFeedback.notificationOccurred("success");
            toast.success("Referral link is copied", {
                position: "top-right",
                hideProgressBar: true,
                icon: <MemoCheckIcon/>
            });
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
                    {referrals?.data?.length ?
                        <>
                            <div style={{color: "rgba(255,255,255,0.7)"}}>Score 20% from their referrals</div>
                            <div className={classes.listFriends}>{`${referrals.data.length} friends`}
                                {referrals.data.map(friend => (
                                    <div className={classes.itemFriends} key={friend.customer}>
                                        <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                            <div style={{
                                                width: 30,
                                                height: 30,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "50%",
                                                fontWeight: 500,
                                                backgroundColor: "rgb(49,125,148)"
                                            }}>{friend?.name?.slice(0, 1)}</div>
                                            <div>
                                                <div>{friend.name}</div>
                                                <div style={{
                                                    color: "#FFFFFFB3",
                                                    fontSize: 12,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "start",
                                                    alignItems: "center"
                                                }}>
                                                    <MemoUsersIcon/>
                                                    {friend.referal_count === "0" ? "0" : `+ ${friend.referal_count}`}
                                                </div>
                                            </div>
                                        </div>
                                        <div>{`+${friend.amount} SD`}</div>
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
                        {/*<QRCodeCanvas id="qrcode"*/}
                        {/*              value={`https://t.me/supDurovBot?start=ref_${userRef?.codes[0]?.code}`}*/}
                        {/*              title={"QR code"}*/}
                        {/*              size={300}*/}
                        {/*              bgColor={"#ffffff"}*/}
                        {/*              fgColor={"#000000"}*/}
                        {/*              level={"L"}*/}
                        {/*              marginSize={1}*/}
                        {/*    // imageSettings={{*/}
                        {/*    //     src: "https://coin.golden-media.by/wp-content/uploads/2023/04/2322.png",*/}
                        {/*    //     x: undefined,*/}
                        {/*    //     y: undefined,*/}
                        {/*    //     height: 30,*/}
                        {/*    //     width: 50,*/}
                        {/*    //     opacity: 1,*/}
                        {/*    //     excavate: true*/}
                        {/*    // }}*/}
                        {/*              style={{paddingTop: 50}}/>*/}
                        <img src={userRef?.codes[0]?.link_code} alt="QrCode" style={{width: "100%", height: "50%"}}/>
                        <a className={classes.shareButton}
                           href={`https://t.me/share/url?url=${userRef?.codes[0]?.link_code}`}
                           target="_blank"
                           rel="noopener noreferrer">Send QR Code</a>
                        {/*<button onClick={handleSendQRCode} className={classes.shareButton}>*/}
                        {/*    Send QR Code*/}
                        {/*</button>*/}
                        <button onClick={copyClicked} style={{
                            height: 50,
                            color: "#fff",
                            fontSize: 21,
                            fontWeight: "400",
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
