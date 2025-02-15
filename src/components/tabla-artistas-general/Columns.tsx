"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Artista = {
  id: number;
  nombre: string;
  pais: string;
  fechaNac: string;
  biografia?: string;
};

export const columnsArtistas: ColumnDef<Artista>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "pais",
    header: "País",
  },
  {
    accessorKey: "fechaNac",
    header: "Fecha de Nacimiento",
  },
  {
    accessorKey: "biografia",
    header: "Biografía",
    cell: ({ getValue }) => {
      const bio = getValue() as string;
      return bio ? bio : "Sin biografía";
    },
  },
];
