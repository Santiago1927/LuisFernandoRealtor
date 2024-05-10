import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_OWNER,
  PERSONAL_DATA,
  QUESTIONS,
  INPUT_INFO,
  LEGAL_SITUATION_OPTIONS,
} from "@/constants/constants";
import {
  City,
  FormData,
  LegalSituation,
  OwnerFormProps,
  PropertyType,
} from "@/types/forms.d";
import InputField from "./InputField";
import { ownerSchema } from "@/validations/ownerSchema";
import Loader from "../assets/Loader";

const OwnerForm: React.FC<OwnerFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      ciudad: City.Medellin,
      tipoPropiedad: PropertyType.Casa,
      situacionJuridica: LegalSituation.ListaParaEscriturar,
    },
  });

  const tipoPropiedad = watch("tipoPropiedad");
  const situacionJuridica = watch("situacionJuridica");

  return (
    <form
      onSubmit={handleSubmit((data) => formSubmit(data))}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(QUESTIONS).map(([fieldKey, field]) => (
          <InputField
            key={fieldKey}
            fieldKey={fieldKey}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
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
        />

        {tipoPropiedad && PROPERTY_INFO_OWNER[tipoPropiedad]
          ? PROPERTY_INFO_OWNER[tipoPropiedad].map((fieldKey) => (
              <InputField
                key={fieldKey}
                fieldKey={fieldKey}
                field={INPUT_INFO[fieldKey]}
                register={register}
                errors={errors}
              />
            ))
          : null}
        {situacionJuridica === "OTRA" && (
          <InputField
            fieldKey="situacionJuridicaEspecifica"
            field={{
              id: "situacionJuridicaEspecifica",
              type: "text",
              label: "Especifique la Situación Jurídica",
            }}
            register={register}
            errors={errors}
          />
        )}

        <InputField
          fieldKey="comentariosAdicionales"
          field={{
            id: "comentariosAdicionales",
            type: "text",
            label: "Comentarios Adicionales",
          }}
          register={register}
          errors={errors}
        />
      </div>
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
  );
};

export default OwnerForm;
