'use client';
import PropertyList from '../../components/admin/PropertyList';
import { useEffect, useState } from 'react';
import { Property } from '../../types/property';
import { propertyService } from '../../../firebase/firestoreService';
import ThemeToggleButton from '../../components/ThemeToggleButton';

const ciudades = ['Medellin', 'Bogota', 'Cali', 'Pasto'];
const tipos = [
  { value: 'house', label: 'Casa' },
  { value: 'apartment', label: 'Apartamento' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'land', label: 'Terreno' },
];

export default function PropiedadesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const unsubscribe = propertyService.subscribeToProperties((properties) => {
      setProperties(properties);
      setFiltered(properties);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let result = [...properties];
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (city) result = result.filter(p => p.address && p.address.toLowerCase().includes(city.toLowerCase()));
    if (type) result = result.filter(p => p.type === type);
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
    setFiltered(result);
  }, [search, city, type, minPrice, maxPrice, properties]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-800">
      <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-6">Propiedades</h1>
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
        <PropertyList properties={filtered} />
      </div>
    </div>
  );
} 