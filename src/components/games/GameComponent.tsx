import {useState} from "react";
import PuzzleApp from "./puzzling/PuzzelApp";
import StackApp from "./stack/StackApp";


const GameComponent = () => {

    const [isRunning, setIsRunning] = useState<"stack" | "puzzle" | string>("");

    const startStack = () => {
        if (isRunning !== "stack") {
            setIsRunning("stack");
        }
    };
    const startPuzzleApp = () => {
        if (isRunning !== "puzzle") {
            setIsRunning("puzzle");
        }
    };

    // // Останавливаем приложение
    // const stopPuzzleApp = async () => {
    //     if (isRunning) {
    //         console.log("PuzzleApp unmounted");
    //         const module = await import("./puzzling/main"); // Импортируйте модуль снова
    //         module.stop(); // Остановите приложение
    //         setIsRunning("");
    //     }
    // };

    return (
        <>
            {isRunning === "" && <div style={{
                position: "absolute",
                width: "100%",
                top: "50%",
                // left: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <button onClick={startStack}>Stack</button>
                <button onClick={startPuzzleApp}>Puzzle</button>
            </div>}
            {isRunning === "stack" && <StackApp/>}
            {isRunning === "puzzle" && <PuzzleApp/>}
        </>
    );
};

export default GameComponent;
