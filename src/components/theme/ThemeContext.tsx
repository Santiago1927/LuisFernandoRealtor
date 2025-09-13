"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Tipos de tema disponibles en la aplicación
type Theme = "light" | "dark";

// Estructura del contexto de tema
type ThemeContextType = {
  theme: Theme; // Tema actual
  toggleTheme: () => void; // Función para alternar entre temas
};

// Crear el contexto de tema
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de tema
 * Debe usarse dentro de un ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Propiedades del proveedor de tema
type Props = {
  children: ReactNode; // Componentes hijos que tendrán acceso al tema
};

/**
 * Proveedor de contexto de tema
 * Gestiona el estado del tema y la persistencia en localStorage
 */
export const ThemeProvider = ({ children }: Props) => {
  // Estado del tema actual, inicializado en "light"
  const [theme, setTheme] = useState<Theme>("light");

  // Effect que se ejecuta al montar el componente para cargar el tema guardado
  useEffect(() => {
    // Obtener el tema guardado del localStorage, o usar "light" como predeterminado
    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") as Theme) || "light"
        : "light";

    setTheme(storedTheme);

    // Aplicar la clase "dark" al elemento html si el tema es oscuro
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Función para alternar entre tema claro y oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      // Alternar entre "light" y "dark"
      const newTheme = prevTheme === "light" ? "dark" : "light";

      // Guardar el nuevo tema en localStorage para persistencia
      localStorage.setItem("theme", newTheme);

      // Aplicar o remover la clase "dark" del elemento html
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newTheme;
    });
  };

  // Proporcionar el contexto de tema a los componentes hijos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
