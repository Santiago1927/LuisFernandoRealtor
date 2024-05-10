import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "@/validations/buyerSchema";
import InputField from "./InputField";
import { FormData, BuyerFormProps, PropertyType, City } from "@/types/forms.d";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_BUYER,
  INPUT_INFO,
} from "@/constants/constants";
import Loader from "../assets/Loader";

const BuyerForm: React.FC<BuyerFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      ciudad: City.Medellin,
      tipoPropiedad: PropertyType.Casa,
    },
  });

  const tipoPropiedad = watch("tipoPropiedad");

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => formSubmit(data))}
        className="space-y-4"
      >
        {Object.entries(PERSONAL_DATA).map(([fieldKey, field]) => (
          <InputField
            key={fieldKey}
            fieldKey={fieldKey}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
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
        {!isValid && (
          <span className="text-primary-950 dark:text-primary-700 text-xs">
            Por favor, complete los campos del formulario
          </span>
        )}
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
    </>
  );
};

export default BuyerForm;
