import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../components/auth/AuthContext';

export function useAdminAuthGuard() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  return { isAuthenticated, loading };
} 