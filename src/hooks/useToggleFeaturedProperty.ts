import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../../firebase/firestoreService";

/**
 * Hook para cambiar el estado destacado de una propiedad
 * Invalida las queries relacionadas después del éxito
 */
export function useToggleFeaturedProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      await propertyService.toggleFeaturedProperty(id, featured);
      return { id, featured }; // Retornamos los datos para usarlos en onSuccess
    },
    onSuccess: (data) => {
      // Invalidar las queries relacionadas con propiedades
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["featured-properties"] });
      queryClient.invalidateQueries({ queryKey: ["paginated-properties"] });

      // ✅ CRUCIAL: Invalidar la query específica de la propiedad para que se actualice inmediatamente
      queryClient.invalidateQueries({ queryKey: ["property", data.id] });

      // Opcional: También actualizar directamente el cache para una respuesta inmediata
      queryClient.setQueryData(["property", data.id], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            publication_status: data.featured ? "Destacado" : "Disponible",
          };
        }
        return oldData;
      });
    },
    onError: (error) => {
      console.error("Error al cambiar estado destacado:", error);
    },
  });
}
