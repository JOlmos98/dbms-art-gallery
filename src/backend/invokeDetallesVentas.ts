"use client";

import { invoke } from "@tauri-apps/api/core";
import { DetalleVenta } from "./dto";

// -------------------- Insertar un nuevo detalle de venta --------------------
export async function insertDetalleVenta(idVenta: number, idObra: number): Promise<string> {
  try {
    const response = await invoke<string>("insert_detalle_venta_command", {
      idVenta,
      idObra,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al insertar detalle de venta:", error);
    throw error;
  }
}

// -------------------- Obtener todos los detalles de ventas --------------------
export async function getAllDetallesVentas(): Promise<DetalleVenta[]> {
  try {
    const detalles = await invoke<DetalleVenta[]>("get_all_detalles_ventas_command");
    console.log("Detalles de ventas obtenidos:", detalles);
    return detalles;
  } catch (error) {
    console.error("Error al obtener detalles de ventas:", error);
    throw error;
  }
}

// -------------------- Obtener detalles de una venta específica --------------------
export async function getDetallesByVenta(idVenta: number): Promise<DetalleVenta[]> {
  try {
    const detalles = await invoke<DetalleVenta[]>("get_detalles_by_venta_command", { idVenta });
    console.log(`Detalles de la venta con ID ${idVenta}:`, detalles);
    return detalles;
  } catch (error) {
    console.error(`Error al obtener detalles de la venta con ID ${idVenta}:`, error);
    throw error;
  }
}

// -------------------- Obtener detalles de una obra específica --------------------
export async function getDetallesByObra(idObra: number): Promise<DetalleVenta[]> {
  try {
    const detalles = await invoke<DetalleVenta[]>("get_detalles_by_obra_command", { idObra });
    console.log(`Detalles de la obra con ID ${idObra}:`, detalles);
    return detalles;
  } catch (error) {
    console.error(`Error al obtener detalles de la obra con ID ${idObra}:`, error);
    throw error;
  }
}

// -------------------- Obtener la cantidad total de detalles de ventas --------------------
export async function getCountDetallesVentas(): Promise<number> {
  try {
    const count = await invoke<number>("get_count_detalles_ventas_command");
    console.log(`Total de detalles de ventas: ${count}`);
    return count;
  } catch (error) {
    console.error("Error al obtener el total de detalles de ventas:", error);
    throw error;
  }
}

// -------------------- Eliminar un detalle de venta por ID --------------------
export async function deleteDetalleVenta(id: number): Promise<void> {
  try {
    const response = await invoke<string>("delete_detalle_venta_command", { id });
    console.log(response);
  } catch (error) {
    console.error(`Error al eliminar detalle de venta con ID ${id}:`, error);
    throw error;
  }
}
