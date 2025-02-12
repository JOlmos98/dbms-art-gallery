"use client";

import { useEffect, useState } from "react";
import { getAllArtistas } from "@/backend/invokeArtistas";
import { DataTableArtistas } from "./DataTable";
import { columnsArtistas } from "./Columns";
import { Artista } from "@/backend/dto";

export const TablaArtistas = () => {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const datos = await getAllArtistas();
        setArtistas(datos);
      } catch (error) {
        console.error("Error al obtener artistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistas();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando artistas...</p>
      ) : (
        <DataTableArtistas columns={columnsArtistas} data={artistas} />
      )}
    </div>
  );
};
