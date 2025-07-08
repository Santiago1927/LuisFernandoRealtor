'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa el hook para obtener los parámetros de la URL
import { useParams } from 'next/navigation';
// Importa el hook personalizado para la lógica de la página de detalle de propiedad
import { usePropertyDetailPageLogic } from '../../../hooks/usePropertyDetailPageLogic';

// Componente principal para mostrar el detalle de una propiedad
export default function DetallePropiedadPage() {
  // Obtiene el id de la propiedad desde los parámetros de la URL
  const { id } = useParams();
  // Usa el hook para obtener la propiedad, imágenes y lógica de navegación
  const { property, activeImage, images, nextImage, prevImage, mapUrl } = usePropertyDetailPageLogic(id);

  // Si la propiedad aún no se ha cargado, muestra un mensaje de carga
  if (!property) return <div className="max-w-4xl mx-auto py-16 text-center text-lg">Cargando propiedad...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 dark:bg-secondary-800 rounded-2xl shadow-lg p-6">
      {/* Título de la propiedad */}
      <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-4">{property.title}</h1>
      <div className="mb-6">
        {/* Carrusel de imágenes de la propiedad */}
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
          {images.length > 0 ? (
            <>
              <img
                src={images[activeImage]}
                alt={property.title}
                className="w-full h-96 object-cover object-center"
              />
              {images.length > 1 && (
                <>
                  {/* Botón para imagen anterior */}
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-900/70 rounded-full p-1 hover:bg-primary-600 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {/* Botón para imagen siguiente */}
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-900/70 rounded-full p-1 hover:bg-primary-600 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </>
          ) : (
            // Si no hay imágenes, muestra un ícono de imagen vacía
            <div className="w-full h-96 flex items-center justify-center text-gray-400">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Tarjeta de descripción */}
        <div className="bg-gray-50 dark:bg-secondary-800 rounded-xl shadow-lg p-6 mb-8">
          {/* Información básica de la propiedad */}
          <div className="flex flex-wrap gap-4 text-secondary-900 dark:text-white">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 rounded-full font-semibold">{property.type}</span>
            <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 rounded-full">{property.status === 'available' ? 'Disponible' : property.status === 'sold' ? 'Vendida' : 'Alquilada'}</span>
            {property.bedrooms && <span>{property.bedrooms} hab</span>}
            {property.bathrooms && <span>{property.bathrooms} baños</span>}
            {property.area && <span>{property.area} m²</span>}
          </div>
          {/* Precio, dirección y descripción */}
          <div className="text-xl font-bold text-yellow-500 mt-4 mb-2">${property.price.toLocaleString()}</div>
          <div className="text-secondary-900 dark:text-white mb-2">{property.address}</div>
          <div className="text-secondary-900 dark:text-white mb-4">{property.description}</div>
        </div>
        {/* Mapa de ubicación */}
        {mapUrl && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-2">Ubicación</h2>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" style={{height:'350px'}}>
              <iframe
                src={mapUrl}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de la propiedad"
              ></iframe>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
} 