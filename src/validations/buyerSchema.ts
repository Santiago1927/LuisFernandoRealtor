import { z } from 'zod';

export const buyerSchema = z.object({
    nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }).max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
    correo: z.string().email({ message: 'El email debe ser válido' }),
    telefono: z.string().refine(telefono => !isNaN(parseInt(telefono)), { message: 'El teléfono debe ser un número' }),
})