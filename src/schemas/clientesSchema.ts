import { z } from "zod";

export const clientesSchema = z.object({

    // Validación del nombre:
    nombre: z.string().min(3, {
        message: "Nombre del cliente debe tener al menos 3 caracteres",
    }).max(50, {
        message: "Nombre del cliente no debe superar los 50 caracteres.",
    }),

    // Validación de la dirección:
    direccion: z.string().min(5, {
        message: "La dirección debe contener al menos 5 caracteres.",
    }),

    // Validación del teléfono:
    telefono: z.string().min(6, {
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
    }).refine((data) => data.email === data.confirmarEmail, {
      message: "Los correos electrónicos deben coincidir.",
      path: ["confirmarEmail"], // Campo que muestra el error

});