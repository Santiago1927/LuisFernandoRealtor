import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../state/AuthContext';

// Hook personalizado para proteger la ruta de login y redirigir si ya está autenticado
export function useLoginAuthGuard() {
  // Obtiene el estado de autenticación y de carga desde el contexto
  const { isAuthenticated, loading } = useAuthContext();
  // Obtiene el objeto router para redireccionar
  const router = useRouter();

  // Efecto que verifica si el usuario ya está autenticado cuando termina de cargar
  useEffect(() => {
    // Si no está cargando y el usuario está autenticado, redirige al panel de administrador
    if (!loading && isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, loading, router]);

  // Retorna el estado de autenticación y de carga para su uso en componentes
  return { isAuthenticated, loading };
} 