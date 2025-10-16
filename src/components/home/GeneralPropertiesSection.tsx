/**
 * Componente de Sección de Propiedades Generales
 *
 * Muestra todas las propiedades que NO están destacadas en una sección separada.
 * Incluye manejo de estados de carga, error y vacío.
 */

"use client";

import { useState, useEffect } from "react";
import { useGeneralProperties } from "@/hooks/useGeneralProperties";
import PropertyList from "@/components/admin/PropertyList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function GeneralPropertiesSection() {
  const [mounted, setMounted] = useState(false);

  // Hook para obtener propiedades generales
  const {
    data: generalProperties = [],
    isLoading,
    error,
  } = useGeneralProperties(mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("🏠 [GENERAL] Estado:", {
    mounted,
    count: generalProperties.length,
    isLoading,
    error,
  });

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
          Catálogo Completo
        </Badge>
        <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Propiedades
          <span className="block bg-gradient-to-r from-custom-600 to-custom-600 bg-clip-text text-transparent">
            generales
          </span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Explora todas nuestras propiedades disponibles en diferentes
          ubicaciones y categorías
        </p>
      </div>

      {/* Contenido condicional basado en el estado de carga */}
      {isLoading ? (
        // Mostrar indicador de carga mientras se obtienen las propiedades
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-custom-600 dark:text-custom-400 mx-auto mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400">
              Cargando propiedades...
            </p>
          </div>
        </div>
      ) : error ? (
        // Mostrar error si hay problema
        <div className="text-center py-16">
          <p className="text-lg text-red-600 dark:text-red-400">
            Error al cargar propiedades:{" "}
            {error instanceof Error ? error.message : "Error desconocido"}
          </p>
        </div>
      ) : generalProperties && generalProperties.length > 0 ? (
        <>
          {/* Mostrar lista de propiedades si hay datos */}
          <PropertyList properties={generalProperties} />

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
            No hay propiedades generales disponibles en este momento.
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
