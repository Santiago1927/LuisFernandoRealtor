'use client';

import { useLoginAuthGuard } from '../../hooks/useLoginAuthGuard';
import LoginForm from '../../components/forms/LoginForm';
import { Loader2, Shield } from "lucide-react";

export default function LoginPage() {
  const { isAuthenticated, loading } = useLoginAuthGuard();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Panel de Administración
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              Accede a tu panel de control para gestionar propiedades y clientes
            </p>
          </div>

          <div className="w-full max-w-md">
            <LoginForm />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              © 2024 Luis Fernando Realtor • Acceso exclusivo para administradores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 