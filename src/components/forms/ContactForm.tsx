import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./InputField";
import Loader from "../assets/Loader";

const contactSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  asunto: z.string().min(1, "El asunto es requerido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  formSubmit: (data: ContactFormData) => void;
  loading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

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

  return (
    <form
      onSubmit={handleSubmit((data) => formSubmit(data))}
      className="space-y-4"
    >
      {contactFields.map(({ fieldKey, field }) => (
        <InputField
          key={fieldKey}
          fieldKey={fieldKey}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
      
      {!isValid && (
        <span className="text-primary-950 dark:text-primary-700 text-xs">
          Por favor, complete todos los campos correctamente
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
        Enviar Mensaje
        <Loader loading={loading} />
      </button>
    </form>
  );
};

export default ContactForm; 