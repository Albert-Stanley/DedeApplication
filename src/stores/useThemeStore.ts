import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

export const useTheme = () => useThemeStore((state) => state.theme);
export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme);
