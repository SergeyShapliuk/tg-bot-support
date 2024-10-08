import {createTheme} from "../utils";

export const themeStack = createTheme({
    name: "Stack",
    background: () => "#000",
    lightElements: "#fff",
    tile: (index) => getBaseTileColor((index + 42) * 5)
});

function getBaseTileColor(hue: number) {
    return `hsl(${hue}, 79%, 54%)`;
}
