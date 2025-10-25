/**
 * Componente de Sección de Propiedades por Categorías
 *
 * Reemplaza a GeneralPropertiesSection con una visualización por categorías
 * que se actualiza en tiempo real y muestra las propiedades agrupadas por tipo.
 * Incluye selector para tipos específicos de propiedades.
 */

"use client";

import { useState, useEffect } from "react";
import {
  usePropertiesByCategory,
  usePropertiesByType,
  getAllPropertyTypes,
  PropertyCategory,
} from "@/hooks/usePropertiesByCategory";
import { PropertyType } from "@/types/property";
import PropertyList from "@/components/admin/PropertyList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Building2 } from "lucide-react";
import Link from "next/link";

export default function PropertiesByCategorySection() {
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState<PropertyType | "">("");

  // Hook para obtener propiedades agrupadas por categorías
  const {
    data: categories = [],
    isLoading,
    error,
  } = usePropertiesByCategory(mounted);

  // Hook para obtener propiedades por tipo específico
  const {
    data: typeProperties = [],
    isLoading: isLoadingType,
    error: errorType,
  } = usePropertiesByType(
    selectedType as PropertyType,
    mounted && selectedType !== ""
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (process.env.NODE_ENV === "development") {
    console.log("🏠 [CATEGORIES] Estado:", {
      mounted,
      categoriesCount: categories.length,
      selectedType,
      isLoading,
      error,
    });
  }

  // Mostrar loading mientras se inicializa
  if (!mounted) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-custom-600 dark:text-custom-400 mx-auto mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400">Inicializando...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Encabezado de la sección */}
      <div className="text-center mb-12 lg:mb-16">
        <Badge
          variant="secondary"
          className="mb-4 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
        >
          Catálogo Organizado
        </Badge>
        <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Propiedades por
          <span className="block bg-gradient-to-r from-custom-600 to-custom-600 bg-clip-text text-transparent">
            categoría
          </span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Explora nuestras propiedades organizadas por categorías o busca un
          tipo específico
        </p>
      </div>

      {/* Contenido condicional basado en el estado de carga */}
      {isLoading ? (
        // Mostrar indicador de carga mientras se obtienen las propiedades
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-custom-600 dark:text-custom-400 mx-auto mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400">
              Cargando categorías...
            </p>
          </div>
        </div>
      ) : error ? (
        // Mostrar error si hay problema
        <div className="text-center py-16">
          <p className="text-lg text-red-600 dark:text-red-400">
            Error al cargar categorías:{" "}
            {error instanceof Error ? error.message : "Error desconocido"}
          </p>
        </div>
      ) : categories && categories.length > 0 ? (
        <>
          {/* Selector de tipos individuales */}
          <div className="mb-8">
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-shrink-0">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      Buscar por tipo específico:
                    </h3>
                  </div>
                  <div className="flex-grow max-w-md">
                    <Select
                      value={selectedType || "all"}
                      onValueChange={(value) => {
                        if (value === "all") {
                          setSelectedType("");
                        } else {
                          setSelectedType(value as PropertyType);
                        }
                      }}
                    >
                      <SelectTrigger className="border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
                        <SelectValue placeholder="Selecciona un tipo de propiedad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          Todas las categorías
                        </SelectItem>
                        {getAllPropertyTypes().map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedType && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedType("");
                      }}
                      className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mostrar propiedades del tipo específico seleccionado */}
          {selectedType ? (
            <div className="mt-0">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      {selectedType}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {isLoadingType
                        ? "Cargando..."
                        : `${typeProperties.length} ${
                            typeProperties.length === 1
                              ? "propiedad disponible"
                              : "propiedades disponibles"
                          }`}
                    </p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                    Tipo específico
                  </Badge>
                </div>
              </div>

              {isLoadingType ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-custom-600 dark:text-custom-400 mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Cargando propiedades de {selectedType}...
                    </p>
                  </div>
                </div>
              ) : errorType ? (
                <div className="text-center py-16">
                  <p className="text-lg text-red-600 dark:text-red-400">
                    Error al cargar propiedades:{" "}
                    {errorType instanceof Error
                      ? errorType.message
                      : "Error desconocido"}
                  </p>
                </div>
              ) : typeProperties.length > 0 ? (
                <PropertyList properties={typeProperties} />
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    No hay propiedades de tipo {selectedType} disponibles en
                    este momento.
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Mensaje inicial cuando no se ha seleccionado ningún tipo
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Selecciona un tipo de propiedad
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                Utiliza el selector arriba para filtrar y ver propiedades
                específicas
              </p>
            </div>
          )}

          {/* Botón para ver todas las propiedades */}
          <div className="text-center mt-12">
            <Link href="/propiedades">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver catálogo completo
              </Button>
            </Link>
          </div>
        </>
      ) : (
        // Mostrar mensaje cuando no hay propiedades disponibles
        <div className="text-center py-16">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No hay propiedades disponibles en este momento.
          </p>
          <div className="mt-6">
            <Link href="/propiedades">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Ver todas las propiedades
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
