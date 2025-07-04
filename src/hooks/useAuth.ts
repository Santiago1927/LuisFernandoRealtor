import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { loginUser } from '../../auth/login';

// Hook personalizado para manejar la autenticación de usuario
export const useAuth = () => {
  // Estado para almacenar el usuario autenticado
  const [user, setUser] = useState<User | null>(null);
  // Estado para indicar si la autenticación está en proceso
  const [loading, setLoading] = useState(true);

  // Efecto que escucha los cambios en el estado de autenticación de Firebase
  useEffect(() => {
    // Suscribe a los cambios de autenticación y actualiza el usuario y el estado de carga
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión con email y contraseña
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await loginUser(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Retorna el usuario, el estado de carga y las funciones de autenticación
  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user, // Indica si hay un usuario autenticado
  };
}; 