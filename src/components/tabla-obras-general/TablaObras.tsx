"use client";

import { useEffect, useState } from "react";
import { getAllObras } from "@/backend/invokeObras";
import { DataTableObras } from "./DataTable";
import { columnsObras } from "./Columns";
import { Obra } from "@/backend/dto";

export const TablaObras = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const datos = await getAllObras();
        setObras(datos); // Se mantiene tal cual, sin conversión
      } catch (error) {
        console.error("Error al obtener obras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando obras...</p>
      ) : (
        <DataTableObras columns={columnsObras} data={obras} />
      )}
    </div>
  );
};
