// Directiva para indicar que este componente se ejecuta en el lado del cliente
// Necesaria para usar hooks de React como useState
"use client";

// Importaciones necesarias para el componente
// Image: Componente optimizado de Next.js para renderizar imágenes
// useState: Hook de React para manejar estado local del componente
import Image from "next/image";
import { useState } from "react";

/**
 * Componente CarouselSection - Carrusel de imágenes de propiedades
 * 
 * Este componente renderiza un carrusel interactivo que muestra imágenes
 * de propiedades inmobiliarias. Permite navegación manual entre las imágenes
 * usando botones de anterior y siguiente.
 * 
 * Características:
 * - Navegación circular (vuelve al inicio después de la última imagen)
 * - Transiciones suaves entre imágenes
 * - Botones de navegación con efectos hover y focus
 * - Diseño responsivo y accesible
 * - Soporte para tema claro/oscuro
 */
export default function CarouselSection() {
  // Estado para controlar qué imagen está activa actualmente
  // Inicializa en 0 (primera imagen)
  const [activeIndex, setActiveIndex] = useState(0);

  // Array con las rutas de las imágenes del carrusel
  // Cada imagen representa una propiedad diferente para mostrar
  const images = [
    "/images/photos/carousel1.webp",
    "/images/photos/carousel2.webp",
    "/images/photos/carousel3.webp",
    "/images/photos/carousel4.webp",
    "/images/photos/carousel5.webp",
    "/images/photos/carousel6.webp",
  ];

  /**
   * Función para navegar a la imagen anterior
   * Si estamos en la primera imagen (índice 0), va a la última imagen
   * De lo contrario, decrementa el índice en 1
   */
  const goToPrevSlide = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  /**
   * Función para navegar a la siguiente imagen
   * Si estamos en la última imagen, vuelve a la primera (índice 0)
   * De lo contrario, incrementa el índice en 1
   */
  const goToNextSlide = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  return (
    // Contenedor principal del carrusel con posicionamiento relativo y overflow oculto
    <div className="relative w-full overflow-hidden rounded-none" data-carousel="static">
      
      {/* Contenedor de las imágenes con transición suave */}
      <div
        className="relative w-full h-[500px] flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {/* Mapeo de todas las imágenes del carrusel */}
        {images.map((src, index) => (
          // Contenedor individual para cada imagen
          <div key={index} className="flex-none w-full h-full" data-carousel-item>
            {/* Imagen optimizada con Next.js Image component */}
            <Image
              fill
              src={src}
              className="block w-full h-full object-cover object-center"
              alt="Property Image"
              loading="lazy"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Botón de navegación hacia la izquierda (anterior) */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        {/* Contenedor del ícono con efectos hover y focus */}
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-50/50 dark:bg-secondary-900/50 group-hover:bg-secondary-50/80 dark:group-hover:bg-secondary-900/80 group-focus:ring-4 group-focus:ring-secondary-900/50 dark:group-focus:ring-secondary-50/50 group-focus:outline-none">
          {/* Ícono SVG de flecha hacia la izquierda */}
          <svg
            className="w-4 h-4 text-secondary-900 dark:text-secondary-50 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          {/* Texto para lectores de pantalla (accesibilidad) */}
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Botón de navegación hacia la derecha (siguiente) */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        {/* Contenedor del ícono con efectos hover y focus */}
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-50/50 dark:bg-secondary-900/50 group-hover:bg-secondary-50/80 dark:group-hover:bg-secondary-900/80 group-focus:ring-4 group-focus:ring-secondary-900/50 dark:group-focus:ring-secondary-50/50  group-focus:outline-none">
          {/* Ícono SVG de flecha hacia la derecha */}
          <svg
            className="w-4 h-4 text-secondary-900 dark:text-secondary-50 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          {/* Texto para lectores de pantalla (accesibilidad) */}
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
