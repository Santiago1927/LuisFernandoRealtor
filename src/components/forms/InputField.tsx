import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Field } from "@/types/forms.d";
import { useInputFieldLogic } from "../../hooks/useInputFieldLogic";

/**
 * Interfaz que define las propiedades del componente InputField
 * @param fieldKey - Clave única del campo en el formulario
 * @param field - Configuración del campo (tipo, label, opciones, etc.)
 * @param register - Función de registro de react-hook-form
 * @param errors - Objeto de errores de validación (opcional)
 */
interface InputFieldProps {
  fieldKey: string;
  field: Field;
  register: UseFormRegister<any>;
  errors?: any;
}

/**
 * Componente InputField - Campo de entrada reutilizable y dinámico
 * Renderiza diferentes tipos de campos (input, select, radio) según la configuración
 */
const InputField: React.FC<InputFieldProps> = ({
  fieldKey,
  field,
  register,
  errors,
}) => {
  // Hook personalizado que maneja la lógica del campo de entrada
  const {
    hasError,           // Indica si el campo tiene errores de validación
    errorMessage,       // Mensaje de error específico para este campo
    isSelectField,      // Indica si el campo es de tipo select
    isRadioField,       // Indica si el campo es de tipo radio
    isInputField,       // Indica si el campo es de tipo input
    commonInputClasses, // Clases CSS comunes para todos los tipos de input
    labelClasses,       // Clases CSS para el label del campo
    errorClasses,       // Clases CSS para el mensaje de error
  } = useInputFieldLogic({ fieldKey, field, register, errors });

  return (
    <div className="mb-2">
      {/* Label del campo con indicador de campo requerido */}
      <label className={labelClasses}>
        {field.label} *
      </label>
      
      {/* Mensaje de error condicional - se muestra solo si hay errores */}
      {hasError && (
        <span className={errorClasses}>
          {errorMessage}
        </span>
      )}
      
      {/* Renderizado condicional según el tipo de campo */}
      {isSelectField ? (
        // Campo de tipo select con opciones desplegables
        <select
          {...register(fieldKey)}
          className={commonInputClasses}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : isRadioField ? (
        // Campo de tipo radio con opciones de selección única
        <div className="flex">
          {field.options?.map((option) => (
            <label key={option.label} className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio"
                value={option.value}
                {...register(fieldKey)}
              />
              <span className="ml-2 text-secondary-900 dark:text-primary-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      ) : (
        // Campo de tipo input estándar (text, email, password, etc.)
        <input
          type={field.type}
          {...register(fieldKey)}
          className={commonInputClasses}
        />
      )}
    </div>
  );
};

export default InputField;
