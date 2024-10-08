import {useTheme} from "../contexts/ThemeContext";
import {sharedStyleProps} from "./Greeting/index";

export function Score({index, isEnded}: { index: number; isEnded: boolean }) {
    const {theme} = useTheme();

    return (
        <div
            style={{
                ...sharedStyleProps,
                color: theme.lightElements,
                fontWeight: 600,
                lineHeight: "2em",
                letterSpacing: -0.3,

                fontSize: "2.5em",
                top: "3.5rem",

                pointerEvents: "none"
            }}
        >
            {isEnded ? "You got:" : ""}

            < div style={{
                position: "relative",
                fontSize: "2.5em",
                // top: "3rem",

                pointerEvents: "none"
            }}>
                {isEnded && <div className="blink" style={{top: 25}}/>}
                {isEnded ? Number(index) : index || ""}</div>
            {isEnded ? <button style={{
                width: 156,
                height: 53,
                padding: 0,
                alignSelf: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: 0,
                borderRadius: "15px",
                background: "radial-gradient(64.02% 304.92% at 47.43% 50.94%, #3193F4 0%, #1D568E 100%)",
                boxShadow: "0px 3px 7.5px 0px #00000040",
                textTransform: "none"
            }}>Claim
            </button> : null}
        </div>
    );
}
