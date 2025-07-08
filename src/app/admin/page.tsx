'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa el hook para proteger la ruta de administrador
import { useAdminAuthGuard } from '../../hooks/useAdminAuthGuard';
// Importa el componente del dashboard de administrador
import AdminDashboard from '../../components/admin/AdminDashboard';
// Importa el botón para cambiar el tema (claro/oscuro)
import ThemeToggleButton from '../../components/ThemeToggleButton';

// Componente principal de la página de administrador
export default function AdminPage() {
  // Usa el hook de protección de ruta para verificar autenticación y estado de carga
  const { isAuthenticated, loading } = useAdminAuthGuard();

  // Si está cargando, muestra un spinner de carga centrado
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  // Si el usuario no está autenticado, no muestra nada
  if (!isAuthenticated) {
    return null;
  }

  // Si el usuario está autenticado, muestra el dashboard de administrador y el botón de tema
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div> */}
      <AdminDashboard />
    </div>
  );
} 