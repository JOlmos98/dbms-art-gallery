"use client";

import { useEffect, useState } from "react";
import { getAllDetallesVentas } from "@/backend/invokeDetallesVentas";
import { DataTableDetallesVentas } from "./DataTable";
import { columnsDetallesVentas, DetalleVenta } from "./Columns";

export const TablaDetallesVentas = () => {
  const [detallesVentas, setDetallesVentas] = useState<DetalleVenta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetallesVentas = async () => {
      try {
        const datos = await getAllDetallesVentas();

        // Convertimos los números a strings
        const detallesTransformados: DetalleVenta[] = datos.map((detalle) => ({
          id: String(detalle.id),
          idVenta: String(detalle.idVenta),
          idObra: String(detalle.idObra),
        }));

        setDetallesVentas(detallesTransformados);
      } catch (error) {
        console.error("Error al obtener detalles de ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetallesVentas();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando detalles de ventas...</p>
      ) : (
        <DataTableDetallesVentas columns={columnsDetallesVentas} data={detallesVentas} />
      )}
    </div>
  );
};
