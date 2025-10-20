"use client";

import MainSection from "../components/home/MainSection";
import HomeFilters from "@/components/home/HomeFilters";
import BackgroundCarousel from "@/components/home/BackgroundCarousel";
import PropertiesByCategorySection from "@/components/home/PropertiesByCategorySection";
import PropertyList from "../components/admin/PropertyList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Property } from "../types/property";

/**
 * Componente FeaturedPropertiesSection - Sección de propiedades destacadas
 * Carga las propiedades destacadas usando fetch API
 */
function FeaturedPropertiesSection() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente se monte en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    console.log("🚀 [FEATURED] useEffect ejecutándose después de mount...");
    let isMounted = true;

    const loadFeaturedProperties = async () => {
      try {
        console.log("🔍 [FEATURED] Cargando propiedades destacadas...");
        setIsLoading(true);

        const response = await fetch("/api/propiedades/featured", {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const properties = await response.json();

        if (isMounted) {
          console.log("✅ [FEATURED] Propiedades cargadas:", properties.length);
          console.log(
            "📋 [FEATURED] Propiedades:",
            properties.map((p: Property) => p.title)
          );
          setFeaturedProperties(properties);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("❌ [FEATURED] Error:", err);
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Ejecutar con un pequeño delay para asegurar hidratación
    const timeoutId = setTimeout(loadFeaturedProperties, 500);

    return () => {
      clearTimeout(timeoutId);
      isMounted = false;
    };
  }, [mounted]);

  console.log("🏠 [FEATURED] Estado:", {
    mounted,
    count: featuredProperties.length,
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
          className="mb-4 bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300 border-custom-200 dark:border-custom-800"
        >
          Catálogo Premium
        </Badge>
        <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Propiedades
          <span className="block bg-gradient-to-r from-custom-600 to-custom-600 bg-clip-text text-transparent">
            destacadas
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
            Error al cargar propiedades: {error}
          </p>
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
                className="bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver todas las propiedades
              </Button>
            </Link>
          </div>
        </>
      ) : (
        // Mostrar mensaje cuando no hay propiedades disponibles
        <div className="text-center py-16">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No hay propiedades destacadas disponibles en este momento.
          </p>
        </div>
      )}
    </section>
  );
}

/**
 * Componente Home - Página principal de la aplicación
 * Muestra la sección principal, carrusel y propiedades destacadas
 * Versión corregida con componente separado para propiedades destacadas
 */
export default function Home() {
  console.log("🏠 [HOME] Componente Home renderizándose...");

  return (
    <div className="min-h-screen">
      {/* Sección de filtros de búsqueda con carrusel de fondo */}
      <BackgroundCarousel>
        <HomeFilters />
      </BackgroundCarousel>

      {/* Sección principal con información de la empresa */}
      <div className="bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
        <MainSection />

        {/* Sección de propiedades destacadas */}
        <FeaturedPropertiesSection />

        {/* Sección de propiedades por categoría */}
        <PropertiesByCategorySection />
      </div>
    </div>
  );
}
