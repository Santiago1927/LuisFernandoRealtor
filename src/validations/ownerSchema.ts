import { z } from 'zod';
import {
    CITY_OPTIONS,
    PROPERTY_TYPE_OPTIONS,
} from '@/constants/constants';

const cityValues = CITY_OPTIONS.map(({ value }) => value);
const propertyTypeValues = PROPERTY_TYPE_OPTIONS.map(({ value }) => value);

export const ownerSchema = z.object({
    firstQuestion: z.string({ message: 'Este campo es obligatorio' })
        .refine(val => val === 'true', { message: 'Lo siento, si no quieres vender tu propiedad rápidamente no te puedo ayudar' }),
    
    secondQuestion: z.string({ message: 'Este campo es obligatorio' })
        .refine(val => val === 'true', { message: 'Lo siento, si no quieres vender tu propiedad a un precio acorde al mercado no te puedo ayudar' }),
    
    nombre: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .max(200, { message: 'El nombre debe tener menos de 200 caracteres' })
        .refine(val => /^[a-zA-Z\s]*$/.test(val), { message: 'El nombre solo puede contener letras' }),
    
    correo: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .email({ message: 'El email debe ser válido' }),
    
    telefono: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .refine(val => /^[0-9]*$/.test(val), { message: 'El teléfono solo puede contener números' }),
    
    ciudad: z.enum(cityValues as [string, ...string[]], { message: 'Este campo es obligatorio' }),
    
    tipoPropiedad: z.enum(propertyTypeValues as [string, ...string[]], { message: 'Este campo es obligatorio' }),
});
