import React from "react";

const LoginForm: React.FC = () => {
  return (
    <form className="max-w-md mx-auto mt-10 p-8 bg-secondary-50 dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-700 dark:border-primary-600">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-700 dark:text-primary-500">Iniciar Sesión</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">Correo electrónico *</label>
        <input
          type="email"
          required
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
          placeholder="Ingresa tu correo"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">Contraseña *</label>
        <input
          type="password"
          required
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
          placeholder="Ingresa tu contraseña"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-primary-700 text-secondary-50 font-semibold rounded-lg hover:bg-primary-800 transition-colors dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-secondary-900"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm; 