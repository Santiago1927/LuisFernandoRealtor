import { z } from 'zod';
import {
    CITY_OPTIONS,
    PROPERTY_TYPE_OPTIONS,
    // LEGAL_SITUATION_OPTIONS,
    // PROJECT_TYPE_OPTIONS
} from '@/constants/constants';

// const positiveNumberField = (message: string) =>
//     z.string()
//         .min(1, { message })
//         .refine(val => {
//             const intValue = parseInt(val);
//             return !isNaN(intValue) && intValue >= 0;
//         }, { message })
//         .refine(val => /^\d+$/.test(val), { message });

const cityValues = CITY_OPTIONS.map(({ value }) => value);
const propertyTypeValues = PROPERTY_TYPE_OPTIONS.map(({ value }) => value);
// const legalSituationValues = LEGAL_SITUATION_OPTIONS.map(({ value }) => value);
// const projectTypeValues = PROJECT_TYPE_OPTIONS.map(({ value }) => value);

/**
 * Esquema de validación para el formulario de propietarios
 * Define las reglas de validación para cada campo del formulario usando Zod
 * Incluye validaciones específicas para preguntas de calificación y campos obligatorios
 */
export const ownerSchema = z.object({
    // Primera pregunta de calificación: debe responder "Sí" para continuar
    firstQuestion: z.string({ message: 'Este campo es obligatorio' })
        .refine(val => val === 'true', { message: 'Lo siento, si no quieres vender tu propiedad rápidamente no te puedo ayudar' }),
    
    // Segunda pregunta de calificación: debe responder "Sí" para continuar
    secondQuestion: z.string({ message: 'Este campo es obligatorio' })
        .refine(val => val === 'true', { message: 'Lo siento, si no quieres vender tu propiedad a un precio acorde al mercado no te puedo ayudar' }),
    
    // Campo de nombre: obligatorio, máximo 200 caracteres, solo letras y espacios
    nombre: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .max(200, { message: 'El nombre debe tener menos de 200 caracteres' })
        .refine(val => /^[a-zA-Z\s]*$/.test(val), { message: 'El nombre solo puede contener letras' }),
    
    // Campo de correo: obligatorio y debe ser un email válido
    correo: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .email({ message: 'El email debe ser válido' }),
    
    // Campo de teléfono: obligatorio y solo números
    telefono: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .refine(val => /^[0-9]*$/.test(val), { message: 'El teléfono solo puede contener números' }),
    
    // Campo de ciudad: debe ser una de las ciudades disponibles en las constantes
    ciudad: z.enum(cityValues as [string, ...string[]], { message: 'Este campo es obligatorio' }),
    
    // Campo de tipo de propiedad: debe ser uno de los tipos disponibles en las constantes
    tipoPropiedad: z.enum(propertyTypeValues as [string, ...string[]], { message: 'Este campo es obligatorio' }),
    
    // Campos comentados que podrían ser utilizados en el futuro para propiedades específicas
    // direccion: z.string()
    //     .min(1, { message: 'Este campo es obligatorio' }),
    // edadPropiedad: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // area: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // areaConstruida: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // terraza: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // patio: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // habitaciones: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // baños: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // parqueaderos: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // piso: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // estudio: z.string().optional(),
    // deposito: z.string().optional(),
    // balcon: z.string().optional(),
    // vigilancia: z.string({ message: 'Este campo es obligatorio' }),
    // piscina: z.string({ message: 'Este campo es obligatorio' }),
    // valorAdministracion: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // valorAproximado: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // situacionJuridica: z.enum(legalSituationValues as [string, ...string[]], { message: 'Este campo es obligatorio' }),
    // situacionJuridicaEspecifica: z.string().min(1, { message: 'Este campo es obligatorio' })
    //     .max(100, { message: 'Este campo debe tener menos de 100 caracteres' }),
    // tipoProyecto: z.enum(projectTypeValues as [string, ...string[]], { message: 'Este campo es obligatorio' }),
    // comentariosAdicionales: z.string().optional(),
});
