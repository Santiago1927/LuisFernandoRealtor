'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../state/AuthContext';
import LoginForm from '../../components/forms/LoginForm';
import ThemeToggleButton from '../../components/ThemeToggleButton';

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-800 flex flex-col">
      <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
} 