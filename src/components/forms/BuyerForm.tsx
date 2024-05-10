import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "@/validations/buyerSchema";
import InputField from "./InputField";
import { FormData, BuyerFormProps } from "@/types/forms.d";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_BUYER,
  INPUT_INFO,
} from "@/constants/constants";

const BuyerForm: React.FC<BuyerFormProps> = ({ formSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(buyerSchema),
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
        <button
          type="submit"
          className="w-full py-3 px-5 text-sm font-medium text-secondary-900 bg-primary-500 rounded-lg hover:bg-primary-600"
        >
          Submit
        </button>
      </form>
      <div>{JSON.stringify(watch(), null, 2)}</div>
    </>
  );
};

export default BuyerForm;
