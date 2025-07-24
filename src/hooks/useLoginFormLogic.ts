import { useState } from "react";
import { useAuthContext } from "../components/auth/AuthContext";
import { useRouter } from "next/navigation";

/**
 * Hook personalizado que maneja toda la lógica del formulario de login
 * Incluye manejo de estado, autenticación, navegación y validación de errores
 * @returns Objeto con estados y funciones para el formulario de login
 */
export const useLoginFormLogic = () => {
  // Estados del formulario para controlar los campos y el proceso de login
  const [email, setEmail] = useState("");        // Estado del campo email
  const [password, setPassword] = useState("");  // Estado del campo contraseña
  const [loading, setLoading] = useState(false); // Estado de carga durante el proceso de autenticación
  const [error, setError] = useState("");        // Estado para mensajes de error
  
  // Hook del contexto de autenticación para acceder a la función de login
  const { login } = useAuthContext();
  
  // Hook de navegación de Next.js para redirigir después del login exitoso
  const router = useRouter();

  /**
   * Maneja el envío del formulario de login
   * Procesa la autenticación y maneja errores o redirección exitosa
   * @param e - Evento del formulario que se previene por defecto
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true);   // Activa el estado de carga
    setError("");       // Limpia errores anteriores

    try {
      // Intenta realizar el login con las credenciales proporcionadas
      await login(email, password);
      // Si el login es exitoso, redirige al panel de administrador
      router.push('/admin');
    } catch (error: any) {
      // Si hay un error, establece el mensaje de error
      setError(error.message || "Error al iniciar sesión");
    } finally {
      // Siempre desactiva el estado de carga, independientemente del resultado
      setLoading(false);
    }
  };

  /**
   * Manejador de cambios para el campo email
   * Actualiza el estado del email cuando el usuario escribe
   * @param e - Evento de cambio del input de email
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * Manejador de cambios para el campo contraseña
   * Actualiza el estado de la contraseña cuando el usuario escribe
   * @param e - Evento de cambio del input de contraseña
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Retornar todos los estados y funciones necesarios para el componente
  return {
    email,              // Estado actual del email
    password,           // Estado actual de la contraseña
    loading,            // Estado de carga del formulario
    error,              // Mensaje de error actual
    handleSubmit,       // Función para manejar el envío del formulario
    handleEmailChange,  // Función para manejar cambios en el campo email
    handlePasswordChange, // Función para manejar cambios en el campo contraseña
  };
}; 