"use client";

import Header from "./Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";

/**
 * Componente cliente que maneja la lógica de renderizado del header
 * Determina cuándo mostrar el header basándose en la ruta actual,
 * el estado de autenticación y el tamaño de pantalla
 */
export default function HeaderClient() {
  // Obtiene la ruta actual de la página
  const pathname = usePathname() || "/";
  // Obtiene el estado de autenticación del usuario
  const { isAuthenticated } = useAuthContext();

  // Limpia la ruta eliminando parámetros de consulta
  const cleanPath = pathname.split("?")[0] || "/";

  // Determina si debe mostrar el botón de regreso al inicio
  // Se muestra en páginas de contacto y propiedades
  const showReturnHomeButton =
    cleanPath === "/contacto" || cleanPath.startsWith("/propiedades");

  // Estado para detectar si estamos en desktop (pantalla grande)
  const [isDesktop, setIsDesktop] = useState(false);

  // Effect para detectar cambios en el tamaño de ventana
  useEffect(() => {
    // Función que verifica si estamos en desktop (>= 1024px)
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    // Ejecuta la verificación inicial
    check();
    // Añade listener para cambios de tamaño
    window.addEventListener("resize", check);
    // Limpia el listener al desmontar
    return () => window.removeEventListener("resize", check);
  }, []);

  // Verifica si estamos en una ruta de administración
  const isAdminRoute = cleanPath.startsWith("/admin");
  // Determina si hay sidebar visible (usuario autenticado en desktop)
  const hasSidebar = isAuthenticated && isDesktop;

  // Lógica para determinar cuándo mostrar el header en desktop:
  // - Usuario NO autenticado en home, O
  // - Usuario autenticado pero NO en desktop (sin sidebar), O
  // - Rutas que necesitan botón de regreso (pero NO cuando hay sidebar visible)
  const showHeaderOnDesktop =
    (!isAuthenticated && cleanPath === "/") ||
    (!hasSidebar &&
      !isAdminRoute &&
      (cleanPath === "/" || showReturnHomeButton));

  // Decisión final: mostrar header en móvil siempre, en desktop según lógica anterior
  const shouldRenderHeader = !isDesktop || (isDesktop && showHeaderOnDesktop);

  // Si no debe renderizarse, retorna null
  if (!shouldRenderHeader) return null;

  // Renderiza el componente Header
  return <Header />;
}
