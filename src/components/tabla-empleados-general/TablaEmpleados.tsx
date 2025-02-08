"use client";

import { useEffect, useState } from "react";
import { getAllEmpleados } from "@/backend/invokeEmpleados";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { Empleado } from "@/backend/dto";

export const TablaEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const datos = await getAllEmpleados();
        setEmpleados(datos);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div>
      {loading ? (<p>Cargando empleados...</p>) : (<DataTable columns={columns} data={empleados} />)}
    </div>
  );
};
