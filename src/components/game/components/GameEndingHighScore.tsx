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
                letterSpacing: 0,

                fontSize: "2rem",
                top: `${5 + 2 + 1}rem`, // `5 + 2` is `size + top` of Score.

                pointerEvents: "none"
            }}
        >
            {/* TODO icon instead of Best: */}
            {isHighScoreNew ? "New record" : `Best: ${highScore}`}
            <div style={{
                margin: "0 100px",
                color: "white",
                background: "linear-gradient(0deg, #339cff 0%, #2356a9 100%)",
                alignSelf: "center",
                padding: "10px 20px",
                borderRadius: "12px",
                fontSize: "21px"
            }}>Claim
            </div>
        </div>
    ) : null;
}
