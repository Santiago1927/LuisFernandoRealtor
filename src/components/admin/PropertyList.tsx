'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa React para usar JSX y componentes funcionales
import React from 'react';
// Importa el tipo Property para tipar las propiedades
import { Property } from '../../types/property';
// Importa Link de Next.js para navegación entre páginas
import Link from 'next/link';
// Importa el hook personalizado para la lógica de navegación de imágenes en la tarjeta
import { usePropertyCardLogic } from '../../hooks/usePropertyCardLogic';

// Interfaz de las props que recibe la lista de propiedades
interface PropertyListProps {
  properties: Property[]; // Arreglo de propiedades a mostrar
  onEdit?: (property: Property) => void; // Función para editar una propiedad (opcional)
  onDelete?: (id: string) => void; // Función para eliminar una propiedad (opcional)
}

// Componente para mostrar una tarjeta individual de propiedad
function PropertyCard({ property, onEdit, onDelete }: any) {
  // Obtiene el arreglo de imágenes de la propiedad
  const images = Array.isArray(property.images) ? property.images : [];
  // Usa el hook para manejar la navegación de imágenes
  const { activeImage, nextImage, prevImage } = usePropertyCardLogic(images);
  return (
    // Enlace a la página de detalle de la propiedad
    <Link href={`/propiedades/${property.id}`} className="block">
      <div className="bg-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        {/* Carrusel de imágenes de la propiedad */}
        <div className="relative aspect-w-16 aspect-h-9 bg-primary-50 flex items-center justify-center">
          {images.length > 0 ? (
            <>
              <img
                src={images[activeImage]}
                alt={property.title}
                className="w-full h-56 object-cover object-center rounded-t-2xl"
              />
              {images.length > 1 && (
                <>
                  {/* Botón para imagen anterior */}
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary-100/80 rounded-full p-1 hover:bg-primary-400 hover:text-white transition-colors shadow">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {/* Botón para imagen siguiente */}
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-100/80 rounded-full p-1 hover:bg-primary-400 hover:text-white transition-colors shadow">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </>
          ) : (
            // Si no hay imágenes, muestra un ícono de imagen vacía
            <div className="w-full h-56 flex items-center justify-center text-primary-200">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        {/* Información de la propiedad */}
        <div className="p-6 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-primary-700 truncate">
              {property.title}
            </h3>
            {/* Estado de la propiedad */}
            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
              property.status === 'available' ? 'bg-green-50 text-green-700' :
              property.status === 'sold' ? 'bg-red-50 text-red-700' :
              'bg-yellow-50 text-yellow-700'
            }`}>
              {property.status === 'available' ? 'Disponible' :
               property.status === 'sold' ? 'Vendida' : 'Alquilada'}
            </span>
          </div>
          {/* Dirección de la propiedad */}
          <p className="text-sm text-gray-700 mb-2">
            {property.address}
          </p>
          {/* Precio y características principales */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-extrabold text-primary-700">
              ${property.price.toLocaleString()}
            </span>
            <div className="flex space-x-2 text-sm text-primary-500">
              {property.bedrooms && (
                <span>{property.bedrooms} hab</span>
              )}
              {property.bathrooms && (
                <span>{property.bathrooms} baños</span>
              )}
              {property.area && (
                <span>{property.area}m²</span>
              )}
            </div>
          </div>
          {/* Descripción corta de la propiedad */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {property.description}
          </p>
          {/* Acciones de editar y eliminar, si están disponibles */}
          {(onEdit || onDelete) && (
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={e => { e.preventDefault(); onEdit(property); }}
                  className="flex-1 px-3 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Editar
                </button>
              )}
              {onDelete && (
                <button
                  onClick={e => { e.preventDefault(); onDelete(property.id); }}
                  className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Componente principal que muestra la lista de propiedades
export default function PropertyList({ properties, onEdit, onDelete }: PropertyListProps) {
  // Si no hay propiedades, muestra un mensaje informativo
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-medium">No hay propiedades</h3>
          <p className="mt-1">Comienza creando tu primera propiedad.</p>
        </div>
      </div>
    );
  }

  // Si hay propiedades, las muestra en un grid responsivo
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
} 