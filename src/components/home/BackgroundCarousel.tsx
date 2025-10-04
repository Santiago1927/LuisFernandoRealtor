"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const backgroundImages = [
  {
    id: 1,
    src: "/images/carousel/Foto-1.jpg",
    alt: "",
    title: "",
  },
  {
    id: 2,
    src: "/images/carousel/Foto-2.jpg",
    alt: "",
    title: "",
  },
  {
    id: 3,
    src: "/images/carousel/Foto-3.jpg",
    alt: "",
    title: "",
  },
  {
    id: 4,
    src: "/images/carousel/Foto-4.jpg",
    alt: "",
    title: "",
  },
  {
    id: 5,
    src: "/images/carousel/Foto-5.jpg",
    alt: "",
    title: "",
  },
];

interface BackgroundCarouselProps {
  children: React.ReactNode;
}

/**
 * Componente BackgroundCarousel - Carrusel de imágenes de fondo
 * Muestra un carrusel automático de imágenes de Medellín como fondo
 */
export default function BackgroundCarousel({
  children,
}: BackgroundCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cambio automático de imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={backgroundImages[currentImageIndex].src}
              alt={backgroundImages[currentImageIndex].alt}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Overlay adicional para mejor legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Contenido sobre el carrusel */}
      <div className="relative z-10">{children}</div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-amber-400 w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Título de la imagen actual */}
      <div className="absolute bottom-6 right-6 z-20">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-right"
        >
          <p className="text-white/80 text-sm font-medium">
            {backgroundImages[currentImageIndex].title}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
