"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { usePaginatedProperties } from "../../hooks/usePaginatedProperties";
import PropertyList from "../../components/admin/PropertyList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Building2,
  Home,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const tipos = [
  { value: "Casa", label: "Casa", icon: Home },
  { value: "Apartamento", label: "Apartamento", icon: Building2 },
  { value: "Casa Campestre", label: "Casa Campestre", icon: Home },
  { value: "Penthouse", label: "Penthouse", icon: Building2 },
  { value: "Lote", label: "Lote", icon: MapPin },
  { value: "Oficina", label: "Oficina", icon: Building2 },
  { value: "Local", label: "Local", icon: Building2 },
  { value: "Bodega", label: "Bodega", icon: Building2 },
];

const ciudades = [
  "Pasto",
  "Medellín",
  "Bogotá",
  "Cali",
  "Chachagüí",
  "Consacá",
  "Buesaco",
  "Remolino",
  "Sandona",
  "San Fernando",
  "Catambuco",
  "La Cocha",
  "Túquerres",
];

const rangosPrecio = [
  { value: "200000000-300000000", label: "$200M - $300M" },
  { value: "300000000-500000000", label: "$300M - $500M" },
  { value: "500000000-800000000", label: "$500M - $800M" },
  { value: "800000000-1200000000", label: "$800M - $1,200M" },
  { value: "1200000000-1500000000", label: "$1,200M - $1,500M" },
  { value: "1500000000-2000000000", label: "$1,500M - $2,000M" },
  { value: "2000000000-", label: "Más de $2,000M" },
];

// Componente que usa useSearchParams
function PropiedadesContent() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Inicializar filtros desde los parámetros de la URL
  useEffect(() => {
    if (searchParams) {
      setCity(searchParams.get("city") || "");
      setType(searchParams.get("type") || "");

      // Procesar rango de precios desde URL
      const minPriceParam = searchParams.get("minPrice") || "";
      const maxPriceParam = searchParams.get("maxPrice") || "";

      if (minPriceParam || maxPriceParam) {
        const rangeValue = maxPriceParam
          ? `${minPriceParam}-${maxPriceParam}`
          : `${minPriceParam}-`;
        setPriceRange(rangeValue);
      }
    }
  }, [searchParams]);

  // Convertir priceRange a minPrice y maxPrice para el filtro
  const [minPrice, maxPrice] = priceRange ? priceRange.split("-") : ["", ""];

  const { data, isLoading, error } = usePaginatedProperties({
    page: currentPage,
    pageSize: 12,
    filters: {
      city,
      type,
      minPrice,
      maxPrice,
    },
  });

  const properties = data?.properties || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 12);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Error al cargar las propiedades
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Por favor, intenta de nuevo más tarde.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Verificar si hay filtros aplicados desde el home
  const hasFiltersFromHome = city || type || priceRange;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Propiedades disponibles
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Descubre nuestra exclusiva selección de propiedades de lujo en las
            mejores ubicaciones
          </p>

          {/* Mostrar filtros activos si vienen del home */}
          {hasFiltersFromHome && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400 mr-2">
                Filtros aplicados:
              </span>
              {city && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  Ciudad: {city}
                </Badge>
              )}
              {type && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  Tipo: {type}
                </Badge>
              )}
              {priceRange && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  Precio:{" "}
                  {rangosPrecio.find((r) => r.value === priceRange)?.label ||
                    priceRange}
                </Badge>
              )}
            </div>
          )}
        </div>

        <Card className="mb-8 border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Filtros de búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      <div className="flex items-center space-x-2">
                        <tipo.icon className="w-4 h-4" />
                        <span>{tipo.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
                  <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {ciudades.map((ciudad) => (
                    <SelectItem key={ciudad} value={ciudad}>
                      {ciudad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selector de rango de precio */}
              <Select
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
                  <SelectValue placeholder="Rango de precio" />
                </SelectTrigger>
                <SelectContent>
                  {rangosPrecio.map((rango) => (
                    <SelectItem key={rango.value} value={rango.value}>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{rango.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setCity("");
                  setType("");
                  setPriceRange("");
                }}
                className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-custom-600 dark:text-custom-400 mx-auto mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400">
                Cargando propiedades...
              </p>
            </div>
          </div>
        ) : (
          <>
            {total > 0 && (
              <div className="mb-8 text-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Mostrando{" "}
                  <span className="font-semibold text-custom-600 dark:text-custom-400">
                    {properties.length}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-custom-600 dark:text-custom-400">
                    {total}
                  </span>{" "}
                  propiedades
                </p>
              </div>
            )}

            <PropertyList properties={properties} />

            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={
                          currentPage === page
                            ? "bg-custom-600 hover:bg-custom-700 text-white"
                            : "border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {properties.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Building2 className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    No se encontraron propiedades
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    Intenta ajustar los filtros de búsqueda o contacta con
                    nosotros para más información.
                  </p>
                  <Button
                    onClick={() => {
                      setCity("");
                      setType("");
                      setPriceRange("");
                    }}
                    className="bg-custom-600 hover:bg-custom-700 text-white"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function PropiedadesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-custom-600" />
              <span className="ml-2 text-lg text-zinc-600 dark:text-zinc-400">
                Cargando propiedades...
              </span>
            </div>
          </div>
        </div>
      }
    >
      <PropiedadesContent />
    </Suspense>
  );
}
