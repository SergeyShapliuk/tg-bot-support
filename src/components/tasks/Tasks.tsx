import instagram from "../../assets/instagram.svg";
import telegram from "../../assets/telegram.svg";
import discord from "../../assets/discord.svg";
import classes from "./Tasks.module.css";


const list = [
    {icon: instagram, title: "Follow +100sd", link: ""},
    {icon: telegram, title: "Follow +100sd", link: "https://t.me/sup_durov"},
    {icon: discord, title: "Follow +100sd", link: ""}
];

function Friends() {

    return (
        <div className={classes.main}>
            <div style={{fontSize: 34, fontWeight: 500}}>Socials</div>
            <div style={{color: "#a6a696", fontSize: 16, fontWeight: 500}}>Join Support Durov community, be aware of new
                and following updates, find your tribe in Support Durov
            </div>
            {list.map((item, index) => (
                <>
                    <div key={index} style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "start",
                        paddingBlock: "10px"
                    }}>
                        <div style={{
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
                                <img src={item.icon} alt={"Icon"}/>
                                <p style={{paddingLeft: 20}}>{item.title}</p>
                            </div>
                            <div style={{
                                height: 45,
                                paddingLeft: 10,
                                paddingRight: 10,
                                color: "white",
                                backgroundColor: "#282828",
                                fontSize: 16
                            }}>
                                <a href={item.link} target="_blank"
                                   rel="noopener noreferrer">Start</a>
                            </div>
                        </div>
                    </div>
                    <div style={{height: 1, backgroundColor: "#282828", marginRight: 10, marginLeft: 10}}/>
                </>
            ))

            }
        </div>
    );
}

export default Friends;
