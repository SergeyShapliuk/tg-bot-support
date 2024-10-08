import "./Greeting.css";

import React, {useState} from "react";
import {tapOrClickBefore} from "../../shared/texts";
import {useTheme} from "../../contexts/ThemeContext";
import {useIsFirstVisitInSession} from "../../features/firstVisitInSession";

/** @todo rename to sharedTextProps */
export const sharedStyleProps: React.CSSProperties = {
    width: "100%",
    fontFamily: "Onest",
    fontWeight: 600,
    letterSpacing: -0.03,
    textAlign: "center",
    textTransform: "uppercase",

    position: "fixed"
};

export function Greeting({index, isStarted}: { index: number; isStarted: boolean }) {
    const {theme} = useTheme();

    const [shouldDisplay, setShouldDisplay] = useState(true);

    if (!isStarted && !shouldDisplay) {
        setShouldDisplay(true);
    }
    if (!shouldDisplay) return null;
    if (index > 2) return null;

    if (isStarted || index) {
        if (shouldDisplay) {
            setTimeout(() => {
                setShouldDisplay(false);
            }, 500);
        }
    }

    const headingTop = 5.27;
    const headingSize = 4.66;

    const fadeOutClassName = isStarted || index ? "fadeOut" : null;
    const className = ["greeting", fadeOutClassName].filter(Boolean).join(" ");

    return (
        <>
            <GreetingTitle
                fadeOutClassName={fadeOutClassName}
                headingSize={headingSize}
                headingTop={headingTop}
            />
            <div
                className={className}
                style={{
                    ...sharedStyleProps,
                    color: theme.lightElements,
                    animationDelay: "0.2s",
                    animationDuration: "0.25s",
                    fontSize: "1.58rem",
                    top: `${headingTop + headingSize + 1.5}rem`,
                    letterSpacing: -0.3,
                    textTransform: "none",

                    pointerEvents: "none"
                }}
            >
                {tapOrClickBefore} to earn
            </div>
            {/*<HowToPlay className={className}/>*/}
            {/*<Settings className={className}/>*/}
        </>
    );
}

function GreetingTitle({
                           fadeOutClassName,
                           headingSize,
                           headingTop
                       }: {
    fadeOutClassName: string | null;
    headingSize: number;
    headingTop: number;
}) {
    const {theme} = useTheme();

    const {isFirstVisitInSession} = useIsFirstVisitInSession();

    const title = "stack";
    const slowDown = isFirstVisitInSession;

    return (
        <div>
            <div
                className={["greetingTitleContainer", fadeOutClassName].filter(Boolean).join(" ")}
                style={{
                    ...sharedStyleProps,
                    width: undefined,
                    // position: undefined,
                    left: "50%", // to center even with position: fixed;
                    transform: "translateX(-50%)", // to center even with position: fixed;

                    color: theme.lightElements,
                    fontSize: `${headingSize}rem`,
                    top: `${headingTop}rem`,

                    // @ts-expect-error valid custom CSS property
                    "--animationDuration": slowDown ? "4s" : undefined,

                    pointerEvents: "none"
                }}
            >

                <p>{title}</p>
                <span data-text={title}></span>
                <span data-text={title}></span>
            </div>
            <div className="blink" style={{top: 120}}/>
        </div>
    );
}
