import { z } from 'zod';
import { CITY_OPTIONS, PROPERTY_TYPE_OPTIONS, PAYMENT_METHOD_OPTIONS } from '@/constants/constants';

const positiveNumberField = (message: string) =>
    z.string()
        .min(1, { message })
        .refine(val => {
            const intValue = parseInt(val);
            return !isNaN(intValue) && intValue >= 0;
        }, { message })
        .refine(val => /^\d+$/.test(val), { message });

export const buyerSchema = z.object({
    nombre: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .max(200, { message: 'El nombre debe tener menos de 200 caracteres' })
        .refine(val => /^[a-zA-Z\s]*$/.test(val), { message: 'El nombre solo puede contener letras' }),
    correo: z.string()
        .min(1, { message: 'Este campo es obligatorio' }).email({ message: 'El email debe ser válido' }),
    telefono: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .refine(val => /^[0-9]*$/.test(val), { message: 'El teléfono solo puede contener números' }),
    ciudad: z.enum(CITY_OPTIONS.map(({ value }) => value) as [string], { message: 'Este campo es obligatorio' }),
    tipoPropiedad: z.enum(PROPERTY_TYPE_OPTIONS.map(({ value }) => value) as [string], { message: 'Este campo es obligatorio' }),
    // area: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // habitaciones: z.string().optional(),
    // baños: z.string().optional(),
    // parqueaderos: z.string().optional(),
    // deposito: z.string().optional(),
    formaDePago: z.enum(PAYMENT_METHOD_OPTIONS.map(({ value }) => value) as [string], { message: 'Este campo es obligatorio' }),
    presupuesto: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // comentariosAdicionales: z.string().optional(),
});
