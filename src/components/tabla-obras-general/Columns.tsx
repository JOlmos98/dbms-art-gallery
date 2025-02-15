"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Obra = {
  id: number;
  titulo: string;
  tipo: string;
  precio: number;
  descripcion: string;
  fechaCreacion: string;
  estado: string;
  idAutor: number;
};

export const columnsObras: ColumnDef<Obra>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "titulo",
    header: "Título",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "precio",
    header: "Precio",
    cell: ({ row }) => row.original.precio.toString(), // Convertimos a string aquí
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "fechaCreacion",
    header: "Fecha de Creación",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "idAutor",
    header: "ID Autor",
    cell: ({ row }) => row.original.idAutor.toString(), // Convertimos a string aquí
  },
];
