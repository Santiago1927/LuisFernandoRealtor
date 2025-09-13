import { useState, useEffect } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { loginUser } from "../../auth/login";

/**
 * Hook personalizado para manejar la autenticación de usuarios
 * Proporciona funciones para login, logout y estado de autenticación
 */
export const useAuth = () => {
  // Estado para almacenar la información del usuario autenticado
  const [user, setUser] = useState<User | null>(null);
  // Estado para controlar el loading durante la verificación inicial de auth
  const [loading, setLoading] = useState(true);

  // Effect para escuchar cambios en el estado de autenticación
  useEffect(() => {
    // Suscripción a cambios de estado de Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualiza el usuario actual
      setLoading(false); // Marca como terminado el loading inicial
    });

    // Cleanup: desuscribe del listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  /**
   * Función para iniciar sesión con email y contraseña
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns Promise con las credenciales del usuario
   */
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await loginUser(email, password);
      return userCredential;
    } catch (error) {
      throw error; // Re-lanza el error para que lo maneje el componente
    }
  };

  /**
   * Función para cerrar sesión del usuario actual
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Retorna el estado y funciones de autenticación
  return {
    user, // Usuario actual (null si no está autenticado)
    loading, // Indica si está cargando el estado inicial
    login, // Función para iniciar sesión
    logout, // Función para cerrar sesión
    isAuthenticated: !!user, // Boolean que indica si hay un usuario autenticado
  };
};
