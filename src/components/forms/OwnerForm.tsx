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
import { FormData, OwnerFormProps, PropertyType } from "@/types/forms.d";
import InputField from "./InputField";
import { ownerSchema } from "@/validations/ownerSchema";

const OwnerForm: React.FC<OwnerFormProps> = ({ formSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      tipoPropiedad: PropertyType.Casa,
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
      <button
        type="submit"
        className="w-full py-3 px-5 text-sm font-medium text-secondary-900 bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700 shadow-lg transform transition-transform duration-200 hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default OwnerForm;
