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
import {
  Loader2,
  Building2,
  Home,
  Store,
  Briefcase,
  TreePine,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

// Iconos para cada categoría
const CATEGORY_ICONS = {
  Residencial: Home,
  Locales: Store,
  Oficinas: Briefcase,
  Terrenos: TreePine,
};

// Colores para cada categoría
const CATEGORY_COLORS = {
  Residencial:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Locales:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
  Oficinas:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  Terrenos:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
};

export default function PropertiesByCategorySection() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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

  // Establecer la primera categoría como seleccionada por defecto
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory && !selectedType) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory, selectedType]);

  console.log("🏠 [CATEGORIES] Estado:", {
    mounted,
    categoriesCount: categories.length,
    selectedCategory,
    selectedType,
    isLoading,
    error,
  });

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
                          setSelectedCategory(categories[0]?.name || "");
                        } else {
                          setSelectedType(value as PropertyType);
                          setSelectedCategory(""); // Limpiar categoría seleccionada
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
                        setSelectedCategory(categories[0]?.name || "");
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

          {selectedType ? (
            // Mostrar propiedades del tipo específico seleccionado
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
            // Mostrar vista de categorías normales
            <>
              {/* Resumen de categorías */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {categories.map((category) => {
                  const IconComponent =
                    CATEGORY_ICONS[
                      category.name as keyof typeof CATEGORY_ICONS
                    ] || Building2;
                  const colorClass =
                    CATEGORY_COLORS[
                      category.name as keyof typeof CATEGORY_COLORS
                    ] || CATEGORY_COLORS["Residencial"];

                  return (
                    <Card
                      key={category.name}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedCategory === category.name
                          ? "ring-2 ring-custom-500 shadow-lg"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-3">
                          <IconComponent className="w-8 h-8 text-custom-600 dark:text-custom-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                          {category.name}
                        </h3>
                        <Badge className={colorClass}>
                          {category.count}{" "}
                          {category.count === 1 ? "propiedad" : "propiedades"}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Navegación de categorías */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => {
                  const IconComponent =
                    CATEGORY_ICONS[
                      category.name as keyof typeof CATEGORY_ICONS
                    ] || Building2;
                  const isActive = selectedCategory === category.name;

                  return (
                    <Button
                      key={category.name}
                      variant={isActive ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center space-x-2 ${
                        isActive
                          ? "bg-custom-600 hover:bg-custom-700 text-white"
                          : "border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">
                        {category.name.charAt(0)}
                      </span>
                    </Button>
                  );
                })}
              </div>

              {/* Contenido de la categoría seleccionada */}
              {categories.map((category) => {
                if (category.name !== selectedCategory) return null;

                return (
                  <div key={category.name} className="mt-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {category.name}
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-400">
                            {category.count}{" "}
                            {category.count === 1
                              ? "propiedad disponible"
                              : "propiedades disponibles"}
                          </p>
                        </div>
                        <Badge
                          className={
                            CATEGORY_COLORS[
                              category.name as keyof typeof CATEGORY_COLORS
                            ] || CATEGORY_COLORS["Residencial"]
                          }
                        >
                          {category.types.join(", ")}
                        </Badge>
                      </div>
                    </div>

                    {/* Lista de propiedades de la categoría */}
                    <PropertyList properties={category.properties} />
                  </div>
                );
              })}
            </>
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
