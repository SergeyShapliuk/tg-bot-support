import React, {createContext, useContext} from "react";
import {useLocalStorage} from "usehooks-ts";

import {themes} from "../features/themes/index";
import {Theme} from "../features/themes/type";
import {LocalStorageKeys} from "../shared/LocalStorageKeys";

type ThemeName = typeof themes[number]["name"];

type ThemeContextValue = {
    theme: Theme<ThemeName>;
    setThemeName: React.Dispatch<React.SetStateAction<ThemeName>>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeInitializer({children}: React.PropsWithChildren) {
    const defaultTheme = themes[0];

    const [themeName, setThemeName] = useLocalStorage<ThemeName>(
        LocalStorageKeys.Theme,
        defaultTheme.name
    );

    return (
        <ThemeContext.Provider
            value={{
                theme: themes.find((theme) => theme.name === themeName) ?? defaultTheme,
                setThemeName
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
