import classes from "./Friends.module.css";


const listInvite = [
    {title: "Share your invitation link", subTitle: "Get a  play pass for each friends"},
    {title: "Your friends join Support Durov", subTitle: "And start farming points"},
    {title: "Score 10% from buddies", subTitle: ""}
];

function Friends() {

    return (
        <div className={classes.main}>
            <div className={classes.title}>Invite friends. Earn a points.</div>
            <div className={classes.subTitle}>How it works</div>
            <div className={classes.description}>
                {listInvite.map((item, index) => (
                    <div key={index} className={classes.item}>
                        {/*<div className={classes.circleContainer}>*/}
                        <div className={classes.circle}/>
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
            <button className={classes.inviteButton}>Invite a friends</button>
        </div>
    );
}

export default Friends;
