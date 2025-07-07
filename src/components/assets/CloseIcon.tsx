// Importación de React para crear el componente funcional
import * as React from "react";
// Importación del tipo SVGProps para tipar las propiedades del SVG
import { SVGProps } from "react";

/**
 * Componente CloseIcon - Ícono SVG de "X" para cerrar
 * 
 * Este componente renderiza un ícono SVG de una "X" que se utiliza
 * comúnmente como botón de cerrar en modales, alertas, pestañas y
 * otros elementos de interfaz de usuario.
 * 
 * Características:
 * - Ícono SVG vectorial escalable
 * - Hereda propiedades SVG estándar
 * - Diseño minimalista y limpio
 * - Compatible con el sistema de temas (usa currentColor)
 * - Tamaño estándar de 24x24 píxeles
 */
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  // Elemento SVG principal con configuración estándar
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="icon icon-tabler icons-tabler-outline icon-tabler-x"
    {...props}
  >
    {/* Elemento invisible que define el área de click del SVG */}
    {/* Este path asegura que todo el área del ícono sea clickeable */}
    <path stroke="none" d="M0 0h24v24H0z" />
    
    {/* Líneas que forman la "X" */}
    {/* Primera línea: desde esquina superior derecha a inferior izquierda */}
    {/* Segunda línea: desde esquina superior izquierda a inferior derecha */}
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// Exportación por defecto del componente
export default CloseIcon;
