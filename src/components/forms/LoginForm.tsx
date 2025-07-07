'use client';

import React from "react";
import { useLoginFormLogic } from "../../hooks/useLoginFormLogic";

/**
 * Componente LoginForm - Formulario de autenticación para administradores
 * Maneja el proceso de login con email y contraseña para acceder al panel administrativo
 */
const LoginForm: React.FC = () => {
  // Hook personalizado que maneja toda la lógica del formulario de login
  const {
    email,              // Estado del campo email
    password,           // Estado del campo contraseña
    loading,            // Estado de carga durante el proceso de autenticación
    error,              // Mensaje de error si la autenticación falla
    handleSubmit,       // Función que maneja el envío del formulario
    handleEmailChange,  // Función que actualiza el estado del email
    handlePasswordChange, // Función que actualiza el estado de la contraseña
  } = useLoginFormLogic();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-8 bg-secondary-50 dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-700 dark:border-primary-600">
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-700 dark:text-primary-500">Panel de Administrador</h2>
      
      {/* Mensaje de error condicional - se muestra solo si hay un error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {/* Campo de entrada para el correo electrónico */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">Correo electrónico *</label>
        <input
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
          placeholder="Ingresa tu correo"
        />
      </div>
      
      {/* Campo de entrada para la contraseña */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">Contraseña *</label>
        <input
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
          placeholder="Ingresa tu contraseña"
        />
      </div>
      
      {/* Botón de envío con estado de carga dinámico */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-primary-700 text-secondary-50 font-semibold rounded-lg hover:bg-primary-800 transition-colors dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-secondary-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Iniciando sesión..." : "Acceder al Panel"}
      </button>
    </form>
  );
};

export default LoginForm; 