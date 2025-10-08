"use client";

import MainSection from "../components/home/MainSection";
import HomeFilters from "@/components/home/HomeFilters";
import BackgroundCarousel from "@/components/home/BackgroundCarousel";
import PropertyList from "../components/admin/PropertyList";
import { useFeaturedProperties } from "../hooks/useFeaturedProperties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

/**
 * Componente Home - Página principal de la aplicación
 * Muestra la sección principal, carrusel y propiedades destacadas
 */
export default function Home() {
  // Hook personalizado para obtener las propiedades destacadas
  const { data: featuredProperties, isLoading } = useFeaturedProperties();

  return (
    <div className="min-h-screen">
      {/* Sección de filtros de búsqueda con carrusel de fondo */}
      <BackgroundCarousel>
        <HomeFilters />
      </BackgroundCarousel>

      {/* Sección principal con información de la empresa */}
      <div className="bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
        <MainSection />

        {/* Sección de propiedades destacadas */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Encabezado de la sección */}
          <div className="text-center mb-12 lg:mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
            >
              Catálogo Premium
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Propiedades
              <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Destacadas
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Descubre nuestra selección de propiedades premium en las mejores
              ubicaciones
            </p>
          </div>

          {/* Contenido condicional basado en el estado de carga */}
          {isLoading ? (
            // Mostrar indicador de carga mientras se obtienen las propiedades
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-amber-600 dark:text-amber-400 mx-auto mb-4" />
                <p className="text-zinc-600 dark:text-zinc-400">
                  Cargando propiedades...
                </p>
              </div>
            </div>
          ) : featuredProperties && featuredProperties.length > 0 ? (
            <>
              {/* Mostrar lista de propiedades si hay datos */}
              <PropertyList properties={featuredProperties} />

              {/* Botón para ver todas las propiedades */}
              <div className="text-center mt-12">
                <Link href="/propiedades">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Ver Todas las Propiedades
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
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
