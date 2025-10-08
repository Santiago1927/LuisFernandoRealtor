"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  DollarSign,
  Building2,
  Home,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const ciudades = ["Pasto", "Medellín", "Bogotá", "Cali"];

const rangosPrecio = [
  { value: "200000000-300000000", label: "$200M - $300M" },
  { value: "300000000-500000000", label: "$300M - $500M" },
  { value: "500000000-800000000", label: "$500M - $800M" },
  { value: "800000000-1000000000", label: "$800M - $1,000M" },
  { value: "1000000000-1500000000", label: "$1,000M - $1,500M" },
  { value: "1500000000-2000000000", label: "$1,500M - $2,000M" },
  { value: "2000000000-", label: "Más de $2,000M" },
];

/**
 * Componente de filtros para la página principal (Home)
 * Permite filtrar propiedades por búsqueda, ciudad, tipo y precio
 */
export default function HomeFilters() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Función para aplicar filtros y navegar a la página de propiedades
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (type) params.set("type", type);

    // Procesar rango de precios
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
    }

    const queryString = params.toString();
    const url = queryString ? `/propiedades?${queryString}` : "/propiedades";

    router.push(url);
  };

  // Función para limpiar todos los filtros
  const handleClearFilters = () => {
    setCity("");
    setType("");
    setPriceRange("");
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-32 lg:pb-12">
      {/* Botón Comprar prominente */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-custom-600 to-custom-600 rounded-3xl blur opacity-40 animate-pulse"></div>
          <Link href="/propiedades">
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-xl px-12 py-6 rounded-2xl transform hover:scale-105"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              COMPRAR PROPIEDAD
            </Button>
          </Link>
        </div>
        <p className="text-sm text-white/90 dark:text-white/80 mt-3 font-medium drop-shadow-lg">
          Explora todas nuestras propiedades disponibles
        </p>
      </div>

      {/* Card con filtros de búsqueda */}
      <Card className="border-0 shadow-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
        <CardContent className="p-6 lg:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Encuentra tu propiedad ideal
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Utiliza nuestros filtros para encontrar exactamente lo que buscas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Selector de tipo de propiedad - PRIMERO */}
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-12 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
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

            {/* Selector de ciudad */}
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
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
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-custom-500 dark:focus:border-custom-400">
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
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleSearch}
              size="lg"
              className="bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar propiedades
            </Button>

            <Button
              onClick={handleClearFilters}
              variant="outline"
              size="lg"
              className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-8 py-3"
            >
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
