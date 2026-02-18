import { createSlice } from "@reduxjs/toolkit";

const updateThemeInDOM = (mode) => {
    if (typeof window === "undefined") return;
    
    const root = document.documentElement;
    if (mode === "dark") {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
    } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
    }
    localStorage.setItem("meena-theme", mode);
};

const initialState = {
    mode: "dark",
    isInitialized: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
            updateThemeInDOM(action.payload);
        },
        toggleTheme: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
            updateThemeInDOM(state.mode);
        },
        initTheme: (state) => {
            if (state.isInitialized) return;

            let theme = "dark";
            if (typeof window !== "undefined") {
                const stored = localStorage.getItem("meena-theme");
                const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                theme = stored || (systemPrefersDark ? "dark" : "light");
            }
            
            state.mode = theme;
            state.isInitialized = true;
            updateThemeInDOM(theme);
        },
    },
});

export const { setTheme, toggleTheme, initTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export default themeSlice.reducer;