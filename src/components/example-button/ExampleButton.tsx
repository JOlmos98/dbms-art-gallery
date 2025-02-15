"use client";

import { insertExampleData } from "@/backend/invokeExample";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const ExampleButton = () => {

    const onSubmit = async () => {

        try {
          // Insertamos ejemplos.
          await insertExampleData();
    
          toast.success("Datos insertados correctamente.", {
            description: `Datos de ejemplo registrados en Clientes, Empleados, Artistas y Obras.`,
            action: {
              label: "Ocultar",
              onClick: () => console.log("Ocultar"),
            },
            className: "group-[.toaster]:text-green-500",
          });
    
        } catch (error) {
          toast.error("Error al registrar ejemplos", {
            description: "Probablemente ya hay demasiados registros.",
            className: "group-[.toaster]:text-red-500",
          });
          console.error(error);
        } 

      };
    return (
        <div className="mt-6">
            <Button onClick={onSubmit} className="p-6 text-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">Insertar datos de ejemplo</Button>
        </div>
    );

}
