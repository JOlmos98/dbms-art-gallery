"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Cliente = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
};

export const columnsClientes: ColumnDef<Cliente>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
