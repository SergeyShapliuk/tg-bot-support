import {useEffect} from "react";


declare global {
    interface Window {
        yaContextCb: Array<() => void>;
        Ya: any;
    }
}


const Ads = () => {
        useEffect(() => {
            const adContainer = document.getElementById("adfox_172890647605499958");

            if (adContainer) {
                //     // adContainer.style.position = "absolute";
                //     adContainer.style.display = "block";
                //     adContainer.style.width = "100vw";
                //     adContainer.style.height = "300px";
                console.log("YaadContainer:", adContainer);
                window.yaContextCb = window.yaContextCb || [];
                window.yaContextCb.push(() => {
                    console.log("Ya:", window.Ya);
                    console.log("Ya.adfoxCodes:", window.Ya && window.Ya.adfoxCode);
                    if (window.Ya) {
                        window.Ya.adfoxCode.create({
                            ownerId: 10885266,
                            containerId: "adfox_172890647605499958",
                            type: "fullscreen",
                            platform: "touch",
                            async: true,
                            params: {
                                p1: "delme",
                                p2: "hiuq",
                                ext_duid: "7546029935"
                            }
                        });
                    }
                });
            } else {
                console.error("Контейнер для рекламы не найден");
            }
        }, []);
        return (
            <div>
                <div id="adfox_172890647605499958"
                     style={{
                         position: "absolute",
                         width: "100%",
                         height: "100vh",
                         zIndex: 10
                         // backgroundColor: "#4cd964"
                     }}></div>
            </div>
        );
    }
;

export default Ads;
