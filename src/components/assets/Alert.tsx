// Importación de React para crear el componente funcional
import React from "react";
// Importación del componente CloseIcon para el botón de cerrar
import CloseIcon from "./CloseIcon";

/**
 * Interfaz TypeScript que define las propiedades del componente Alert
 * 
 * Esta interfaz especifica los datos requeridos para renderizar una alerta:
 * - message: El texto que se mostrará en la alerta
 * - type: El tipo de alerta que determina el estilo visual (success, error, info)
 * - onClose: Función que se ejecuta cuando el usuario cierra la alerta
 */
interface AlertProps {
  message: string;                                    // Mensaje a mostrar en la alerta
  type: "success" | "error" | "info";                // Tipo de alerta para determinar el estilo
  onClose: () => void;                               // Función callback para cerrar la alerta
}

/**
 * Componente Alert - Notificación emergente para el usuario
 * 
 * Este componente renderiza una alerta que aparece en la parte superior
 * de la pantalla para mostrar mensajes importantes al usuario como
 * confirmaciones, errores o información general.
 * 
 * Características:
 * - Posicionamiento fijo en la parte superior de la pantalla
 * - Diferentes estilos según el tipo de alerta
 * - Animación de entrada suave
 * - Botón para cerrar la alerta
 * - Diseño responsivo y accesible
 * - Soporte para tema claro/oscuro
 */
const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  
  /**
   * Función que determina las clases CSS según el tipo de alerta
   * 
   * Retorna una cadena de clases de Tailwind CSS que aplican:
   * - Colores de texto apropiados para cada tipo
   * - Colores de fondo y bordes
   * - Adaptación para tema claro/oscuro
   * 
   * @returns {string} Cadena de clases CSS para el tipo de alerta
   */
  const getColor = () => {
    switch (type) {
      case "success":
        // Verde para mensajes de éxito/confirmación
        return "text-green-700 dark:text-green-500 bg-secondary-50 dark:bg-black border-green-700 dark:border-green-500";
      case "error":
        // Rojo para mensajes de error/advertencia
        return "text-red-700 dark:text-red-500 bg-secondary-50 dark:bg-black border-red-700 dark:border-red-600";
      case "info":
        // Azul/primario para mensajes informativos
        return "text-primary-800 dark:text-primary-500 bg-secondary-50 dark:bg-black border-primary-700 dark:border-primary-600";
      default:
        // Clase vacía como fallback
        return "";
    }
  };

  return (
    // Contenedor principal de la alerta con posicionamiento fijo
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 p-4 mb-4 text-sm md:text-base transition-all duration-300 ease-in-out ${getColor()} rounded-lg border shadow-lg max-w-lg w-full mx-auto flex justify-between items-center`}
      role="alert"
      style={{ animation: "fadeIn 0.5s" }}
    >
      {/* Mensaje principal de la alerta */}
      <span className="font-medium">{message}</span>
      
      {/* Botón para cerrar la alerta */}
      <button
        onClick={onClose}
        className="text-lg leading-none font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
      >
        {/* Ícono de cerrar (X) */}
        <CloseIcon />
      </button>
    </div>
  );
};

// Exportación por defecto del componente
export default Alert;
