// Importa useState de React para manejar el estado local
import { useState } from 'react';

// Hook personalizado para manejar la lógica de navegación de imágenes en una tarjeta de propiedad
export function usePropertyCardLogic(images: string[] = []) {
  // Estado para almacenar el índice de la imagen activa
  const [activeImage, setActiveImage] = useState(0);

  // Función para mostrar la siguiente imagen en el carrusel
  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Evita la propagación del evento si existe
    setActiveImage((prev) => (prev + 1) % images.length); // Avanza al siguiente índice, vuelve al inicio si es la última
  };

  // Función para mostrar la imagen anterior en el carrusel
  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Evita la propagación del evento si existe
    setActiveImage((prev) => (prev - 1 + images.length) % images.length); // Retrocede al índice anterior, va al final si es la primera
  };

  // Retorna el índice de la imagen activa y las funciones de navegación
  return {
    activeImage,
    nextImage,
    prevImage,
  };
} 