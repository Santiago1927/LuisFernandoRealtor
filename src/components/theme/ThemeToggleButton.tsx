"use client";
import { useTheme } from "./ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0 rounded-lg border border-zinc-200/50 bg-white/50 backdrop-blur hover:bg-white/80 dark:border-zinc-800/50 dark:bg-black/50 dark:hover:bg-black/80 transition-all duration-200"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-zinc-700" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ThemeToggleButton;
