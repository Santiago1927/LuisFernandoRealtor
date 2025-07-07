// Importaciones necesarias para el componente
// Image: Componente optimizado de Next.js para renderizar imágenes con lazy loading
// Link: Componente de Next.js para navegación entre páginas sin recargar la página
import Image from "next/image";
import Link from "next/link";

/**
 * Componente MainSection - Sección principal de la página de inicio
 * 
 * Este componente renderiza la sección hero de la página principal del sitio web
 * de bienes raíces. Incluye un mensaje principal, descripción, botón de llamada
 * a la acción y una imagen representativa.
 * 
 * Características:
 * - Diseño responsive que se adapta a diferentes tamaños de pantalla
 * - Tema claro/oscuro con clases CSS condicionales
 * - Animación en la imagen principal
 * - Enlace directo a la página de contacto
 */
export default function MainSection() {
  return (
    // Contenedor principal con fondo adaptativo (claro/oscuro)
    <main className="bg-secondary-50 dark:bg-secondary-800 w-full">
      {/* Grid container responsivo con padding y espaciado adaptativo */}
      <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 sm:px-6 md:px-8">
        
        {/* Columna izquierda: Contenido textual (7 columnas en pantallas grandes) */}
        <div className="mr-auto place-self-center lg:col-span-7">
          
          {/* Título principal con tipografía escalable y colores temáticos */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary-700 dark:text-primary-500">
            ¡Vendemos en el menor tiempo y al mejor precio posible!
          </h1>
          
          {/* Descripción secundaria con tipografía y espaciado responsivo */}
          <p className="mb-6 font-light text-secondary-900 dark:text-white lg:mb-8 md:text-lg lg:text-xl">
            Aplicamos estrategias de marketing digital para ayudarte a vender o
            comprar una propiedad que se adecuen a tus necesidades.
          </p>
          
          {/* Contenedor del botón de llamada a la acción */}
          <div className="flex justify-center lg:justify-start">
            {/* Enlace estilizado que funciona como botón de contacto */}
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-secondary-900 border border-primary-900 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 dark:text-white dark:border-primary-700 dark:hover:bg-primary-600 hover:dark:text-black dark:focus:ring-primary-800"
            >
              Hablar con un Agente
            </Link>
          </div>
        </div>
        
        {/* Columna derecha: Imagen principal (5 columnas en pantallas grandes) */}
        <div className="lg:mt-0 lg:col-span-5 lg:flex justify-center">
          {/* Imagen optimizada con Next.js Image component */}
          <Image
            src="/images/home.webp"
            alt="mockup"
            layout="intrinsic"
            width={1000}
            height={1000}
            className="animate-scale-up"
          ></Image>
        </div>
      </div>
    </main>
  );
}
