'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User } from 'firebase/auth';

/**
 * Interfaz que define el tipo del contexto de autenticación
 * @param user - Usuario actual de Firebase Auth (null si no está autenticado)
 * @param loading - Estado de carga durante el proceso de autenticación
 * @param login - Función para iniciar sesión con email y contraseña
 * @param logout - Función para cerrar sesión
 * @param isAuthenticated - Booleano que indica si el usuario está autenticado
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

/**
 * Contexto de React para manejar la autenticación global
 * Se inicializa como undefined y se proporciona a través del Provider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de autenticación
 * Verifica que el hook se use dentro del AuthProvider
 * @returns Objeto con estado de autenticación y funciones de login/logout
 * @throws Error si se usa fuera del AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

/**
 * Interfaz que define las propiedades del componente AuthProvider
 * @param children - Componentes hijos que tendrán acceso al contexto de autenticación
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de autenticación
 * Utiliza el hook useAuth para obtener el estado de autenticación y lo proporciona a toda la aplicación
 * @param children - Componentes hijos que tendrán acceso al contexto de autenticación
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Hook personalizado que maneja toda la lógica de autenticación con Firebase
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {/* Renderizar los componentes hijos con acceso al contexto de autenticación */}
      {children}
    </AuthContext.Provider>
  );
}; 