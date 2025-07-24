'use client';

// TEMPORAL: Protección de rutas deshabilitada para desarrollo
// import { useAdminAuthGuard } from '../../hooks/useAdminAuthGuard';
import AdminDashboard from '../../components/admin/AdminDashboard';
// import ThemeToggleButton from '../../components/ThemeToggleButton';

export default function AdminPage() {
  // TEMPORAL: Protección de rutas deshabilitada para desarrollo
  // const { isAuthenticated, loading } = useAdminAuthGuard();

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <AdminDashboard />
    </div>
  );
} 