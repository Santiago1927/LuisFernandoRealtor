'use client';

import PropertyList from '../../components/admin/PropertyList';
import { useState } from 'react';
import { usePaginatedProperties } from '../../hooks/usePaginatedProperties';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";

const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Pasto', 'Envigado', 'Rionegro'];
const tipos = [
  { value: 'house', label: 'Casa', icon: Building2 },
  { value: 'apartment', label: 'Apartamento', icon: Building2 },
  { value: 'commercial', label: 'Comercial', icon: Building2 },
  { value: 'land', label: 'Terreno', icon: MapPin },
];

export default function PropiedadesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePaginatedProperties({ page, pageSize: 12 });
  const total = data?.total || 0;
  const properties = data?.properties || [];
  const totalPages = Math.ceil(total / 12);
  const showVerMas = totalPages > 9 && page === 9;

  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            Catálogo Completo
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Propiedades
            <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Disponibles
            </span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explora nuestra colección completa de propiedades premium en las mejores ubicaciones
          </p>
        </div>

        <Card className="mb-12 border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
              <Filter className="w-5 h-5 text-amber-600" />
              <span>Filtros de Búsqueda</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              
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

              {/* Filtro por ciudad */}
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

              {/* Filtro por tipo */}
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
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(totalPages, 9) }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(i + 1)}
                      className={
                        page === i + 1
                          ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white border-0"
                          : "border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  {showVerMas && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page + 1)}
                      className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      ...
                    </Button>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {total > 0 && (
              <div className="text-center mt-8">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Mostrando {((page - 1) * 12) + 1} - {Math.min(page * 12, total)} de {total} propiedades
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 