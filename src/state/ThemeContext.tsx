'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/**
 * Tipo que define los temas disponibles en la aplicación
 */
type Theme = "light" | "dark";

/**
 * Interfaz que define el tipo del contexto de tema
 * @param theme - Tema actual de la aplicación (light o dark)
 * @param toggleTheme - Función para alternar entre temas
 */
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

/**
 * Contexto de React para manejar el tema global de la aplicación
 * Se inicializa como undefined y se proporciona a través del Provider
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de tema
 * Verifica que el hook se use dentro del ThemeProvider
 * @returns Objeto con el tema actual y función para alternarlo
 * @throws Error si se usa fuera del ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/**
 * Interfaz que define las propiedades del componente ThemeProvider
 * @param children - Componentes hijos que tendrán acceso al contexto de tema
 */
type Props = {
  children: ReactNode;
};

/**
 * Proveedor del contexto de tema
 * Maneja el estado global del tema, persistencia en localStorage y aplicación de clases CSS
 * @param children - Componentes hijos que tendrán acceso al contexto de tema
 */
export const ThemeProvider = ({ children }: Props) => {
  // Estado para almacenar el tema actual (light por defecto)
  const [theme, setTheme] = useState<Theme>("light");

  /**
   * Efecto que se ejecuta al montar el componente
   * Recupera el tema guardado en localStorage y lo aplica al documento
   */
  useEffect(() => {
    // Obtener el tema guardado en localStorage o usar "light" por defecto
    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") as Theme) || "light"
        : "light";
    
    // Establecer el tema en el estado
    setTheme(storedTheme);
    
    // Aplicar la clase del tema al elemento raíz del documento
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  /**
   * Función para alternar entre temas (light ↔ dark)
   * Actualiza el estado, guarda en localStorage y aplica la clase CSS
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      // Determinar el nuevo tema (alternar entre light y dark)
      const newTheme = prevTheme === "light" ? "dark" : "light";
      
      // Guardar el nuevo tema en localStorage para persistencia
      localStorage.setItem("theme", newTheme);
      
      // Aplicar la clase del nuevo tema al elemento raíz del documento
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Renderizar los componentes hijos con acceso al contexto de tema */}
      {children}
    </ThemeContext.Provider>
  );
};
