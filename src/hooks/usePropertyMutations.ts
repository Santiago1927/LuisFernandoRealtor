import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '../../firebase/firestoreService';
import { Property } from '../types/property';

/**
 * Hook para crear una nueva propiedad
 * Invalida las queries de propiedades después del éxito
 */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyData: Omit<Property, 'id'>): Promise<Property> => {
      return await propertyService.createProperty(propertyData);
    },
    onSuccess: () => {
      // Invalidar todas las queries de propiedades para refrescar la UI
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error) => {
      console.error('Error creating property:', error);
    }
  });
}

/**
 * Hook para actualizar una propiedad existente
 * Invalida las queries de propiedades después del éxito
 */
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, propertyData }: { id: string; propertyData: Partial<Property> }): Promise<void> => {
      return await propertyService.updateProperty(id, propertyData);
    },
    onSuccess: (_, { id }) => {
      // Invalidar todas las queries de propiedades
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      // Invalidar específicamente la query de la propiedad actualizada
      queryClient.invalidateQueries({ queryKey: ['property', id] });
    },
    onError: (error) => {
      console.error('Error updating property:', error);
    }
  });
}

/**
 * Hook para eliminar una propiedad
 * Invalida las queries de propiedades después del éxito
 */
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      return await propertyService.deleteProperty(id);
    },
    onSuccess: (_, id) => {
      // Invalidar todas las queries de propiedades
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      // Remover la query específica de la propiedad eliminada del cache
      queryClient.removeQueries({ queryKey: ['property', id] });
    },
    onError: (error) => {
      console.error('Error deleting property:', error);
    }
  });
} 