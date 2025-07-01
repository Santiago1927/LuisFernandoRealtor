import { useAuthContext } from '../state/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useHeaderLogic() {
  const { user, logout, isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleAdminPanel = () => {
    if (isAuthenticated) {
      router.push('/admin');
    } else {
      router.push('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    menuOpen,
    setMenuOpen,
    handleLogout,
    handleAdminPanel,
    router,
  };
} 