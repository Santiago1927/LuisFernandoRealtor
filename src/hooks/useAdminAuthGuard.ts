import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../components/auth/AuthContext";

/**
 * Hook personalizado para proteger rutas de administrador
 * Redirige a la página de login si el usuario no está autenticado
 * y está intentando acceder a una ruta de administrador
 */
export function useAdminAuthGuard() {
  // Obtener el estado de autenticación del contexto
  const { isAuthenticated, loading } = useAuthContext();
  // Hook de Next.js para navegación programática
  const router = useRouter();
  // Hook de Next.js para obtener la ruta actual
  const pathname = usePathname();

  useEffect(() => {
    // Solo redirigir si no está cargando, no está autenticado Y está en una ruta admin
    // Esto evita redirecciones innecesarias en rutas públicas
    if (!loading && !isAuthenticated && pathname?.startsWith("/admin")) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router, pathname]);

  // Retornar el estado de autenticación para que el componente pueda usarlo
  return { isAuthenticated, loading };
}
