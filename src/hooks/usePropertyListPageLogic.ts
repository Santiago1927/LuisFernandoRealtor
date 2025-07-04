// Importa los hooks useEffect y useState de React para manejar efectos y estado local
import { useEffect, useState } from 'react';
// Importa el tipo Property para tipar las propiedades
import { Property } from '../types/property';
// Importa el servicio para interactuar con propiedades en Firestore
import { propertyService } from '../../firebase/firestoreService';

// Hook personalizado para manejar la lógica de la página de listado de propiedades
export function usePropertyListPageLogic() {
  // Estado para almacenar todas las propiedades obtenidas de la base de datos
  const [properties, setProperties] = useState<Property[]>([]);
  // Estado para almacenar las propiedades filtradas según los criterios de búsqueda
  const [filtered, setFiltered] = useState<Property[]>([]);
  // Estado para el texto de búsqueda por título
  const [search, setSearch] = useState('');
  // Estado para el filtro por ciudad
  const [city, setCity] = useState('');
  // Estado para el filtro por tipo de propiedad
  const [type, setType] = useState('');
  // Estado para el filtro de precio mínimo
  const [minPrice, setMinPrice] = useState('');
  // Estado para el filtro de precio máximo
  const [maxPrice, setMaxPrice] = useState('');

  // Efecto que suscribe a los cambios en las propiedades de Firestore
  useEffect(() => {
    const unsubscribe = propertyService.subscribeToProperties((properties) => {
      setProperties(properties); // Actualiza todas las propiedades
      setFiltered(properties); // Inicialmente, todas las propiedades están en el filtro
    });
    return () => unsubscribe(); // Limpia la suscripción al desmontar
  }, []);

  // Efecto que filtra las propiedades según los criterios de búsqueda y filtros
  useEffect(() => {
    let result = [...properties];
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase())); // Filtra por título
    if (city) result = result.filter(p => p.address && p.address.toLowerCase().includes(city.toLowerCase())); // Filtra por ciudad
    if (type) result = result.filter(p => p.type === type); // Filtra por tipo
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice)); // Filtra por precio mínimo
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice)); // Filtra por precio máximo
    setFiltered(result); // Actualiza el estado filtrado
  }, [search, city, type, minPrice, maxPrice, properties]);

  // Retorna los estados y funciones para ser usados en la página de listado de propiedades
  return {
    properties,
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
  };
} 