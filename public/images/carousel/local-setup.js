// 🔄 Script para cambiar a imágenes locales
// Ejecuta estos pasos para usar las imágenes reales de Medellín:

// 1. Sube las 5 imágenes a la carpeta /public/images/carousel/ con estos nombres:
const imageFiles = [
  "medellin-1.jpg", // Zona verde residencial
  "medellin-2.jpg", // Centro urbano con glorieta
  "medellin-3.jpg", // Distrito corporativo
  "medellin-4.jpg", // Valle de Aburrá completo
  "medellin-5.jpg", // Barrios en montañas
];

// 2. En BackgroundCarousel.tsx, reemplaza las URLs de Unsplash por:
const localImageUrls = [
  "/images/carousel/medellin-1.jpg",
  "/images/carousel/medellin-2.jpg",
  "/images/carousel/medellin-3.jpg",
  "/images/carousel/medellin-4.jpg",
  "/images/carousel/medellin-5.jpg",
];

// 3. Configuración completa para copiar y pegar:
const backgroundImagesLocal = [
  {
    id: 1,
    src: "/images/carousel/medellin-1.jpg",
    alt: "Vista panorámica de Medellín con parque y edificios residenciales entre naturaleza",
    title: "Zona Verde Residencial",
  },
  {
    id: 2,
    src: "/images/carousel/medellin-2.jpg",
    alt: "Centro de Medellín con la icónica glorieta y edificios modernos",
    title: "Centro Urbano",
  },
  {
    id: 3,
    src: "/images/carousel/medellin-3.jpg",
    alt: "Zona corporativa de Medellín con edificios de oficinas y centros comerciales",
    title: "Distrito Corporativo",
  },
  {
    id: 4,
    src: "/images/carousel/medellin-4.jpg",
    alt: "Vista aérea completa del Valle de Aburrá con toda la ciudad de Medellín",
    title: "Valle de Aburrá",
  },
  {
    id: 5,
    src: "/images/carousel/medellin-5.jpg",
    alt: "Barrios residenciales de Medellín rodeados de montañas y zonas verdes",
    title: "Barrios en las Montañas",
  },
];

console.log("✅ Configuración lista para usar imágenes locales de Medellín");
