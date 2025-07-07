import { UseFormRegister } from "react-hook-form";
import { Field } from "@/types/forms.d";

/**
 * Interfaz que define las propiedades del hook useInputFieldLogic
 * @param fieldKey - Clave única del campo en el formulario
 * @param field - Configuración del campo (tipo, label, opciones, etc.)
 * @param register - Función de registro de react-hook-form
 * @param errors - Objeto de errores de validación (opcional)
 */
interface UseInputFieldLogicProps {
  fieldKey: string;
  field: Field;
  register: UseFormRegister<any>;
  errors?: any;
}

/**
 * Hook personalizado que maneja la lógica de renderizado y validación de campos de entrada
 * Proporciona funciones y clases CSS para diferentes tipos de campos (input, select, radio)
 * @param fieldKey - Clave del campo para identificar errores
 * @param field - Configuración del campo a renderizar
 * @param register - Función de registro de react-hook-form
 * @param errors - Errores de validación del formulario
 * @returns Objeto con funciones y clases CSS para el campo
 */
export const useInputFieldLogic = ({
  fieldKey,
  field,
  register,
  errors,
}: UseInputFieldLogicProps) => {
  // Verifica si hay errores para este campo específico
  const hasError = errors && errors[fieldKey] && errors[fieldKey].message;
  const errorMessage = hasError ? errors[fieldKey].message : "";

  // Determina el tipo de campo a renderizar basado en la configuración
  const isSelectField = field.type === "select";
  const isRadioField = field.type === "radio";
  const isInputField = !isSelectField && !isRadioField;

  // Clases CSS comunes para todos los tipos de campos de entrada
  // Incluye estilos responsivos y soporte para modo oscuro
  const commonInputClasses = "block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200";

  // Clases CSS para las etiquetas de los campos
  // Estilos consistentes para todos los labels del formulario
  const labelClasses = "block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200";

  // Clases CSS para los mensajes de error
  // Estilos específicos para mostrar errores de validación
  const errorClasses = "text-primary-950 dark:text-primary-700 text-xs";

  // Retornar todas las funciones y clases necesarias para el componente
  return {
    hasError,           // Indica si el campo tiene errores de validación
    errorMessage,       // Mensaje de error específico para este campo
    isSelectField,      // Indica si el campo es de tipo select
    isRadioField,       // Indica si el campo es de tipo radio
    isInputField,       // Indica si el campo es de tipo input estándar
    commonInputClasses, // Clases CSS para campos de entrada
    labelClasses,       // Clases CSS para etiquetas
    errorClasses,       // Clases CSS para mensajes de error
    register,           // Función de registro de react-hook-form
    field,              // Configuración del campo
    fieldKey,           // Clave única del campo
  };
}; 