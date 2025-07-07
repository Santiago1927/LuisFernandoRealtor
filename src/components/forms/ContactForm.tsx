import React from "react";
import InputField from "./InputField";
import Loader from "../assets/Loader";
import { useContactFormLogic } from "@/hooks/useContactFormLogic";

/**
 * Interfaz que define las propiedades del componente ContactForm
 * @param formSubmit - Función que se ejecuta al enviar el formulario
 * @param loading - Estado de carga del formulario
 */
interface ContactFormProps {
  formSubmit: (data: any) => void;
  loading: boolean;
}

/**
 * Componente ContactForm - Formulario de contacto general
 * Maneja la recolección de información de contacto para consultas generales
 */
const ContactForm: React.FC<ContactFormProps> = ({ formSubmit, loading }) => {
  // Hook personalizado que maneja toda la lógica del formulario de contacto
  const {
    register,        // Función de registro de campos de react-hook-form
    handleSubmit,    // Función para manejar el envío del formulario
    errors,          // Objeto con errores de validación
    isValid,         // Estado de validez del formulario
    contactFields,   // Array de campos de contacto definidos dinámicamente
    onSubmit,        // Función que se ejecuta al enviar el formulario
  } = useContactFormLogic({ formSubmit, loading });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Renderizado dinámico de todos los campos de contacto */}
      {contactFields.map(({ fieldKey, field }) => (
        <InputField
          key={fieldKey}
          fieldKey={fieldKey}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
      
      {/* Mensaje de error cuando el formulario no es válido */}
      {!isValid && (
        <span className="text-primary-950 dark:text-primary-700 text-xs">
          Por favor, complete todos los campos correctamente
        </span>
      )}
      
      {/* Botón de envío con estados de carga y validación */}
      <button
        disabled={loading}
        type="submit"
        className={`flex justify-center items-center gap-4 w-full py-3 px-5 text-sm font-medium rounded-lg shadow-lg transform transition-transform duration-200 focus:outline-none focus:ring-4
    ${
      !loading
        ? "text-secondary-900 bg-primary-500 hover:bg-primary-600 focus:ring-primary-300 dark:focus:ring-primary-700 hover:scale-105"
        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
    }`}
      >
        Enviar Mensaje
        <Loader loading={loading} />
      </button>
    </form>
  );
};

export default ContactForm; 