import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  asunto: z.string().min(1, "El asunto es requerido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface UseContactFormLogicProps {
  formSubmit: (data: ContactFormData) => void;
  loading: boolean;
}

export const useContactFormLogic = ({ formSubmit, loading }: UseContactFormLogicProps) => {
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

  const onSubmit = (data: ContactFormData) => {
    formSubmit(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    contactFields,
    onSubmit,
    loading,
  };
}; 