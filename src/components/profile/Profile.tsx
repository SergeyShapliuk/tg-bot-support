import classes from "./Profile.module.css";
import {TonConnectButton, useTonConnectUI} from "@tonconnect/ui-react";

// const transaction: SendTransactionRequest = {
//     validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
//     messages: [
//         {
//             address:
//                 "UQDpNuHh-rYb7CoJ2Bj1QSQ0StUcba4L8DKPTGj8BM1SFvwK", // message destination in user-friendly format
//             amount: "20000000" // Toncoin in nanotons
//         }
//     ]
// };
const Profile = () => {
    const [tonConnectUI] = useTonConnectUI();
    console.log("ProfiletonConnectUI", tonConnectUI);

    return (
        <div className={classes.main}>
            <div style={{
                position: "relative",
                fontSize: "60px",
                fontWeight: "600",
                letterSpacing: -0.3,
                textAlign: "center"
            }}>WALLET
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
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignSelf: "center", marginTop: 20}}>
                <TonConnectButton/>
            </div>
            {/*<button onClick={() => tonConnectUI.sendTransaction(transaction)}>*/}
            {/*    Send transaction*/}
            {/*</button>*/}
        </div>
    );
};

export default Profile;
