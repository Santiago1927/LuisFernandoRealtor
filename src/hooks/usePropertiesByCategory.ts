/**
 * Hook personalizado para obtener propiedades agrupadas por categorías
 * Utiliza React Query para manejo de estado y caché
 */

import { useQuery } from "@tanstack/react-query";
import { PropertyType, Property } from "@/types/property";

// Definir las categorías principales con sus tipos asociados
export const PROPERTY_CATEGORIES = {
  Residencial: [
    "Casa",
    "Apartamento",
    "Apartaestudio",
    "Casa Campestre",
    "Dúplex",
    "Tríplex",
    "Casa de Playa",
    "Cabaña",
    "Chalet",
    "Bungalow",
    "Campestre",
  ] as PropertyType[],
  Locales: ["Local"] as PropertyType[],
  Oficinas: ["Oficina", "Consultorio"] as PropertyType[],
  Terrenos: ["Lote", "Campos, Chacras y Quintas", "Finca"] as PropertyType[],
};

export interface PropertyCategory {
  name: string;
  properties: Property[];
  count: number;
  types: PropertyType[];
}

/**
 * Hook para obtener propiedades agrupadas por categorías
 */
export function usePropertiesByCategory(enabled: boolean = true) {
  return useQuery<PropertyCategory[]>({
    queryKey: ["properties-by-category"],
    queryFn: async () => {
      if (process.env.NODE_ENV === "development") {
        console.log("🔍 [API] Solicitando propiedades por categorías...");
      }

      // Obtener todas las propiedades disponibles
      const response = await fetch("/api/propiedades/general");

      if (!response.ok) {
        throw new Error("Error al obtener propiedades para categorización");
      }

      const allProperties: Property[] = await response.json();

      if (process.env.NODE_ENV === "development") {
        console.log(
          "✅ [API] Propiedades obtenidas:",
          allProperties?.length || 0
        );
      }

      // Agrupar propiedades por categorías
      const categories: PropertyCategory[] = [];

      Object.entries(PROPERTY_CATEGORIES).forEach(([categoryName, types]) => {
        const categoryProperties = allProperties.filter((property) =>
          types.includes(property.type)
        );

        // Solo incluir categorías que tengan propiedades
        if (categoryProperties.length > 0) {
          categories.push({
            name: categoryName,
            properties: categoryProperties,
            count: categoryProperties.length,
            types: types,
          });
        }
      });

      // Ordenar categorías por número de propiedades (mayor a menor)
      categories.sort((a, b) => b.count - a.count);

      if (process.env.NODE_ENV === "development") {
        console.log(
          "📊 [API] Categorías creadas:",
          categories.map((cat) => ({
            name: cat.name,
            count: cat.count,
          }))
        );
      }

      return categories;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
}

/**
 * Hook para obtener propiedades de una categoría específica
 */
export function usePropertiesBySpecificCategory(
  categoryName: string,
  enabled: boolean = true
) {
  return useQuery<Property[]>({
    queryKey: ["properties-category", categoryName],
    queryFn: async () => {
      console.log(
        `🔍 [API] Solicitando propiedades de categoría: ${categoryName}`
      );

      const response = await fetch("/api/propiedades/general");

      if (!response.ok) {
        throw new Error(
          `Error al obtener propiedades de categoría ${categoryName}`
        );
      }

      const allProperties: Property[] = await response.json();

      // Filtrar por los tipos de la categoría seleccionada
      const categoryTypes =
        PROPERTY_CATEGORIES[categoryName as keyof typeof PROPERTY_CATEGORIES];
      if (!categoryTypes) {
        throw new Error(`Categoría ${categoryName} no encontrada`);
      }

      const filteredProperties = allProperties.filter((property) =>
        categoryTypes.includes(property.type)
      );

      if (process.env.NODE_ENV === "development") {
        console.log(
          `✅ [API] Propiedades de ${categoryName}:`,
          filteredProperties.length
        );
      }

      return filteredProperties;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
}

/**
 * Hook para obtener propiedades de un tipo específico
 */
export function usePropertiesByType(
  propertyType: PropertyType,
  enabled: boolean = true
) {
  return useQuery<Property[]>({
    queryKey: ["properties-type", propertyType],
    queryFn: async () => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `🔍 [API] Solicitando propiedades de tipo: ${propertyType}`
        );
      }

      const response = await fetch("/api/propiedades/general");

      if (!response.ok) {
        throw new Error(`Error al obtener propiedades de tipo ${propertyType}`);
      }

      const allProperties: Property[] = await response.json();

      // Filtrar por el tipo específico
      const filteredProperties = allProperties.filter(
        (property) => property.type === propertyType
      );

      if (process.env.NODE_ENV === "development") {
        console.log(
          `✅ [API] Propiedades de tipo ${propertyType}:`,
          filteredProperties.length
        );
      }

      return filteredProperties;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
}

/**
 * Función para obtener todos los tipos de propiedades disponibles
 */
export function getAllPropertyTypes(): PropertyType[] {
  return Object.values(PROPERTY_CATEGORIES).flat();
}
