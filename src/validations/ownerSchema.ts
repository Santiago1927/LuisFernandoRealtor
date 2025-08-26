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
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(200, { message: 'El nombre debe tener menos de 200 caracteres' })
        .refine(val => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val), { message: 'El nombre solo puede contener letras y espacios' })
        .refine(val => val.trim().length >= 2, { message: 'El nombre no puede estar vacío o solo contener espacios' }),
    
    correo: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .email({ message: 'Por favor ingresa un email válido (ejemplo: usuario@dominio.com)' })
        .refine(val => val.includes('.'), { message: 'El email debe tener un formato válido' }),
    
    telefono: z.string()
        .min(7, { message: 'El teléfono debe tener al menos 7 dígitos' })
        .max(15, { message: 'El teléfono no puede tener más de 15 dígitos' })
        .refine(val => /^[0-9+\-\s()]+$/.test(val), { message: 'El teléfono solo puede contener números, +, -, espacios y paréntesis' })
        .refine(val => /\d{7,}/.test(val.replace(/[^0-9]/g, '')), { message: 'El teléfono debe tener al menos 7 dígitos' }),
    
    ciudad: z.enum(cityValues as [string, ...string[]], { message: 'Por favor selecciona una ciudad' }),
    
    tipoPropiedad: z.enum(propertyTypeValues as [string, ...string[]], { message: 'Por favor selecciona un tipo de propiedad' }),
    
    // Campos dinámicos opcionales
    direccion: z.string().optional(),
    edadPropiedad: z.coerce.number().min(0).max(100).optional(),
    areaConstruida: z.coerce.number().min(1).optional(),
    terraza: z.coerce.number().min(0).optional(),
    patio: z.coerce.number().min(0).optional(),
    habitaciones: z.coerce.number().min(0).max(20).optional(),
    baños: z.coerce.number().min(0).max(20).optional(),
    parqueaderos: z.coerce.number().min(0).max(10).optional(),
    piso: z.coerce.number().min(0).max(100).optional(),
    estudio: z.boolean().optional(),
    deposito: z.boolean().optional(),
    balcon: z.boolean().optional(),
    vigilancia: z.boolean().optional(),
    piscina: z.boolean().optional(),
    valorAdministracion: z.coerce.number().min(0).optional(),
    valorAproximado: z.coerce.number().min(1000000, { message: 'El valor debe ser al menos $1,000,000 COP' }).optional(),
    area: z.coerce.number().min(1).optional(),
    situacionJuridica: z.string().optional(),
    situacionJuridicaEspecifica: z.string().optional(),
    tipoProyecto: z.string().optional(),
    comentariosAdicionales: z.string().optional(),
});
