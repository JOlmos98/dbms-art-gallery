import { z } from "zod";

export const ventasSchema = z.object({
    // ID del Cliente (solo números)
    idCliente: z.string().regex(/^\d+$/, {
        message: "El ID del cliente debe contener solo números (0-9) sin espacios ni caracteres especiales.",
    }),

    // Fecha de la Venta (Formato YYYY-MM-DD)
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha debe estar en formato YYYY-MM-DD.",
    }),

    // Total de la Venta (solo números positivos)
    total: z.string().regex(/^\d+$/, {
        message: "El total debe contener solo números (0-9) sin espacios ni caracteres especiales.",
    }),

    // Lista de IDs de Obras vendidas (array de strings numéricos)
    obrasVendidas: z.array(
        z.string().regex(/^\d+$/, {
            message: "Cada ID de obra debe contener solo números (0-9) sin espacios ni caracteres especiales.",
        })
    ).min(1, {
        message: "Debes seleccionar al menos una obra para la venta.",
    }),
});
