import { useQuery } from "@tanstack/react-query";
import { getPaginatedProperties } from "../../firebase/firestoreService";
import { Property } from "../types/property";

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

export function usePaginatedProperties({
  page,
  pageSize = 12,
  filters = {},
}: UsePaginatedPropertiesProps) {
  const { search, city, type, minPrice, maxPrice } = filters;

  // Normalizar filtros: tratar "all" como sin filtro
  const normalizedCity = city && city !== "all" ? city : "";
  const normalizedType = type && type !== "all" ? type : "";

  // Verificar si hay filtros activos
  const hasActiveFilters =
    search || normalizedCity || normalizedType || minPrice || maxPrice;

  return useQuery({
    queryKey: [
      "properties",
      page,
      pageSize,
      search,
      normalizedCity,
      normalizedType,
      minPrice,
      maxPrice,
    ],
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
          filteredProperties = filteredProperties.filter(
            (property) =>
              property.title?.toLowerCase().includes(searchLower) ||
              property.description?.toLowerCase().includes(searchLower)
          );
        }

        if (normalizedCity) {
          filteredProperties = filteredProperties.filter(
            (property) => property.city === normalizedCity
          );
        }

        if (normalizedType) {
          filteredProperties = filteredProperties.filter(
            (property) => property.type === normalizedType
          );
        }

        if (minPrice) {
          const min = parseInt(minPrice);
          filteredProperties = filteredProperties.filter(
            (property) => property.price >= min
          );
        }

        if (maxPrice) {
          const max = parseInt(maxPrice);
          filteredProperties = filteredProperties.filter(
            (property) => property.price <= max
          );
        }

        // Aplicar paginación a las propiedades filtradas
        const totalFiltered = filteredProperties.length;
        const offset = (page - 1) * pageSize;
        const paginatedProperties = filteredProperties.slice(
          offset,
          offset + pageSize
        );

        return {
          properties: paginatedProperties,
          total: totalFiltered,
          originalTotal: allData.total,
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
}
