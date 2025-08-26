import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  nombre: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(200, "El nombre debe tener menos de 200 caracteres")
    .refine(val => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val), { message: 'El nombre solo puede contener letras y espacios' })
    .refine(val => val.trim().length >= 2, { message: 'El nombre no puede estar vacío o solo contener espacios' }),
  correo: z.string()
    .min(1, "El correo es requerido")
    .email("Por favor ingresa un email válido (ejemplo: usuario@dominio.com)")
    .refine(val => val.includes('.'), { message: 'El email debe tener un formato válido' }),
  telefono: z.string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(15, "El teléfono no puede tener más de 15 dígitos")
    .refine(val => /^[0-9+\-\s()]+$/.test(val), { message: 'El teléfono solo puede contener números, +, -, espacios y paréntesis' })
    .refine(val => /\d{7,}/.test(val.replace(/[^0-9]/g, '')), { message: 'El teléfono debe tener al menos 7 dígitos' }),
  asunto: z.string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(100, "El asunto no puede tener más de 100 caracteres")
    .refine(val => val.trim().length >= 5, { message: 'El asunto no puede estar vacío o solo contener espacios' }),
  mensaje: z.string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(1000, "El mensaje no puede tener más de 1000 caracteres")
    .refine(val => val.trim().length >= 20, { message: 'El mensaje no puede estar vacío o solo contener espacios' }),
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
    setValue,
    watch,
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
    setValue,
    watch,
  };
}; 