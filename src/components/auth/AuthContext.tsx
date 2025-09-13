"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { User } from "firebase/auth";

// Interfaz que define la estructura del contexto de autenticación
interface AuthContextType {
  user: User | null; // Usuario autenticado actual, null si no está autenticado
  loading: boolean; // Estado de carga durante operaciones de autenticación
  login: (email: string, password: string) => Promise<any>; // Función para iniciar sesión
  logout: () => Promise<void>; // Función para cerrar sesión
  isAuthenticated: boolean; // Indica si el usuario está autenticado
}

// Crear el contexto de autenticación con valor undefined por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acceder al contexto de autenticación
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // Verificar que el hook se use dentro del proveedor
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Propiedades del componente proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode; // Componentes hijos que tendrán acceso al contexto
}

// Componente proveedor que envuelve la aplicación y proporciona el contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Usar el hook de autenticación para obtener el estado y funciones
  const auth = useAuth();

  return (
    // Proporcionar el contexto de autenticación a todos los componentes hijos
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};
