"use client";

import UltraSafeImage from "@/components/ui/UltraSafeImage";

// Solo usamos la foto 1 como fondo fijo
const backgroundImage = {
  id: 1,
  src: "/images/carousel/Foto-1.JPG",
  alt: "Vista panorámica de Medellín",
  title: "Medellín - Ciudad de la Eterna Primavera",
};

interface BackgroundCarouselProps {
  children: React.ReactNode;
}

/**
 * Componente BackgroundCarousel - Imagen de fondo fija
 * Muestra la foto 1 como fondo fijo (anteriormente era un carrusel)
 */
export default function BackgroundCarousel({
  children,
}: BackgroundCarouselProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Imagen de fondo fija */}
      <div className="absolute inset-0 w-full h-full">
        <UltraSafeImage
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          priority
          quality={90}
        />

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Overlay adicional para mejor legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Contenido sobre el fondo */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
