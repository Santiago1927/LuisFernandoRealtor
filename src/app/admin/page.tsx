'use client';

import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../components/admin/AdminDashboard'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
  </div>
});

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <AdminDashboard />
    </div>
  );
} 