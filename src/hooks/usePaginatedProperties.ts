import { useQuery } from '@tanstack/react-query';
import { getPaginatedProperties } from '../../firebase/firestoreService';
import { Property } from '../types/property';

interface UsePaginatedPropertiesProps {
  page: number;
  pageSize?: number;
}

interface PaginatedPropertiesResult {
  properties: Property[];
  total: number;
}

export function usePaginatedProperties({ page, pageSize = 12 }: UsePaginatedPropertiesProps) {
  return useQuery({
    queryKey: ['properties', page, pageSize],
    queryFn: () => getPaginatedProperties(page, pageSize),
    // keepPreviousData: true, // Descomenta si tu versión lo soporta
  });
}
