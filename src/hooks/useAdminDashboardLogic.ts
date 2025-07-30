// Importa los hooks useState y useEffect de React para manejar el estado y los efectos secundarios
import { useState } from 'react';
// Importa el contexto de autenticación para acceder a funciones como logout
import { useAuthContext } from '../components/auth/AuthContext';
// Importa useRouter de Next.js para la navegación programática
import { useRouter } from 'next/navigation';
// Importa el tipo Property para tipar las propiedades
import { Property } from '../types/property';
// Importa el servicio que maneja las operaciones con propiedades en Firestore
import { usePaginatedProperties } from '../hooks/usePaginatedProperties';
// Importa la mutación para eliminar propiedades
import { useDeleteProperty } from './usePropertyMutations';

// Hook personalizado que encapsula la lógica del dashboard de administrador
export function useAdminDashboardLogic() {
  // Estado para almacenar la lista de propiedades
  const [showForm, setShowForm] = useState(false);
  // Estado para la propiedad que se está editando (null si se está creando una nueva)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  // Obtiene la función de logout del contexto de autenticación
  const { logout } = useAuthContext();
  // Obtiene el objeto router para redireccionar entre páginas
  const router = useRouter();
  // Estado para la página actual de la paginación
  const [page, setPage] = useState(1);
  // Hook para manejar la paginación de propiedades
  const { data, isLoading } = usePaginatedProperties({ page, pageSize: 12 });
  // Total de propiedades y páginas
  const total = data?.total || 0;
  const properties = data?.properties || [];
  const totalPages = Math.ceil(total / 12);
  // Control para mostrar el botón "Ver más"
  const showVerMas = totalPages > 9 && page === 9;

  // Mutación para eliminar propiedades
  const deletePropertyMutation = useDeleteProperty();

  // Función para cerrar sesión y redirigir al inicio
  const handleLogout = async () => {
    try {
      await logout(); // Cierra la sesión del usuario
      router.push('/'); // Redirige a la página principal
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Muestra el formulario para crear una nueva propiedad
  const handleCreateProperty = () => {
    setEditingProperty(null); // No hay propiedad en edición
    setShowForm(true); // Muestra el formulario
  };

  // Muestra el formulario para editar una propiedad existente
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property); // Establece la propiedad a editar
    setShowForm(true); // Muestra el formulario
  };

  // Elimina una propiedad después de confirmar con el usuario
  const handleDeleteProperty = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      try {
        await deletePropertyMutation.mutateAsync(id);
        // La invalidación de queries se maneja automáticamente en la mutación
        alert('Propiedad eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
        alert('Error al eliminar la propiedad. Intenta de nuevo.');
      }
    }
  };

  // Cierra el formulario y limpia el estado de edición
  const handleFormClose = () => {
    setShowForm(false); // Oculta el formulario
    setEditingProperty(null); // Limpia la propiedad en edición
  };

  // Maneja el guardado de una propiedad (aquí solo cierra el formulario)
  const handlePropertySave = (property: Property) => {
    handleFormClose();
  };

  // Retorna los estados y funciones para ser usados en el dashboard de administrador
  return {
    properties,
    showForm,
    editingProperty,
    handleLogout,
    handleCreateProperty,
    handleEditProperty,
    handleDeleteProperty,
    handleFormClose,
    handlePropertySave,
    router,
    page,
    setPage,
    totalPages,
    showVerMas,
    isLoading,
    // Estados adicionales de la mutación de eliminación
    isDeleting: deletePropertyMutation.isPending,
    deleteError: deletePropertyMutation.error,
  };
} 