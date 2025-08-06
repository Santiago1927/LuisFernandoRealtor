import { useQuery } from '@tanstack/react-query';
import { getPaginatedProperties } from '../../firebase/firestoreService';
import { Property } from '../types/property';

/**
 * Hook para obtener las propiedades del carrusel principal
 * 
 * Este hook obtiene las primeras 6 propiedades más recientes para mostrar
 * en el carrusel principal del home (sección superior).
 */
export function useCarouselProperties() {
  return useQuery({
    queryKey: ['carousel-properties'],
    queryFn: async () => {
      // Obtener las primeras 6 propiedades para el carrusel
      const result = await getPaginatedProperties(1, 6);
      return result.properties as Property[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}