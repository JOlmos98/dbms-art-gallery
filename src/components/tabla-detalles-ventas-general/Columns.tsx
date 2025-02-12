"use client";

import { ColumnDef } from "@tanstack/react-table";

export type DetalleVenta = {
  id: string;
  idVenta: string;
  idObra: string;
};

export const columnsDetallesVentas: ColumnDef<DetalleVenta>[] = [
  {
    accessorKey: "id",
    header: "ID Detalle",
  },
  {
    accessorKey: "idVenta",
    header: "ID Venta",
  },
  {
    accessorKey: "idObra",
    header: "ID Obra",
  },
];
