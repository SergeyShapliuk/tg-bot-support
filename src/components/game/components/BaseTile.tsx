import {Triplet, useBox} from "@react-three/cannon";
import {Mesh} from "three";

import {useTheme} from "../contexts/ThemeContext";
import {config} from "../shared/constants";


export function BaseTile() {
    const {theme} = useTheme();

    const initialBoxHeight = 530; // TODO set to 170 (config.tileHeight * 10) after the gradient is implemented, as it seems to be exactly the value used in the original game.

    const boxArgs: Triplet = [
        100,
        initialBoxHeight - config.tileHeight, // 500
        100
    ];

    const [ref] = useBox<Mesh>(() => ({
        position: [
            0,
            -initialBoxHeight / 2, // -245
            0
        ],
        type: "Static",
        args: boxArgs
    }));
    // const createTextTexture = () => {
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext("2d");
    //     if (!context) return new CanvasTexture(canvas);
    //
    //     const width = 256;
    //     const height = 256;
    //     canvas.width = width;
    //     canvas.height = height;
    //
    //     // Set up the canvas context
    //     context.fillStyle = "white";
    //     context.fillRect(0, 0, width, height);
    //     context.font = "bold 30px Arial";
    //     context.fillStyle = "black";
    //     context.textAlign = "center";
    //     context.textBaseline = "middle";
    //     // context.fillText("Support Durov", width / 2, height / 2);
    //
    //     // // Save the current context state
    //     // context.save();
    //
    //     // Translate to the center of the canvas
    //     context.translate(width / 2, height / 2);
    //
    //     // Rotate the context (45 degrees in radians)
    //     context.rotate(90 * Math.PI / 180);
    //
    //     // Draw the text
    //     context.fillText("Support Durov", 0, 0);
    //
    //     // Restore the context state
    //     // context.restore();
    //
    //     return new CanvasTexture(canvas);
    // };

    // const texture = useRef(createTextTexture());
    return (
        // TODO think about adding `frustumCulled={false}` to this mesh. Otherwise, it gets clipped of at the bottom, after the zoom out is activated. P.S. Actually, why don't we just set it to false only when the game is ended and zoomed out? Perfect.
        // добавляем map={texture.current} в meshPhongMaterial для появления текста
        <mesh ref={ref} receiveShadow={true}>
            <boxGeometry args={boxArgs}/>
            <meshPhongMaterial color={theme.tile(-1)}/>
        </mesh>
    );
}
