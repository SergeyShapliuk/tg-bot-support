import classes from "./Tasks.module.css";
// import MemoInstagramIcon from "../svg/InstagramIcon";
import MemoTelegramIcon from "../svg/TelegramIcon";
// import MemoDiscordIcon from "../svg/DiscordIcon";


const list = [
    // {name: "instagram", icon: <MemoInstagramIcon/>, title: "Follow +100sd", link: ""},
    {name: "telegram", icon: <MemoTelegramIcon/>, title: "Follow +100sd", link: "https://t.me/sup_durov"},
    // {name: "discord", icon: <MemoDiscordIcon/>, title: "Follow +100sd", link: ""}
];

function Friends() {

    return (
        <div className={classes.main}>
            <div style={{fontSize: 31, fontWeight: 600}}>Support Durov socials</div>
            <div style={{color: "#a6a696", fontSize: 16, fontWeight: 500, paddingTop: "10px"}}>Join Support Durov
                community, be aware of new
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
                                {/*<img src={item.icon} alt={`Icon ${item.name}`}/>*/}
                                {item.icon}
                                <p style={{paddingLeft: 20, fontSize: 19}}>{item.title}</p>
                            </div>

                            <a href={item.link} target="_blank"
                               rel="noopener noreferrer" style={{
                                height: 45,
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: 10,
                                paddingRight: 10,
                                color: "white",
                                backgroundColor: "#282828",
                                fontSize: 16,
                                borderRadius: 12,
                                textDecoration: "none"
                            }}>Start</a>
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
