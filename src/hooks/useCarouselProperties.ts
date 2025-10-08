import { useQuery } from "@tanstack/react-query";
import { getPaginatedProperties } from "../../firebase/firestoreService";
import { Property } from "../types/property";

/**
 * Hook para obtener las propiedades del carrusel principal
 *
 * Este hook obtiene las primeras 6 propiedades más recientes para mostrar
 * en el carrusel principal del home (sección superior).
 */
export function useCarouselProperties() {
  return useQuery({
    queryKey: ["carousel-properties", Date.now()], // Agregar timestamp para forzar refresh
    queryFn: async () => {
      console.log(
        "🔄 [CAROUSEL] Obteniendo propiedades frescas desde Firestore..."
      );
      // Obtener las primeras 6 propiedades para el carrusel
      const result = await getPaginatedProperties(1, 6);
      console.log(
        "📋 [CAROUSEL] Propiedades obtenidas:",
        result.properties.length
      );
      return result.properties as Property[];
    },
    staleTime: 0, // Forzar revalidación inmediata
    gcTime: 1000, // Limpiar cache más rápido
  });
}
