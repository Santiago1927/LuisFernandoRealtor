"use client";
import { useTheme } from "./ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

/**
 * Componente ThemeToggleButton
 * Botón para alternar entre tema claro y oscuro
 * Muestra un ícono de luna para tema claro y sol para tema oscuro
 */
const ThemeToggleButton = () => {
  // Obtener el tema actual y la función para cambiarlo del contexto
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme} // Al hacer clic, alternar el tema
      className="h-9 w-9 p-0 rounded-lg border border-zinc-200/50 bg-white/50 backdrop-blur hover:bg-white/80 dark:border-zinc-800/50 dark:bg-black/50 dark:hover:bg-black/80 transition-all duration-200"
    >
      {/* Mostrar ícono según el tema actual */}
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-zinc-700" /> // Ícono de luna para activar tema oscuro
      ) : (
        <Sun className="h-4 w-4 text-custom-500" /> // Ícono de sol para activar tema claro
      )}
      {/* Texto para lectores de pantalla */}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ThemeToggleButton;
