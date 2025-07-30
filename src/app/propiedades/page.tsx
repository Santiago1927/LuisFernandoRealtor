'use client';

import { useState, useEffect } from 'react';
import { usePaginatedProperties } from '../../hooks/usePaginatedProperties';
import PropertyList from '../../components/admin/PropertyList';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  DollarSign, 
  Building2, 
  Home, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Loader2
} from "lucide-react";

const tipos = [
  { value: 'Casa', label: 'Casa', icon: Home },
  { value: 'Apartamento', label: 'Apartamento', icon: Building2 },
  { value: 'Casa Campestre', label: 'Casa Campestre', icon: Home },
  { value: 'Penthouse', label: 'Penthouse', icon: Building2 },
  { value: 'Lote', label: 'Lote', icon: MapPin },
  { value: 'Oficina', label: 'Oficina', icon: Building2 },
  { value: 'Local', label: 'Local', icon: Building2 },
  { value: 'Bodega', label: 'Bodega', icon: Building2 },
];

const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Pasto'];

export default function PropiedadesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { data, isLoading, error } = usePaginatedProperties({ 
    page: currentPage, 
    pageSize: 12,
    filters: {
      search,
      city,
      type,
      minPrice,
      maxPrice
    }
  });

  const properties = data?.properties || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 12);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Propiedades Disponibles
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Descubre nuestra exclusiva selección de propiedades de lujo en las mejores ubicaciones
          </p>
        </div>

        <Card className="mb-8 border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>

              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-amber-500 dark:focus:border-amber-400">
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

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-amber-500 dark:focus:border-amber-400">
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

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  type="number"
                  placeholder="Precio mínimo"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="pl-10 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  type="number"
                  placeholder="Precio máximo"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="pl-10 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSearch('');
                  setCity('');
                  setType('');
                  setMinPrice('');
                  setMaxPrice('');
                }}
                className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600 dark:text-amber-400 mx-auto mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400">Cargando propiedades...</p>
            </div>
          </div>
        ) : (
          <>
            {total > 0 && (
              <div className="mb-8 text-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Mostrando <span className="font-semibold text-amber-600 dark:text-amber-400">{properties.length}</span> de <span className="font-semibold text-amber-600 dark:text-amber-400">{total}</span> propiedades
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page 
                        ? "bg-amber-600 hover:bg-amber-700 text-white" 
                        : "border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }
                    >
                      {page}
                    </Button>
                  ))}
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
                    Intenta ajustar los filtros de búsqueda o contacta con nosotros para más información.
                  </p>
                  <Button
                    onClick={() => {
                      setSearch('');
                      setCity('');
                      setType('');
                      setMinPrice('');
                      setMaxPrice('');
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Limpiar Filtros
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