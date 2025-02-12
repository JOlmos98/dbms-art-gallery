import { z } from "zod";

export const artistasSchema = z.object({

    // Validación del nombre:
    nombre: z.string().min(3, {
        message: "El nombre del artista debe tener al menos 3 caracteres.",
    }).max(50, {
        message: "El nombre del artista no debe superar los 50 caracteres.",
    }),

    // Validación del país:
    pais: z.string().min(2, {
        message: "El país debe tener al menos 2 caracteres.",
    }).max(50, {
        message: "El país no debe superar los 50 caracteres.",
    }),

    // Validación de la fecha de nacimiento (formato YYYY-MM-DD):
    fechaNac: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "La fecha de nacimiento debe estar en formato YYYY-MM-DD.",
    ),

    // Validación de la biografía (opcional pero con límite de caracteres):
    biografia: z.string().max(500, {
        message: "La biografía no debe superar los 500 caracteres.",
    }).optional(),

});
