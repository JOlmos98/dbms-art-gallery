import { z } from "zod";

export const obrasSchema = z.object({
    // Título de la obra
    titulo: z.string().min(3, {
        message: "El título debe tener al menos 3 caracteres.",
    }).max(100, {
        message: "El título no debe superar los 100 caracteres.",
    }),

    // Tipo de obra (Ejemplo: Pintura, Escultura, Fotografía, etc.)
    tipo: z.string().min(3, {
        message: "El tipo de obra debe tener al menos 3 caracteres.",
    }).max(50, {
        message: "El tipo de obra no debe superar los 50 caracteres.",
    }),

    // Precio de la obra (debe contener solo números en formato string)
    precio: z.string().regex(/^\d+$/, {
        message: "El precio debe contener solo números (0-9) sin espacios ni caracteres especiales.",
    }),

    // Descripción de la obra (opcional)
    descripcion: z.string().max(500, {
        message: "La descripción no debe superar los 500 caracteres.",
    }).optional(),

    // Fecha de creación (formato YYYY-MM-DD)
    fechaCreacion: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "La fecha de creación debe estar en formato YYYY-MM-DD."
    ),

    // Estado de la obra (Disponible o No disponible)
    estado: z.enum(["Disponible", "No disponible"], {
        message: "El estado debe ser 'Disponible' o 'No disponible'.",
    }),

    // ID del autor (debe contener solo números en formato string)
    idAutor: z.string().regex(/^\d+$/, {
        message: "El ID del autor debe contener solo números (0-9) sin espacios ni caracteres especiales.",
    }),
});
