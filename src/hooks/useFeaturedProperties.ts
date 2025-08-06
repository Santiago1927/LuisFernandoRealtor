import { useQuery } from '@tanstack/react-query';
import { getPaginatedProperties } from '../../firebase/firestoreService';
import { Property } from '../types/property';

/**
 * Hook para obtener las 8 propiedades destacadas más recientes
 * 
 * Este hook obtiene las propiedades más recientes ordenadas por fecha de creación
 * y las limita a 8 para mostrar en la sección destacada del home.
 */
export function useFeaturedProperties() {
  return useQuery({
    queryKey: ['featured-properties'],
    queryFn: async () => {
      // Obtener solo las primeras 8 propiedades (página 1, tamaño 8)
      const result = await getPaginatedProperties(1, 8);
      return result.properties as Property[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}