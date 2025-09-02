'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../state/AuthContext';
import AdminDashboard from '../../components/admin/AdminDashboard';
import ThemeToggleButton from '../../components/ThemeToggleButton';

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-800">
      <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div>
      <AdminDashboard />
    </div>
  );
} 