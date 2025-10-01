import { z } from "zod";
import {
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
} from "@/constants/constants";

const positiveNumberField = (message: string) =>
  z
    .string()
    .min(1, { message })
    .refine(
      (val) => {
        const intValue = parseInt(val);
        return !isNaN(intValue) && intValue >= 0;
      },
      { message }
    )
    .refine((val) => /^\d+$/.test(val), { message });

export const buyerSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(200, { message: "El nombre debe tener menos de 200 caracteres" })
    .refine((val) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val), {
      message: "El nombre solo puede contener letras y espacios",
    })
    .refine((val) => val.trim().length >= 2, {
      message: "El nombre no puede estar vacío o solo contener espacios",
    }),

  correo: z
    .string()
    .min(1, { message: "Este campo es obligatorio" })
    .email({
      message:
        "Por favor ingresa un email válido (ejemplo: usuario@dominio.com)",
    })
    .refine((val) => val.includes("."), {
      message: "El email debe tener un formato válido",
    }),

  telefono: z
    .string()
    .min(7, { message: "El teléfono debe tener al menos 7 dígitos" })
    .max(15, { message: "El teléfono no puede tener más de 15 dígitos" })
    .refine((val) => /^[0-9+\-\s()]+$/.test(val), {
      message:
        "El teléfono solo puede contener números, +, -, espacios y paréntesis",
    })
    .refine((val) => /\d{7,}/.test(val.replace(/[^0-9]/g, "")), {
      message: "El teléfono debe tener al menos 7 dígitos",
    }),

  ciudad: z.enum(
    CITY_OPTIONS.map(({ value }) => value) as [string, ...string[]],
    { message: "Por favor selecciona una ciudad" }
  ),

  tipoPropiedad: z.enum(
    PROPERTY_TYPE_OPTIONS.map(({ value }) => value) as [string, ...string[]],
    { message: "Por favor selecciona un tipo de propiedad" }
  ),

  // Campos dinámicos opcionales para diferentes tipos de propiedades
  area: z.coerce.number().min(1).optional(),
  habitaciones: z.coerce.number().min(0).max(20).optional(),
  baños: z.coerce.number().min(0).max(20).optional(),
  parqueaderos: z.coerce.number().min(0).max(10).optional(),
  deposito: z.boolean().optional(),

  formaDePago: z
    .enum(
      PAYMENT_METHOD_OPTIONS.map(({ value }) => value) as [string, ...string[]],
      { message: "Por favor selecciona una forma de pago" }
    )
    .optional(),

  presupuesto: z
    .string()
    .min(1, { message: "El presupuesto es obligatorio" })
    .refine(
      (val) => {
        const numValue = parseInt(val.replace(/[,.]/g, ""));
        return !isNaN(numValue) && numValue > 0;
      },
      { message: "El presupuesto debe ser un número válido mayor a 0" }
    )
    .refine(
      (val) => {
        const numValue = parseInt(val.replace(/[,.]/g, ""));
        return numValue >= 50000000; // Mínimo 50 millones
      },
      { message: "El presupuesto debe ser de al menos $50,000,000 COP" }
    )
    .optional(),

  // Campo para comentarios adicionales
  comentariosAdicionales: z.string().optional(),
});
