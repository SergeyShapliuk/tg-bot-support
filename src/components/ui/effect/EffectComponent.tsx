import {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import icon_v1 from "../../../assets/free_green.png";
import icon_v2 from "../../../assets/free_light_green.png";
import icon_handcuffs from "../../../assets/handcuffs.png";
import eiffel_tower from "../../../assets/eiffel-tower.png";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import {loadSlim} from "@tsparticles/slim";
import {loadTextShape} from "@tsparticles/shape-text";
import {tsParticles} from "@tsparticles/engine";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const EffectComponent = ({isActive}: { isActive: boolean }) => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        if (isActive) {
            initParticlesEngine(async (engine) => {
                // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
                // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
                // starting from v2 you can add only the features you need reducing the bundle size
                //await loadAll(engine);
                //await loadFull(engine);
                await loadSlim(engine);
                await loadTextShape(tsParticles);
                //await loadBasic(engine);
            }).then(() => {
                setInit(true);
            });
        } else {

        }
    }, [isActive]);

    // const particlesLoaded = (container) => {
    //     console.log("fdgdfgdfgdfg", tsParticles.getUpdaters({}));
    // };

    if (init && isActive) {
        return (
            <Particles
                id="tsparticles"
                // onParticlesUpdate={particlesLoaded}
                options={{
                    fullScreen: {
                        zIndex: 1
                    },
                    emitters: [
                        {
                            position: {
                                x: 0,
                                y: 30
                            },
                            rate: {
                                quantity: 5,
                                delay: 0.15
                            },
                            particles: {
                                move: {
                                    direction: "top-right",
                                    outModes: {
                                        top: "none",
                                        left: "none",
                                        default: "destroy"
                                    }
                                }
                            }
                        },
                        {
                            position: {
                                x: 100,
                                y: 30
                            },
                            rate: {
                                quantity: 5,
                                delay: 0.15
                            },
                            particles: {
                                move: {
                                    direction: "top-left",
                                    outModes: {
                                        top: "none",
                                        right: "none",
                                        default: "destroy"
                                    }
                                }
                            }
                        }
                    ],
                    particles: {
                        color: {
                            value: ["#ff00f2", "#37ff00", "#052293FF"]
                        },
                        move: {
                            decay: 0.05,
                            direction: "top",
                            enable: true,
                            gravity: {
                                enable: true
                            },
                            outModes: {
                                top: "none",
                                default: "destroy"
                            },
                            speed: {
                                min: 10,
                                max: 50
                            }
                        },
                        number: {
                            value: 100
                        },
                        opacity: {
                            value: 1
                        },
                        rotate: {
                            value: {
                                min: 0,
                                max: 360
                            },
                            direction: "random",
                            animation: {
                                enable: true,
                                speed: 30
                            }
                        },
                        tilt: {
                            direction: "random",
                            enable: true,
                            value: {
                                min: 0,
                                max: 360
                            },
                            animation: {
                                enable: true,
                                speed: 30
                            }
                        },
                        size: {
                            value: {
                                min: 0,
                                max: 2
                            },
                            animation: {
                                enable: true,
                                startValue: "min",
                                count: 1,
                                speed: 16,
                                sync: true
                            }
                        },
                        roll: {
                            darken: {
                                enable: true,
                                value: 25
                            },
                            enable: true,
                            speed: {
                                min: 5,
                                max: 15
                            }
                        },
                        wobble: {
                            distance: 30,
                            enable: true,
                            speed: {
                                min: -7,
                                max: 7
                            }
                        },
                        shape: {
                            type: ["image", "text"], // Include both image and text
                            options: {
                                image: [
                                    {
                                        src: icon_handcuffs,
                                        width: 32,
                                        height: 32,
                                        particles: {
                                            size: {
                                                value: 19
                                            }
                                        }
                                    },
                                    {
                                        src: eiffel_tower,
                                        width: 32,
                                        height: 32,
                                        particles: {
                                            size: {
                                                value: 21
                                            }
                                        }
                                    },
                                    {
                                        src: icon_v1,
                                        width: 32,
                                        height: 32,
                                        particles: {
                                            size: {
                                                value: 12
                                            }
                                        }
                                    },
                                    {
                                        src: icon_v2,
                                        width: 32,
                                        height: 32,
                                        particles: {
                                            size: {
                                                value: 12
                                            }
                                        }
                                    }
                                ],
                                text: {
                                    value: ["#FreeDurov"], // Add your desired text
                                    font: "Arial",
                                    // style: "bold",
                                    weight: "700",
                                    fill: true,
                                    particles: {
                                        size: {
                                            value: 6
                                        }
                                    }
                                }
                            }
                        }
                    }
                }}
            />

        );
    }
    return <></>;
};
export default EffectComponent;
