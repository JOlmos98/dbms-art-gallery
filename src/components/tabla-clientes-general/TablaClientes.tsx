"use client";

import { useEffect, useState } from "react";
import { getAllClientes } from "@/backend/invokeClientes";
import { DataTableClientes } from "./DataTable";
import { columnsClientes } from "./Columns";
import { Cliente } from "@/backend/dto";

export const TablaClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const datos = await getAllClientes();
        setClientes(datos);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <DataTableClientes columns={columnsClientes} data={clientes} />
      )}
    </div>
  );
};
