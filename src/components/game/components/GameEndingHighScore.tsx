import {useReadLocalStorage} from "usehooks-ts";
import {useTheme} from "../contexts/ThemeContext";
import {LocalStorageKeys} from "../shared/LocalStorageKeys";
import {sharedStyleProps} from "./Greeting/index";

export function GameEndingHighScore({
                                        isHighScoreNew,
                                        className
                                    }: {
    isHighScoreNew: boolean;
    className: string;
}) {
    const {theme} = useTheme();

    const highScore = useReadLocalStorage<number | null>(LocalStorageKeys.HighScore);

    return isHighScoreNew || highScore ? (
        <div
            className={className}
            style={{
                ...sharedStyleProps,
                color: theme.lightElements,
                fontWeight: 400,
                fontSize: "1.109em",
                top: `${2}rem`, // `5 + 2` is `size + top` of Score.
                // letterSpacing: -0.03,
                textTransform: "none",

                pointerEvents: "none"
            }}
        >
            {/* TODO icon instead of Best: */}
            {isHighScoreNew ? "New record" : `Best: ${highScore}`}
        </div>
    ) : null;
}
