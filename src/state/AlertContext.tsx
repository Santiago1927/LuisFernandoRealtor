'use client'
import Alert from '@/components/assets/Alert';
import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interfaz que define el tipo del contexto de alertas
 * @param showAlert - Función para mostrar una alerta con mensaje y tipo
 * @param hideAlert - Función para ocultar la alerta actual
 */
interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error' | 'info') => void;
  hideAlert: () => void;
}

/**
 * Contexto de React para manejar alertas globales
 * Se inicializa como undefined y se proporciona a través del Provider
 */
const AlertContext = createContext<AlertContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de alertas
 * Verifica que el hook se use dentro del AlertProvider
 * @returns Objeto con funciones showAlert y hideAlert
 * @throws Error si se usa fuera del AlertProvider
 */
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

/**
 * Interfaz que define las propiedades del componente AlertProvider
 * @param children - Componentes hijos que tendrán acceso al contexto de alertas
 */
interface AlertProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de alertas
 * Maneja el estado global de las alertas y proporciona funciones para mostrarlas/ocultarlas
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  // Estado para almacenar la alerta actual (mensaje y tipo) o null si no hay alerta
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  /**
   * Función para mostrar una alerta
   * @param message - Mensaje que se mostrará en la alerta
   * @param type - Tipo de alerta: 'success', 'error' o 'info'
   */
  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlert({ message, type });
  };

  /**
   * Función para ocultar la alerta actual
   * Establece el estado de alerta a null
   */
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {/* Renderizar los componentes hijos */}
      {children}
      
      {/* Renderizar la alerta si existe */}
      {alert && (
        <div onClick={hideAlert} className="fixed inset-0 z-40 bg-black bg-opacity-25">
          {/* Overlay para cerrar la alerta haciendo clic fuera de ella */}
          <Alert message={alert.message} type={alert.type} onClose={hideAlert} />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
