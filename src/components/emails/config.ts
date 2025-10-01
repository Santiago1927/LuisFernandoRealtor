// Importaciones de las plantillas de email para referencia de tipos
import {
  BuyerEmailTemplate,
  OwnerEmailTemplate,
  ContactEmailTemplate,
} from "./index";

/**
 * CONFIGURACIÓN PRINCIPAL DEL SISTEMA DE EMAILS
 *
 * Este archivo centraliza toda la configuración necesaria para:
 * - Desarrollo con React Email
 * - Optimización para Gmail
 * - Datos de prueba realistas
 * - Validaciones de formularios
 */

// Configuración del entorno de desarrollo de React Email
export const emailConfig = {
  /** URL base para las páginas de previsualización en Next.js */
  previewUrl: "http://localhost:3000/emails",

  /** Configuración específica para el servidor de desarrollo */
  dev: {
    port: 3001, // Puerto alternativo cuando 3000 está ocupado
    open: true, // Abrir automáticamente el navegador
  },

  /**
   * CONFIGURACIÓN ESPECÍFICA PARA GMAIL
   * Garantiza compatibilidad total con Gmail web y móvil
   */
  gmail: {
    /** Ancho máximo recomendado para Gmail (estándar de la industria) */
    maxWidth: 600,

    /**
     * Fuentes web-safe que Gmail renderiza correctamente
     * Estas fuentes están disponibles en todos los sistemas operativos
     */
    safeFonts: [
      "Arial", // Sans-serif básica, universal
      "Helvetica", // Preferida en Mac/iOS
      "Georgia", // Serif elegante para títulos
      "Times New Roman", // Serif tradicional
      "Trebuchet MS", // Sans-serif moderna
      "Verdana", // Sans-serif legible en pantallas
      "Segoe UI", // Nativa de Windows, muy legible
      "Tahoma", // Compacta, buena para móviles
    ],

    /**
     * PALETA DE COLORES OPTIMIZADA PARA GMAIL
     * Estos colores se ven bien tanto en tema claro como oscuro
     */
    colors: {
      // Colores principales de la marca Luis Fernando Realtor
      primary: "#f59e0b", // Amber 500 - Color distintivo de la marca
      primaryHover: "#d97706", // Amber 600 - Para estados hover/active
      secondary: "#0ea5e9", // Sky 500 - Para enlaces y elementos secundarios
      success: "#059669", // Emerald 600 - Para confirmaciones y éxito
      warning: "#dc2626", // Red 600 - Para urgencia y advertencias

      // Colores de texto con excelente contraste
      textPrimary: "#111827", // Gris muy oscuro para títulos
      textSecondary: "#374151", // Gris medio para texto principal
      textMuted: "#6b7280", // Gris claro para texto secundario

      // Colores de fondo que funcionan en ambos temas
      backgroundPrimary: "#ffffff",
      backgroundSecondary: "#f8fafc",
      backgroundTertiary: "#f1f5f9",

      // Colores de borde
      border: "#e5e7eb",
      borderLight: "#f3f4f6",
    },
  },
};

// Datos de prueba para cada tipo de email
export const testData = {
  buyer: {
    nombre: "María González",
    correo: "maria.gonzalez@email.com",
    telefono: "+57 300 123 4567",
    ciudad: "MEDELLIN",
    tipoPropiedad: "APARTAMENTO",
    area: "80",
    habitaciones: "3",
    baños: "2",
    parqueaderos: "1",
    deposito: true,
    formaDePago: "CREDITO",
    presupuesto: "250000000",
    comentariosAdicionales:
      "Busco un apartamento en zona norte de Medellín, preferiblemente cerca del metro. Mi presupuesto es flexible si la propiedad cumple con todos mis requisitos.",
    userType: "buyer",
  },

  owner: {
    nombre: "Carlos Ramírez",
    correo: "carlos.ramirez@email.com",
    telefono: "+57 301 987 6543",
    ciudad: "MEDELLIN",
    tipoPropiedad: "CASA",
    direccion: "Carrera 70 # 45-32, El Poblado",
    edadPropiedad: "5",
    areaConstruida: "120",
    area: "200",
    habitaciones: "4",
    baños: "3",
    piso: "N/A",
    parqueaderos: "2",
    terraza: "15",
    patio: "30",
    estudio: true,
    deposito: true,
    balcon: false,
    vigilancia: true,
    piscina: true,
    valorAdministracion: "350000",
    valorAproximado: "450000000",
    situacionJuridica: "LISTA_PARA_ESCRITURAR",
    detalleSituacionJuridica: "Papeles al día, sin gravámenes",
    tipoProyecto: "RESIDENCIAL",
    comentariosAdicionales:
      "Casa en excelente estado, recientemente remodelada. Ubicada en zona exclusiva de El Poblado con fácil acceso a centros comerciales y vías principales.",
    userType: "owner",
  },

  contact: {
    nombre: "Ana Martínez",
    correo: "ana.martinez@email.com",
    telefono: "+57 302 456 7890",
    asunto: "Consulta sobre servicios de asesoría inmobiliaria",
    mensaje:
      "Hola Luis Fernando,\n\nEspero que te encuentres bien. Me han recomendado tus servicios como asesor inmobiliario y estoy interesada en conocer más sobre tu trabajo.\n\nActualmente estoy buscando vender mi apartamento en Laureles y me gustaría saber:\n\n1. ¿Cuáles son tus honorarios?\n2. ¿Qué estrategias de marketing utilizas?\n3. ¿Cuánto tiempo suele tomar el proceso de venta?\n\nEstaría disponible para una reunión la próxima semana si te parece conveniente.\n\nQuedo atenta a tu respuesta.\n\nSaludos cordiales,\nAna Martínez",
    origen: "Formulario de Contacto - Página Principal",
    userType: "contact",
  },
};

// Utilidades para testing
export const getTestData = (type: "buyer" | "owner" | "contact") => {
  return testData[type];
};

export const getAllTestData = () => {
  return testData;
};

// Función para generar URLs de previsualización
export const getPreviewUrl = (type: "buyer" | "owner" | "contact") => {
  return `${emailConfig.previewUrl}/${type}`;
};

// Validación de datos mínimos requeridos
export const validateEmailData = (data: any, type: string) => {
  const requiredFields = {
    buyer: ["nombre", "correo"],
    owner: ["nombre", "correo"],
    contact: ["nombre", "correo", "mensaje"],
  };

  const required = requiredFields[type as keyof typeof requiredFields] || [];
  const missing = required.filter((field) => !data[field]);

  return {
    isValid: missing.length === 0,
    missingFields: missing,
  };
};
