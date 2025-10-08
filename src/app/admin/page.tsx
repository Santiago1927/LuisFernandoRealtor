"use client";

import dynamic from "next/dynamic";
import { useAdminAuthGuard } from "../../hooks/useAdminAuthGuard";

const AdminDashboard = dynamic(
  () => import("../../components/admin/AdminDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-600"></div>
      </div>
    ),
  }
);

// Force dynamic rendering for this page
export const revalidate = 0;

export default function AdminPage() {
  const { isAuthenticated, loading } = useAdminAuthGuard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-600"></div>
      </div>
    );
  }

  // If not authenticated, the hook will redirect to /login. If authenticated, render dashboard.
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <AdminDashboard />
    </div>
  );
}
