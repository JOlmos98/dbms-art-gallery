
"use client";

import { getAllEmpleados } from "@/backend/invokeEmpleados";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Empleado } from "@/backend/dto";
import { Button } from "@/components/ui/button";

export default async function VGEmpleadosPage() {

    //const empleados: Empleado[] = await getAllEmpleados();
    //await getAllEmpleados();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
            <div className="flex flex-col row-start-2 items-start sm:items-start">
                <div>
                    <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Vista general de Empleados</h2>
                    <p className="text-lg mb-5">
                        La tabla <span className="font-bold text-sidebar-accent">Artistas</span> registra datos de los creadores, como su nombre, país de origen, La tabla <span className="font-bold text-sidebar-accent">Obras</span> almacen
                    </p>
                </div>


                <div>

                </div>

                <div>

                </div>
            </div>
        </div>
    );
}
/*
<DataTable columns={columns} data={empleados} />


<Button

onClick={async () => {
    try {
        const empleados = await getAllEmpleados();
        console.log("Lista de empleados:", empleados);
        // Aquí puedes mostrar un toast o realizar alguna acción con los datos
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        // También puedes mostrar un mensaje de error si es necesario
    }
}}
className="">
Prueba GET EMPLEADOS
</Button>             
*/