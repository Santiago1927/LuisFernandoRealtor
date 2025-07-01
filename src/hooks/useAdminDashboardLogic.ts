import { useState, useEffect } from 'react';
import { useAuthContext } from '../state/AuthContext';
import { useRouter } from 'next/navigation';
import { Property } from '../types/property';
import { propertyService } from '../../firebase/firestoreService';

export function useAdminDashboardLogic() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = propertyService.subscribeToProperties((properties) => {
      setProperties(properties);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleCreateProperty = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      await propertyService.deleteProperty(id);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handlePropertySave = (property: Property) => {
    handleFormClose();
  };

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
  };
} 