import { z } from 'zod';
import { CITY_OPTIONS, PROPERTY_TYPE_OPTIONS, PAYMENT_METHOD_OPTIONS } from '@/constants/constants';

/**
 * Función auxiliar para crear campos de números enteros positivos
 * Valida que el valor sea un string no vacío, convertible a número entero y mayor o igual a cero
 * @param message - Mensaje de error personalizado para mostrar al usuario
 * @returns Esquema de validación Zod para números enteros positivos
 */
const positiveNumberField = (message: string) =>
    z.string()
        .min(1, { message })
        .refine(val => {
            const intValue = parseInt(val);
            return !isNaN(intValue) && intValue >= 0;
        }, { message })
        .refine(val => /^\d+$/.test(val), { message });

/**
 * Esquema de validación para el formulario de compradores
 * Define las reglas de validación para cada campo del formulario usando Zod
 */
export const buyerSchema = z.object({
    // Campo de nombre: obligatorio, máximo 200 caracteres, solo letras y espacios
    nombre: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .max(200, { message: 'El nombre debe tener menos de 200 caracteres' })
        .refine(val => /^[a-zA-Z\s]*$/.test(val), { message: 'El nombre solo puede contener letras' }),
    
    // Campo de correo: obligatorio y debe ser un email válido
    correo: z.string()
        .min(1, { message: 'Este campo es obligatorio' }).email({ message: 'El email debe ser válido' }),
    
    // Campo de teléfono: obligatorio y solo números
    telefono: z.string()
        .min(1, { message: 'Este campo es obligatorio' })
        .refine(val => /^[0-9]*$/.test(val), { message: 'El teléfono solo puede contener números' }),
    
    // Campo de ciudad: debe ser una de las ciudades disponibles en las constantes
    ciudad: z.enum(CITY_OPTIONS.map(({ value }) => value) as [string], { message: 'Este campo es obligatorio' }),
    
    // Campo de tipo de propiedad: debe ser uno de los tipos disponibles en las constantes
    tipoPropiedad: z.enum(PROPERTY_TYPE_OPTIONS.map(({ value }) => value) as [string], { message: 'Este campo es obligatorio' }),
    
    // Campos comentados que podrían ser utilizados en el futuro
    // area: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    // habitaciones: z.string().optional(),
    // baños: z.string().optional(),
    // parqueaderos: z.string().optional(),
    // deposito: z.string().optional(),
    
    // Campo de forma de pago: debe ser uno de los métodos disponibles en las constantes
    formaDePago: z.enum(PAYMENT_METHOD_OPTIONS.map(({ value }) => value) as [string], { message: 'Este campo es obligatorio' }),
    
    // Campo de presupuesto: número entero positivo obligatorio
    presupuesto: positiveNumberField('Este campo es obligatorio y debe ser un numero entero'),
    
    // Campo comentado que podría ser utilizado en el futuro
    // comentariosAdicionales: z.string().optional(),
});
