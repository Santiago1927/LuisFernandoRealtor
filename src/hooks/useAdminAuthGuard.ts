import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../state/AuthContext';

// Hook personalizado para proteger rutas de administrador
export function useAdminAuthGuard() {
  // Obtiene el estado de autenticación y de carga desde el contexto
  const { isAuthenticated, loading } = useAuthContext();
  // Obtiene el objeto router para redireccionar
  const router = useRouter();

  // Efecto que se ejecuta cuando cambian los estados de autenticación o carga
  useEffect(() => {
    // Si ya terminó de cargar y el usuario NO está autenticado, redirige al login
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Retorna el estado de autenticación y de carga para su uso en componentes
  return { isAuthenticated, loading };
} 