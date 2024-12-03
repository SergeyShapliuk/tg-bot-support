import {CSSProperties, useEffect, useState} from "react";
import {initInitData} from "@telegram-apps/sdk-react";
import classes from "./Home.module.css";
import image from "../../assets/main_image.jpg";
import {FadeLoader} from "react-spinners";
import {useFetchTimer} from "../../hooks/useFetchTimer";
import FarmingComponent from "./FarmingComponent";
import {useTotalPoints} from "../../context/TotalPointsProvider";
import {useFetchBalance} from "../../hooks/useFetchBalance";
import {useScreenSize} from "../../context/ScreenSizeProvider";
import MemoTasksIcon from "../svg/TasksIcon";
import {Sheet} from "react-modal-sheet";
import MemoCloseIcon from "../svg/CloseIcon";


export const override: CSSProperties = {
    position: "absolute",
    top: "45%",
    left: "49%",
    // right:'50%',
    // transform:"translate(-50%, -50%)",
    display: "block",
    margin: "0 auto",
    zIndex: 999
};


function Home() {
    const initData = initInitData();
    const {screenSize} = useScreenSize();

    const {
        isInitialized,
        points,
        setInitialized,
        setPoints
    } = useTotalPoints();
    const {
        data: balance,
        isSuccess: isSuccessBalance,
        isFetching
    } = useFetchBalance(initData?.user?.id.toString() ?? "test_user3");
    const {
        data: timer,
        isSuccess: isSuccessTimer,
        refetch: refetchTimer,
        error: e
    } = useFetchTimer(initData?.user?.id.toString() ?? "test_user3");

    const [isOpen, setOpen] = useState<boolean>(false);
    // console.log("Timer", timer);
    console.log("error", e);
    // console.log("refHeight", refHeight.current?.clientHeight);


    useEffect(() => {
        if (isSuccessBalance && isSuccessTimer && !isFetching) {
            // const timeOut = setTimeout(() => {
            setPoints(balance.amount);
            setInitialized(true);
            // }, 1000);
            // return () => clearTimeout(timeOut);
        }
    }, [isSuccessBalance, isSuccessTimer, isFetching]);


    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <>
            <div className={classes.main}>
                {/*<div style={{textAlign: "center"}}>*/}
                <div className="popup">
                    <div style={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        zIndex: 10
                    }}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <MemoTasksIcon fill={"rgba(249,249,249,0.31)"}/>
                            <div style={{textAlign: "start", marginLeft: 22}}>
                                <div
                                    style={{
                                        color: "#FFFFFF",
                                        fontSize: screenSize.width * 0.069,
                                        fontWeight: "500",
                                        lineHeight: "24px"
                                    }}>Info
                                </div>
                                <div style={{
                                    color: "#FFFFFF",
                                    fontSize: screenSize.width * 0.035,
                                    fontWeight: "400",
                                    lineHeight: "18px"
                                }}>is ready, try it now!
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setOpen(true)} style={{
                            width: 75,
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            color: "#fff",
                            fontSize: screenSize.width * 0.035,
                            fontWeight: "400",
                            lineHeight: "16px",
                            backgroundColor: "rgba(249,249,249,0.31)",
                            padding: "7px 20px"
                        }}>Open
                        </button>
                    </div>
                </div>
                {/*</div>*/}
                <div className={classes.imageBlock}>
                    <div style={{
                        // flex: 1,
                        // fontFamily:'sans-serif',
                        fontSize: "27px",
                        fontWeight: "500",
                        lineHeight: "34px",
                        letterSpacing: -0.4,
                        maxWidth: "100%", // Ограничивает ширину
                        wordWrap: "break-word", // Переносит текст на новую строку,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                        // lineClamp: 1
                        // padding: ".5em",
                        // marginTop: "10px"
                    }}>
                        Hello, {initData?.user?.username ? initData.user.username : initData?.user?.firstName ? initData?.user?.firstName : "-----"}!
                    </div>
                    {/*<p style={{position: "absolute", right: 10, paddingRight: "10px", fontSize: 24}}>&#8383; {points}</p>*/}
                    <div style={{height: screenSize.height - 450, display: "flex", alignItems: "center"}}>
                        <img
                            src={image}
                            className={classes.image} alt="Image"/>
                    </div>
                    {/*<div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',background:'red',}}>*/}
                    <div style={{fontSize: "20px", letterSpacing: -0.3, textAlign: "left"}}>Your
                        balance
                    </div>
                    <div style={{
                        fontSize: screenSize.width * 0.097,
                        fontWeight: 600,
                        letterSpacing: -0.2,
                        textAlign: "left"
                    }}>{points ? points : "0"} HH
                    </div>
                    {/*</div>*/}
                </div>
                <div className={classes.buttonContainer}>
                    <FarmingComponent timer={timer} refetchTimer={() => refetchTimer()}/>
                </div>
            </div>
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)} disableDrag style={{marginLeft: 16, marginRight: 16}}>
                <Sheet.Container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopLeftRadius: "34px",
                    borderTopRightRadius: "34px",
                    background: "radial-gradient(57.6% 283.1% at 50% 50%, #3193F4 0%, #1D568E 100%)"

                }}>
                    {/*<Sheet.Header disableDrag/>*/}
                    <div style={{
                        padding: "20px 36px 20px 36px",
                        fontSize: "20px",
                        fontWeight: 500,
                        textAlign: "center"
                    }}>HH tokens can be
                        accepted as part of the payment for hotel reservations.
                    </div>
                    <div onClick={() => {
                        setOpen(false);
                    }}>
                        <MemoCloseIcon style={{position: "absolute", top: 20, right: 20}}/>
                    </div>
                    <Sheet.Scroller style={{padding: "20px 24px 20px 24px"}}>
                        <div style={{
                            fontSize: "20px",
                            fontWeight: 500,
                            textAlign: "center"
                        }}>How to get a discount on a hotel? 🌍
                        </div>
                        <div style={{
                            paddingTop: 10,
                            fontSize: "19px",
                            fontWeight: 400,
                            textAlign: "left"
                        }}>1. Earn HH tokens in our Telegram game.
                        </div>
                        <div style={{
                            padding: "10px 0",
                            fontSize: "19px",
                            fontWeight: 400,
                            textAlign: "left"
                        }}>2. Choose any hotel on Booking.com.
                        </div>
                        <div style={{
                            fontSize: "19px",
                            fontWeight: 400,
                            textAlign: "left"
                        }}>3. Contact the administrator via Telegram (
                            <a href={`https://t.me/hotelhub_manager`}
                               target="_blank"
                               rel="noopener noreferrer">@hotelhub_manager
                            </a>).
                        </div>
                        <div style={{
                            padding: "20px 0",
                            fontSize: "19px",
                            fontWeight: 400,
                            textAlign: "left"
                        }}>💎 The administrator will confirm the booking taking into account your discount!
                        </div>
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
                        {/*<img src={userRef?.codes[0]?.link_code} alt="QrCode"*/}
                        {/*     style={{width: "100%", height: "50%", borderRadius: "20px"}}/>*/}
                        {/*<a className={classes.shareButton}*/}
                        {/*   href={`https://t.me/share/url?url=${"f"}`}*/}
                        {/*   target="_blank"*/}
                        {/*   rel="noopener noreferrer">Send QR Code</a>*/}
                        {/*<button onClick={handleSendQRCode} className={classes.shareButton}>*/}
                        {/*    Send QR Code*/}
                        {/*</button>*/}
                        {/*<button onClick={copyClicked} style={{*/}
                        {/*    height: 50,*/}
                        {/*    color: "#fff",*/}
                        {/*    fontSize: "20px",*/}
                        {/*    fontWeight: "500",*/}
                        {/*    letterSpacing: -0.4,*/}
                        {/*    margin: "25px 0 25px 0",*/}
                        {/*    backgroundColor: "rgba(249,249,249,0.31)"*/}
                        {/*}}>{getButtonText(state)}</button>*/}
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


export default Home;
