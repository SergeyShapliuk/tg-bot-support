import MemoHandcuffIcon from "../svg/HandcuffIcon";

const GameComponent = () => {
    // useEffect(() => {
    //     // Initialize the game
    //     const gameInstance = new Game();
    //
    //     // Cleanup the game instance if needed (e.g., removing event listeners)
    //     return () => {
    //         // Add cleanup code if necessary
    //     };
    // }, []);

    // return <div id="game-container" />; // Ensure this matches the container used in the Game class
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                color: "#3193F4",
                fontFamily: "Onest",
                fontSize: "29px",
                fontWeight: "500",
                lineHeight: "33px",
                marginTop: 20
            }}>Game
            </div>
            <div style={{
                color: "#FFFFFF",
                fontFamily: "Onest",
                fontWeight: "400",
                fontSize: "20px",
                lineHeight: "22px",
                marginTop: 104
            }}>А game will
                start soon
            </div>
            <MemoHandcuffIcon style={{position: "absolute", bottom: 0}}/>
        </div>
    );
};

export default GameComponent;
