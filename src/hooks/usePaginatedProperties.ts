import { useQuery } from '@tanstack/react-query';
import { getPaginatedProperties } from '../../firebase/firestoreService';
import { Property } from '../types/property';

interface UsePaginatedPropertiesProps {
  page: number;
  pageSize?: number;
  filters?: {
    search?: string;
    city?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

interface PaginatedPropertiesResult {
  properties: Property[];
  total: number;
}

export function usePaginatedProperties({ page, pageSize = 12, filters = {} }: UsePaginatedPropertiesProps) {
  const { search, city, type, minPrice, maxPrice } = filters;
  
  // Verificar si hay filtros activos
  const hasActiveFilters = search || city || type || minPrice || maxPrice;
  
  return useQuery({
    queryKey: ['properties', page, pageSize, search, city, type, minPrice, maxPrice],
    queryFn: async () => {
      if (!hasActiveFilters) {
        // Sin filtros: usar paginación normal
        return await getPaginatedProperties(page, pageSize);
      } else {
        // Con filtros: obtener todas las propiedades y filtrar
        const allData = await getPaginatedProperties(1, 1000); // Obtener todas
        let filteredProperties = allData.properties;
        
        if (search) {
          const searchLower = search.toLowerCase();
          filteredProperties = filteredProperties.filter(property => 
            property.title?.toLowerCase().includes(searchLower) ||
            property.description?.toLowerCase().includes(searchLower)
          );
        }
        
        if (city) {
          filteredProperties = filteredProperties.filter(property => 
            property.city === city
          );
        }
        
        if (type) {
          filteredProperties = filteredProperties.filter(property => 
            property.type === type
          );
        }
        
        if (minPrice) {
          const min = parseInt(minPrice);
          filteredProperties = filteredProperties.filter(property => 
            property.price >= min
          );
        }
        
        if (maxPrice) {
          const max = parseInt(maxPrice);
          filteredProperties = filteredProperties.filter(property => 
            property.price <= max
          );
        }
        
        // Aplicar paginación a las propiedades filtradas
        const totalFiltered = filteredProperties.length;
        const offset = (page - 1) * pageSize;
        const paginatedProperties = filteredProperties.slice(offset, offset + pageSize);
        
        return {
          properties: paginatedProperties,
          total: totalFiltered,
          originalTotal: allData.total
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
}
