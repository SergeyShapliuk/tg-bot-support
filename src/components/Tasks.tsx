import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import discord from "../assets/discord.svg";


function Friends() {

    return (
        <>
            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                textAlign: "start",
                padding: 20
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid"
                }}>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <img src={instagram} alt="Logo home"/>
                        <p style={{paddingLeft: 20}}>Follow +100sd</p>
                    </div>
                    <div>
                        <button style={{height: 45, fontSize: 21}}>start</button>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid"
                }}>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <div style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <img src={telegram} alt="Logo home"/>
                            <p style={{paddingLeft: 20}}>Follow +100sd</p>
                        </div>
                    </div>

                    <div>
                        <button style={{height: 45, fontSize: 21}}>start</button>
                    </div>

                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 20
                }}>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <img src={discord} alt="Logo home"/>
                        <p style={{paddingLeft: 20}}>Follow +100sd</p>
                    </div>
                    <div>
                        <button style={{height: 45, fontSize: 21}}>start</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Friends;
