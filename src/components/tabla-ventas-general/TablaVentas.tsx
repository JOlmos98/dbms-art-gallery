"use client";

import { useEffect, useState } from "react";
import { getAllVentas } from "@/backend/invokeVentas";
import { DataTableVentas } from "./DataTable";
import { columnsVentas } from "./Columns";
import { Venta } from "@/backend/dto";

export const TablaVentas = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const datos = await getAllVentas();
        setVentas(datos);
      } catch (error) {
        console.error("Error al obtener ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando ventas...</p>
      ) : (
        <DataTableVentas columns={columnsVentas} data={ventas} />
      )}
    </div>
  );
};
