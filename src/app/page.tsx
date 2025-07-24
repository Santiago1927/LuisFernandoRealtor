'use client';

import CarouselSection from "@/components/CarouselSection";
import MainSection from "../components/MainSection";
import PropertyList from "../components/admin/PropertyList";
import { useState } from "react";
import { usePaginatedProperties } from "../hooks/usePaginatedProperties";
import { Property } from "../types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedPropertiesResult {
  properties: Property[];
  total: number;
}

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePaginatedProperties({ page, pageSize: 12 });
  const total = (data as PaginatedPropertiesResult | undefined)?.total || 0;
  const properties = (data as PaginatedPropertiesResult | undefined)?.properties || [];
  const totalPages = Math.ceil(total / 12);
  const showVerMas = totalPages > 9 && page === 9;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <MainSection />
      
      <div className="w-full mb-16">
        <CarouselSection />
      </div>
      
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            Catálogo Premium
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Propiedades
            <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Destacadas
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Descubre nuestra selección de propiedades premium en las mejores ubicaciones
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600 dark:text-amber-400 mx-auto mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400">Cargando propiedades...</p>
            </div>
          </div>
        ) : (
          <>
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
      </section>
    </div>
  );
}
