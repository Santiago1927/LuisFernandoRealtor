'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa el hook para proteger la ruta de login y redirigir si ya está autenticado
import { useLoginAuthGuard } from '../../hooks/useLoginAuthGuard';
// Importa el formulario de login
import LoginForm from '../../components/forms/LoginForm';
// Importa el botón para cambiar el tema (claro/oscuro)
import ThemeToggleButton from '../../components/ThemeToggleButton';

// Componente principal de la página de login
export default function LoginPage() {
  // Usa el hook de protección de ruta para verificar autenticación y estado de carga
  const { isAuthenticated, loading } = useLoginAuthGuard();

  // Si está cargando, muestra un spinner de carga centrado
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  // Si el usuario ya está autenticado, no muestra nada
  if (isAuthenticated) {
    return null;
  }

  // Si el usuario no está autenticado, muestra el formulario de login y el botón de tema
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      {/* <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div> */}
      <div className="flex-1 flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
} 