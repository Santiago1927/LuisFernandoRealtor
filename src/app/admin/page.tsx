'use client';

import { useAdminAuthGuard } from '../../hooks/useAdminAuthGuard';
import AdminDashboard from '../../components/admin/AdminDashboard';
import ThemeToggleButton from '../../components/ThemeToggleButton';

export default function AdminPage() {
  const { isAuthenticated, loading } = useAdminAuthGuard();

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