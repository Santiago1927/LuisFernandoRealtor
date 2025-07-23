'use client';
import CarouselSection from "@/components/CarouselSection";
import MainSection from "../components/MainSection";
import PropertyList from "../components/admin/PropertyList";
import { useState } from "react";
import { usePaginatedProperties } from "../hooks/usePaginatedProperties";
import { Property } from "../types/property";

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <MainSection />
      {/* Carrusel de imágenes fuera del contenedor para ancho completo */}
      <div className="w-full mb-10">
        <CarouselSection />
      </div>
      <div className="w-full px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Propiedades Destacadas</h2>
        {isLoading ? (
          <div className="text-center py-12">Cargando propiedades...</div>
        ) : (
          <PropertyList properties={properties} />
        )}
        {/* Paginación */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.min(totalPages, 9) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
          {showVerMas && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded bg-yellow-500 text-black font-bold"
            >
              Ver más
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
