import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * Esquema de validación para el formulario de contacto
 * Define las reglas de validación para cada campo usando Zod
 */
const contactSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  asunto: z.string().min(1, "El asunto es requerido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

/**
 * Tipo inferido del esquema de contacto
 * TypeScript genera automáticamente el tipo basado en el esquema Zod
 */
type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Interfaz que define las propiedades del hook useContactFormLogic
 * @param formSubmit - Función que se ejecuta al enviar el formulario con los datos validados
 * @param loading - Estado de carga que indica si el formulario está siendo procesado
 */
interface UseContactFormLogicProps {
  formSubmit: (data: ContactFormData) => void;
  loading: boolean;
}

/**
 * Hook personalizado que maneja toda la lógica del formulario de contacto general
 * Incluye validación con Zod, configuración de campos dinámicos y manejo de estado del formulario
 * @param formSubmit - Función callback para procesar los datos del formulario
 * @param loading - Estado de carga del formulario
 * @returns Objeto con todas las funciones y estados necesarios para el formulario
 */
export const useContactFormLogic = ({ formSubmit, loading }: UseContactFormLogicProps) => {
  // Configuración del formulario con react-hook-form y validación Zod
  const {
    register,        // Función para registrar campos en el formulario
    handleSubmit,    // Función que maneja el envío del formulario
    formState: { errors, isValid }, // Estado del formulario con errores y validez
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // Resolver de validación usando Zod
  });

  /**
   * Configuración de campos del formulario de contacto
   * Array de objetos que define la estructura y propiedades de cada campo
   */
  const contactFields = [
    {
      fieldKey: "nombre",
      field: { id: "nombre", type: "text" as const, label: "Nombre completo" },
    },
    {
      fieldKey: "correo",
      field: { id: "correo", type: "email" as const, label: "Correo electrónico" },
    },
    {
      fieldKey: "telefono",
      field: { id: "telefono", type: "tel" as const, label: "Teléfono" },
    },
    {
      fieldKey: "asunto",
      field: { id: "asunto", type: "text" as const, label: "Asunto" },
    },
    {
      fieldKey: "mensaje",
      field: { id: "mensaje", type: "text" as const, label: "Mensaje" },
    },
  ];

  /**
   * Función que se ejecuta cuando el formulario es enviado
   * @param data - Datos del formulario validados por Zod
   */
  const onSubmit = (data: ContactFormData) => {
    formSubmit(data);
  };

  // Retornar todas las funciones y estados necesarios para el componente
  return {
    register,        // Función para registrar campos
    handleSubmit,    // Función para manejar envío
    errors,          // Errores de validación
    isValid,         // Estado de validez del formulario
    contactFields,   // Configuración de campos del formulario
    onSubmit,        // Función de envío personalizada
    loading,         // Estado de carga
  };
}; 