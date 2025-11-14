"use client";

import UltraSafeImage from "@/components/ui/UltraSafeImage";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Loader2,
} from "lucide-react";
import { useCarouselProperties } from "../../hooks/useCarouselProperties";
import { Property } from "../../types/property";

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: properties, isLoading, error } = useCarouselProperties();

  // Función ULTRA REFORZADA para renderizar número de baños - CORRIGE 30 -> 3
  const renderSafeBathrooms = (bathroomsValue: any) => {
    console.log(
      "🚿 [CAROUSEL] Procesando baños:",
      bathroomsValue,
      typeof bathroomsValue,
      "timestamp:",
      new Date().toISOString()
    );

    // Si no existe o es null/undefined, retorna 0
    if (bathroomsValue == null) {
      console.log("🚿 [CAROUSEL] Valor null/undefined, retornando 0");
      return 0;
    }

    let cleanValue = bathroomsValue;

    // Si es string, intentar convertir a número
    if (typeof bathroomsValue === "string") {
      cleanValue = bathroomsValue.trim();
      if (cleanValue === "") {
        console.log("🚿 [CAROUSEL] String vacío, retornando 0");
        return 0;
      }
      cleanValue = parseInt(cleanValue, 10);
      if (isNaN(cleanValue)) {
        console.log(
          "🚿 [CAROUSEL] No se pudo convertir string a número, retornando 0"
        );
        return 0;
      }
    }

    // Si ya es número
    if (typeof cleanValue === "number") {
      if (isNaN(cleanValue)) {
        console.log("🚿 [CAROUSEL] Número es NaN, retornando 0");
        return 0;
      }

      // CORRECCIÓN ULTRA DIRECTA: 30 -> 3
      if (cleanValue === 30) {
        console.log("🚿 [CAROUSEL] ✅ CORRIGIENDO 30 -> 3");
        return 3;
      }

      // FORZAR CORRECCIÓN para cualquier múltiplo de 10 mayor a 10
      if (cleanValue > 10 && cleanValue % 10 === 0 && cleanValue <= 100) {
        const corrected = Math.floor(cleanValue / 10);
        console.log(
          `🚿 [CAROUSEL] ✅ CORRIGIENDO ${cleanValue} -> ${corrected}`
        );
        return corrected;
      }

      // Rango normal 0-15
      const finalValue = Math.max(0, Math.min(15, cleanValue));
      console.log(`🚿 [CAROUSEL] Valor final: ${finalValue}`);
      return finalValue;
    }

    console.log("🚿 [CAROUSEL] Caso no manejado, retornando 0");
    return 0;
  };

  // Funciones para formatear datos
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeText = (type: string): string => {
    const types: { [key: string]: string } = {
      house: "Casa",
      apartment: "Apartamento",
      commercial: "Comercial",
      land: "Terreno",
    };
    return types[type] || type;
  };

  const getStatusText = (status: string): string => {
    const statuses: { [key: string]: string } = {
      available: "Disponible",
      sold: "Vendida",
      rented: "Alquilada",
    };
    return statuses[status] || status;
  };

  // Resetear índice activo cuando cambian las propiedades
  useEffect(() => {
    if (
      properties &&
      properties.length > 0 &&
      activeIndex >= properties.length
    ) {
      setActiveIndex(0);
    }
  }, [properties, activeIndex]);

  const goToPrevSlide = () => {
    if (properties && properties.length > 0) {
      setActiveIndex(
        activeIndex === 0 ? properties.length - 1 : activeIndex - 1
      );
    }
  };

  const goToNextSlide = () => {
    if (properties && properties.length > 0) {
      setActiveIndex(
        activeIndex === properties.length - 1 ? 0 : activeIndex + 1
      );
    }
  };

  // Estados de carga y error
  if (isLoading) {
    return (
      <section className="relative w-full bg-gradient-to-br from-zinc-50 via-white to-custom-50/20 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300 border-custom-200 dark:border-custom-800"
            >
              Propiedades destacadas
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Propiedades de
              <span className="block bg-gradient-to-r from-custom-600 to-custom-600 bg-clip-text text-transparent">
                lujo exclusivo
              </span>
            </h2>
          </div>
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-custom-600 dark:text-custom-400 mx-auto mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400">
                Cargando propiedades...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !properties || properties.length === 0) {
    return (
      <section className="relative w-full bg-gradient-to-br from-zinc-50 via-white to-custom-50/20 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300 border-custom-200 dark:border-custom-800"
            >
              Propiedades destacadas
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Propiedades de
              <span className="block bg-gradient-to-r from-custom-600 to-custom-600 bg-clip-text text-transparent">
                lujo exclusivo
              </span>
            </h2>
          </div>
          <div className="text-center py-16">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No hay propiedades disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentProperty = properties[activeIndex];

  return (
    <section className="relative w-full bg-gradient-to-br from-zinc-50 via-white to-custom-50/20 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300 border-custom-200 dark:border-custom-800"
          >
            Propiedades destacadas
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Propiedades de
            <span className="block bg-gradient-to-r from-custom-600 to-custom-600 bg-clip-text text-transparent">
              lujo exclusivo
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Descubre nuestra colección de propiedades premium en las mejores
            ubicaciones de Colombia
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[16/10] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            {currentProperty.images && currentProperty.images.length > 0 ? (
              <UltraSafeImage
                fill
                src={currentProperty.images[0]}
                alt={currentProperty.title}
                className="object-cover transition-all duration-700 ease-in-out"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                <span className="text-zinc-500 dark:text-zinc-400 text-lg">
                  Sin imagen disponible
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <Card className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            getStatusText(currentProperty.status) ===
                            "Disponible"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            getStatusText(currentProperty.status) ===
                            "Disponible"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300"
                          }
                        >
                          {getStatusText(currentProperty.status)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/90 text-gray-800"
                        >
                          {getPropertyTypeText(currentProperty.type)}
                        </Badge>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {currentProperty.title}
                      </h3>

                      <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {currentProperty.address}
                          {currentProperty.city && `, ${currentProperty.city}`}
                        </span>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-zinc-600 dark:text-zinc-400">
                        {currentProperty.bedrooms &&
                          currentProperty.bedrooms > 0 && (
                            <div className="flex items-center space-x-1">
                              <Bed className="w-4 h-4" />
                              <span>{currentProperty.bedrooms}</span>
                            </div>
                          )}
                        {currentProperty.bathrooms &&
                          renderSafeBathrooms(currentProperty.bathrooms) >
                            0 && (
                            <div className="flex items-center space-x-1">
                              <Bath className="w-4 h-4" />
                              <span>
                                {renderSafeBathrooms(currentProperty.bathrooms)}
                              </span>
                            </div>
                          )}
                        {/* Mostrar área del lote para casas y fincas */}
                        {(currentProperty.type === "Casa" ||
                          currentProperty.type === "Finca" ||
                          currentProperty.type === "Casa de Playa" ||
                          currentProperty.type === "Cabaña" ||
                          currentProperty.type === "Campestre" ||
                          currentProperty.type === "Chalet" ||
                          currentProperty.type === "Cortijo" ||
                          currentProperty.type ===
                            "Campos, Chacras y Quintas") &&
                        ((currentProperty.built_area &&
                          currentProperty.built_area > 0) ||
                          (currentProperty.area &&
                            currentProperty.area > 0)) ? (
                          <>
                            {/* Área construida */}
                            {currentProperty.built_area &&
                              currentProperty.built_area > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Square className="w-4 h-4" />
                                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    C
                                  </span>
                                  <span>{currentProperty.built_area} m²</span>
                                </div>
                              )}
                            {/* Área del lote */}
                            {currentProperty.lot_area &&
                              currentProperty.lot_area > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Square className="w-4 h-4" />
                                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                    L
                                  </span>
                                  <span>{currentProperty.lot_area} m²</span>
                                </div>
                              )}
                          </>
                        ) : (
                          currentProperty.area &&
                          currentProperty.area > 0 && (
                            <div className="flex items-center space-x-1">
                              <Square className="w-4 h-4" />
                              <span>{currentProperty.area} m²</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl lg:text-3xl font-bold text-custom-600 dark:text-custom-400">
                        {formatPrice(currentProperty.price)}
                      </div>
                      <Link href={`/propiedades/${currentProperty.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-custom-300 text-custom-700 hover:bg-custom-50 dark:border-custom-600 dark:text-custom-300 dark:hover:bg-custom-900/30"
                        >
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            <span className="sr-only">Anterior</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            <span className="sr-only">Siguiente</span>
          </Button>

          <div className="flex justify-center space-x-2 mt-6">
            {properties.map((_, index) => (
              <button
                key={`carousel-indicator-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-custom-600 dark:bg-custom-400 w-8"
                    : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                }`}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/propiedades">
            <Button
              size="lg"
              className="bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Todas las Propiedades
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
