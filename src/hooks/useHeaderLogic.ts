import { useAuthContext } from "../components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Hook personalizado que encapsula la lógica del header de la aplicación
export function useHeaderLogic() {
  // Obtiene el usuario, la función de logout y el estado de autenticación del contexto
  const { user, logout, isAuthenticated } = useAuthContext();
  // Obtiene el objeto router para redireccionar entre páginas
  const router = useRouter();
  // Estado para controlar si el menú está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para cerrar sesión y redirigir al inicio
  const handleLogout = async () => {
    try {
      await logout(); // Cierra la sesión del usuario
      // Usar replace para forzar la redirección inmediata y limpiar el historial
      router.replace("/"); // Redirige a la página principal
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para navegar al panel de administrador o al login según autenticación
  const handleAdminPanel = () => {
    if (isAuthenticated) {
      router.push("/admin"); // Si está autenticado, va al panel admin
    } else {
      router.push("/login"); // Si no, va al login
    }
  };

  // Retorna los estados y funciones para ser usados en el header
  return {
    user,
    isAuthenticated,
    menuOpen,
    setMenuOpen,
    handleLogout,
    handleAdminPanel,
    router,
  };
}
