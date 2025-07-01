'use client';

import React, { useState } from "react";
import { useAuthContext } from "../../state/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push('/admin');
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-8 bg-secondary-50 dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-700 dark:border-primary-600">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-700 dark:text-primary-500">Panel de Administrador</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">Correo electrónico *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
          placeholder="Ingresa tu correo"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">Contraseña *</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
          placeholder="Ingresa tu contraseña"
        />
      </div>
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