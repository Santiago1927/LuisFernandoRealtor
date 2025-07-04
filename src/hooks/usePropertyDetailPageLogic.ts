// Importa los hooks useEffect y useState de React para manejar efectos y estado local
import { useEffect, useState } from 'react';
// Importa el tipo Property para tipar la propiedad
import { Property } from '../types/property';
// Importa el servicio para interactuar con propiedades en Firestore
import { propertyService } from '../../firebase/firestoreService';

// Hook personalizado para manejar la lógica de la página de detalle de una propiedad
export function usePropertyDetailPageLogic(id: string | string[]) {
  // Estado para almacenar la propiedad consultada
  const [property, setProperty] = useState<Property | null>(null);
  // Estado para almacenar el índice de la imagen activa
  const [activeImage, setActiveImage] = useState(0);

  // Efecto que obtiene la propiedad desde Firestore cuando cambia el id
  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      const propertyData = await propertyService.getPropertyById(id as string);
      if (propertyData) {
        setProperty(propertyData);
      }
    };
    fetchProperty();
  }, [id]);

  // Obtiene el arreglo de imágenes de la propiedad, o un arreglo vacío si no existe
  const images = Array.isArray(property?.images) ? property.images : [];
  // Función para mostrar la siguiente imagen en el carrusel
  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  // Función para mostrar la imagen anterior en el carrusel
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  // Genera la URL para el mapa de Google Maps usando la dirección de la propiedad
  const mapUrl = property?.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`
    : '';

  // Retorna la propiedad, el índice de la imagen activa, las imágenes, funciones de navegación y la URL del mapa
  return {
    property,
    activeImage,
    images,
    nextImage,
    prevImage,
    mapUrl,
  };
} 