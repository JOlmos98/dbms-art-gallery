"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Venta = {
  id: number;
  idCliente: number;
  fecha: string;
  total: number;
};

export const columnsVentas: ColumnDef<Venta>[] = [
  {
    accessorKey: "id",
    header: "ID Venta",
  },
  {
    accessorKey: "idCliente",
    header: "ID Cliente",
    cell: ({ row }) => row.original.idCliente.toString(), // Convertimos a string para evitar errores
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => row.original.total.toString(), // Convertimos a string para evitar errores
  },
];
