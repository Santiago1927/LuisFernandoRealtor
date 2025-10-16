import { useQuery } from "@tanstack/react-query";
import { Property } from "../types/property";

/**
 * Hook para obtener las propiedades destacadas
 *
 * Este hook obtiene las propiedades que tienen publication_status = "Destacado"
 * ordenadas por fecha de creación (más recientes primero).
 * Si no hay propiedades destacadas, fallback a las 8 más recientes.
 */
export function useFeaturedProperties() {
  return useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      try {
        console.log(
          "🔍 [HOOK] Iniciando búsqueda de propiedades destacadas via API..."
        );

        const response = await fetch("/api/propiedades/featured");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const properties = await response.json();
        console.log(
          "📊 [HOOK] Propiedades obtenidas via API:",
          properties.length
        );
        console.log(
          "📝 [HOOK] Propiedades:",
          properties.map((p: Property) => ({
            id: p.id,
            title: p.title,
            publication_status: p.publication_status,
          }))
        );

        return properties as Property[];
      } catch (error) {
        console.error("❌ [HOOK] Error fetching featured properties:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}
