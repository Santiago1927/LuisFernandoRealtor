import React from "react";
import InputField from "./InputField";
import { BuyerFormProps } from "@/types/forms.d";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_BUYER,
  INPUT_INFO,
} from "@/constants/constants";
import Loader from "../assets/Loader";
import { useBuyerFormLogic } from "@/hooks/useBuyerFormLogic";

/**
 * Componente BuyerForm - Formulario para compradores de propiedades
 * Maneja la recolección de datos personales y preferencias de compra
 */
const BuyerForm: React.FC<BuyerFormProps> = ({ formSubmit, loading }) => {
  // Hook personalizado que maneja toda la lógica del formulario
  const {
    register,        // Función de registro de campos de react-hook-form
    handleSubmit,    // Función para manejar el envío del formulario
    errors,          // Objeto con errores de validación
    isValid,         // Estado de validez del formulario
    tipoPropiedad,   // Tipo de propiedad seleccionada
    onSubmit,        // Función que se ejecuta al enviar el formulario
  } = useBuyerFormLogic({ formSubmit, loading });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Renderizado dinámico de campos de datos personales */}
      {Object.entries(PERSONAL_DATA).map(([fieldKey, field]) => (
        <InputField
          key={fieldKey}
          fieldKey={fieldKey}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
      
      {/* Campo de selección de ciudad */}
      <InputField
        fieldKey="ciudad"
        field={{
          id: "ciudad",
          type: "select",
          label: "Ciudad",
          options: CITY_OPTIONS,
        }}
        register={register}
        errors={errors}
      />
      
      {/* Campo de selección de tipo de propiedad */}
      <InputField
        fieldKey="tipoPropiedad"
        field={{
          id: "tipoPropiedad",
          type: "select",
          label: "Tipo de Propiedad",
          options: PROPERTY_TYPE_OPTIONS,
        }}
        register={register}
        errors={errors}
      />
      
      {/* Renderizado condicional de campos específicos según el tipo de propiedad */}
      {tipoPropiedad && PROPERTY_INFO_BUYER[tipoPropiedad]
        ? PROPERTY_INFO_BUYER[tipoPropiedad]?.map((fieldKey) => (
            <InputField
              key={fieldKey}
              fieldKey={fieldKey}
              field={INPUT_INFO[fieldKey]}
              register={register}
              errors={errors}
            />
          ))
        : null}
      
      {/* Mensaje de error cuando el formulario no es válido */}
      {!isValid && (
        <span className="text-primary-950 dark:text-primary-700 text-xs">
          Por favor, complete los campos del formulario
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
        Submit
        <Loader loading={loading} />
      </button>
    </form>
  );
};

export default BuyerForm;
