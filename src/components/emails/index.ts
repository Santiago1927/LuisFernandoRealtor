/**
 * MÓDULO PRINCIPAL DE PLANTILLAS DE EMAIL OPTIMIZADAS PARA GMAIL
 *
 * Este archivo centraliza todas las exportaciones del sistema de emails,
 * proporcionando una interfaz limpia para importar plantillas y utilidades.
 *
 * Estructura del sistema:
 * - BaseEmailTemplate: Plantilla reutilizable con header/footer
 * - BuyerEmailTemplate: Específica para formularios de compradores
 * - OwnerEmailTemplate: Específica para formularios de propietarios
 * - ContactEmailTemplate: Para mensajes de contacto general
 * - Utilidades: Funciones helper y configuraciones
 */

// EXPORTACIONES PRINCIPALES - Plantillas optimizadas para Gmail
export { default as BaseEmailTemplate } from "./BaseEmailTemplate";
export { default as BuyerEmailTemplate } from "./BuyerEmailTemplate";
export { default as OwnerEmailTemplate } from "./OwnerEmailTemplate";
export { default as ContactEmailTemplate } from "./ContactEmailTemplate";

// Importaciones internas para las funciones de utilidad
import BuyerEmailTemplate from "./BuyerEmailTemplate";
import OwnerEmailTemplate from "./OwnerEmailTemplate";
import ContactEmailTemplate from "./ContactEmailTemplate";

/**
 * Interfaz base para las propiedades comunes de todas las plantillas
 * Define los campos mínimos que debe tener cualquier email
 */
export interface EmailTemplateProps {
  /** Nombre del remitente/contacto */
  nombre: string;
  /** Email para respuesta directa */
  correo: string;
  /** Teléfono opcional para contacto */
  telefono?: string;
  /** Propiedades adicionales específicas de cada plantilla */
  [key: string]: any;
}

/**
 * Factory function para seleccionar la plantilla correcta
 * según el tipo de formulario enviado
 *
 * @param userType - Tipo de usuario/formulario ('buyer', 'owner', 'contact')
 * @returns Componente de plantilla correspondiente
 *
 * Mapeo:
 * - 'buyer' → BuyerEmailTemplate (formularios de búsqueda)
 * - 'owner' → OwnerEmailTemplate (formularios de venta)
 * - 'contact' → ContactEmailTemplate (contacto general)
 * - default → ContactEmailTemplate (fallback seguro)
 */
export const getEmailTemplate = (userType: string) => {
  switch (userType) {
    case "buyer":
      return BuyerEmailTemplate;
    case "owner":
      return OwnerEmailTemplate;
    case "contact":
      return ContactEmailTemplate;
    default:
      // Fallback seguro - siempre retorna una plantilla válida
      return ContactEmailTemplate;
  }
};

// Configuración de estilos globales para Gmail
export const gmailOptimizedStyles = {
  // Fuentes seguras para email
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",

  // Colores del tema
  colors: {
    primary: "#f59e0b",
    primaryDark: "#d97706",
    secondary: "#0ea5e9",
    success: "#059669",
    warning: "#dc2626",
    neutral: "#374151",
    background: "#ffffff",
    muted: "#f8fafc",
  },

  // Breakpoints para móvil
  mobile: {
    maxWidth: "600px",
    padding: "16px",
    fontSize: "14px",
  },
};
