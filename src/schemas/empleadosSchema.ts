import { z } from "zod";

export const empleadosSchema = z.object({

    // Validación del nombre:
    nombre: z.string().min(3, {
        message: "Nombre del cliente debe tener al menos 3 caracteres",
    }).max(50, {
        message: "Nombre del cliente no debe superar los 50 caracteres.",
    }),

    // Validación de la dirección:
    cargo: z.enum(['Empleado', 'Encargado', 'Directivo'], {
        message: 'El cargo debe ser Empleado, Encargado o Directivo',
    }),

    // Validación del teléfono:
    telefono: z.string().min(9, {
        message: "Número de teléfono no válido.",
    }).max(15, {
        message: "Número de teléfono no válido.",
    }),

    // Validación del email y repetición:
    email: z.string().email({
        message: "Email no válido",
    }),
    confirmarEmail: z.string().email({
        message: "Email no válido",
    }),

    // Validación de la fecha de contratación (formato YYYY-MM-DD):
    fechaContratacion: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "La fecha de contratación debe estar en formato YYYY-MM-DD.",
    ),

    // Validación de repetición de email:
}).refine((data) => data.email === data.confirmarEmail, {
    message: "Los correos electrónicos deben coincidir.",
    path: ["confirmarEmail"], // Campo que muestra el error

});

/*



*/