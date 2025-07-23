'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa el componente que muestra la lista de propiedades
import PropertyList from '../../components/admin/PropertyList';
// Importa el botón para cambiar el tema (claro/oscuro)
import ThemeToggleButton from '../../components/ThemeToggleButton';
// Importa el hook personalizado para la lógica de filtrado y búsqueda de propiedades
import { useState } from 'react';
import { usePaginatedProperties } from '../../hooks/usePaginatedProperties';

// Arreglo de ciudades disponibles para el filtro
const ciudades = ['Medellin', 'Bogota', 'Cali', 'Pasto'];
// Arreglo de tipos de propiedad disponibles para el filtro
const tipos = [
  { value: 'house', label: 'Casa' },
  { value: 'apartment', label: 'Apartamento' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'land', label: 'Terreno' },
];

// Componente principal de la página de listado de propiedades
export default function PropiedadesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePaginatedProperties({ page, pageSize: 12 });
  const total = data?.total || 0;
  const properties = data?.properties || [];
  const totalPages = Math.ceil(total / 12);
  const showVerMas = totalPages > 9 && page === 9;

  // Filtros (puedes implementar la lógica de filtros con backend más adelante)
  // Por ahora solo UI
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Botón de cambio de tema en la parte superior derecha */}
      {/* <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título de la página */}
        <h1 className="text-3xl font-bold text-yellow-500 mb-6">Propiedades</h1>
        {/* Filtros de búsqueda */}
        <div className="flex flex-wrap gap-4 mb-8 bg-gray-100 dark:bg-secondary-800 p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border-2 border-yellow-500 rounded w-48 bg-white text-black dark:bg-secondary-900 dark:text-white focus:border-yellow-400 focus:ring-0"
          />
          <select value={city} onChange={e => setCity(e.target.value)} className="px-3 py-2 border-2 border-yellow-500 rounded w-40 bg-white text-black dark:bg-secondary-900 dark:text-white focus:border-yellow-400 focus:ring-0">
            <option value="">Todas las ciudades</option>
            {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 border-2 border-yellow-500 rounded w-40 bg-white text-black dark:bg-secondary-900 dark:text-white focus:border-yellow-400 focus:ring-0">
            <option value="">Todos los tipos</option>
            {tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="px-3 py-2 border-2 border-yellow-500 rounded w-32 bg-white text-black dark:bg-secondary-900 dark:text-white focus:border-yellow-400 focus:ring-0"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="px-3 py-2 border-2 border-yellow-500 rounded w-32 bg-white text-black dark:bg-secondary-900 dark:text-white focus:border-yellow-400 focus:ring-0"
          />
        </div>
        {isLoading ? (
          <div className="text-center py-12">Cargando propiedades...</div>
        ) : (
          <PropertyList properties={properties} />
        )}
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