import React from "react";
import {
  PROPERTY_TYPE_OPTIONS,
  CITY_OPTIONS,
  PROPERTY_INFO_BUYER,
  INPUT_INFO,
  PERSONAL_DATA,
} from "@/constants/constants";
import { BuyerFormProps, PropertyType } from "@/types/forms.d";
import InputField from "./InputField";

const BuyerForm: React.FC<BuyerFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
}) => {
  const handleInputChange = (fieldKey: string, value: any) => {
    setFormData({ ...formData, [fieldKey]: value });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        {/* Datos Personales */}
        {Object.entries(PERSONAL_DATA).map(([fieldKey, field]) => (
          <InputField
            key={fieldKey}
            fieldKey={fieldKey}
            field={field}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        ))}

        {/* Ciudad */}
        <InputField
          fieldKey="ciudad"
          field={{ type: "select", label: "Ciudad", options: CITY_OPTIONS }}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Tipo de propiedad */}
        <InputField
          fieldKey="propertyType"
          field={{
            type: "select",
            label: "Tipo de Propiedad",
            options: PROPERTY_TYPE_OPTIONS.filter(
              (option) => option.value !== "PROYECTO_INMOBILIARIO"
            ),
          }}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Campos específicos del tipo de propiedad seleccionado */}
        {PROPERTY_INFO_BUYER[formData.propertyType as PropertyType]?.map(
          (fieldKey) => (
            <InputField
              key={fieldKey}
              fieldKey={fieldKey}
              field={INPUT_INFO[fieldKey]}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )
        )}

        <button
          type="submit"
          className="w-full py-3 px-5 text-sm font-medium text-secondary-900 bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700 shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BuyerForm;
