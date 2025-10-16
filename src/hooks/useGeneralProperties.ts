/**
 * Hook personalizado para obtener propiedades generales (no destacadas)
 * Utiliza React Query para manejo de estado y caché
 */

import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/property";

/**
 * Hook para obtener propiedades generales (no destacadas)
 */
export function useGeneralProperties(enabled: boolean = true) {
  return useQuery<Property[]>({
    queryKey: ["general-properties"],
    queryFn: async () => {
      console.log("🔍 [API] Solicitando propiedades generales...");

      const response = await fetch("/api/propiedades/general");

      if (!response.ok) {
        throw new Error("Error al obtener propiedades generales");
      }

      const data = await response.json();
      console.log(
        "✅ [API] Propiedades generales encontradas:",
        data?.length || 0
      );

      return data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
}
