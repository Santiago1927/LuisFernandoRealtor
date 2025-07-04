'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa el componente que muestra la lista de propiedades
import PropertyList from '../../components/admin/PropertyList';
// Importa el botón para cambiar el tema (claro/oscuro)
import ThemeToggleButton from '../../components/ThemeToggleButton';
// Importa el hook personalizado para la lógica de filtrado y búsqueda de propiedades
import { usePropertyListPageLogic } from '../../hooks/usePropertyListPageLogic';

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
  // Usa el hook para obtener los estados y funciones de filtrado y búsqueda
  const {
    filtered,
    search,
    setSearch,
    city,
    setCity,
    type,
    setType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = usePropertyListPageLogic();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-800">
      {/* Botón de cambio de tema en la parte superior derecha */}
      <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título de la página */}
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-6">Propiedades</h1>
        {/* Filtros de búsqueda */}
        <div className="flex flex-wrap gap-4 mb-8 bg-white dark:bg-primary-900 p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded w-48 dark:bg-primary-800 dark:text-white"
          />
          <select value={city} onChange={e => setCity(e.target.value)} className="px-3 py-2 border rounded w-40 dark:bg-primary-800 dark:text-white">
            <option value="">Todas las ciudades</option>
            {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 border rounded w-40 dark:bg-primary-800 dark:text-white">
            <option value="">Todos los tipos</option>
            {tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="px-3 py-2 border rounded w-32 dark:bg-primary-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="px-3 py-2 border rounded w-32 dark:bg-primary-800 dark:text-white"
          />
        </div>
        {/* Lista de propiedades filtradas */}
        <PropertyList properties={filtered} />
      </div>
    </div>
  );
} 