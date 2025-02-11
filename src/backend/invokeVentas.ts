"use client";

import { invoke } from "@tauri-apps/api/core";
import { Venta } from "./dto";

// -------------------- Obtener todas las ventas --------------------
export async function getAllVentas(): Promise<Venta[]> {
  try {
    const ventas = await invoke<Venta[]>("get_all_ventas_command");
    console.log("Ventas obtenidas:", ventas);
    return ventas;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error;
  }
}

// -------------------- Obtener una venta por ID --------------------
export async function getVentaById(id: number): Promise<Venta> {
  try {
    const venta = await invoke<Venta>("get_venta_by_id_command", { id });
    console.log(`Venta obtenida con ID ${id}:`, venta);
    return venta;
  } catch (error) {
    console.error(`Error al obtener venta con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Obtener todas las ventas de un cliente --------------------
export async function getVentasByCliente(idCliente: number): Promise<Venta[]> {
  try {
    const ventas = await invoke<Venta[]>("get_ventas_by_cliente_command", { idCliente });
    console.log(`Ventas obtenidas para el cliente con ID ${idCliente}:`, ventas);
    return ventas;
  } catch (error) {
    console.error(`Error al obtener ventas del cliente con ID ${idCliente}:`, error);
    throw error;
  }
}

// -------------------- Obtener la cantidad total de ventas --------------------
export async function getCountVentas(): Promise<number> {
  try {
    const count = await invoke<number>("get_count_ventas_command");
    console.log(`Total de ventas: ${count}`);
    return count;
  } catch (error) {
    console.error("Error al obtener el total de ventas:", error);
    throw error;
  }
}

// -------------------- Obtener la última fecha de actualización de ventas --------------------
export async function getLastUpdateAtVentas(): Promise<string> {
  try {
    const lastUpdate = await invoke<string>("get_last_update_at_ventas_command");
    console.log(`Última actualización en ventas: ${lastUpdate}`);
    return lastUpdate;
  } catch (error) {
    console.error("Error al obtener la última fecha de actualización de ventas:", error);
    throw error;
  }
}

// -------------------- Insertar una nueva venta --------------------
export async function insertVenta(
  idCliente: number,
  fecha: string,
  total: number
): Promise<number> { // Devuelve el ID de la venta creada
  try {
    const idVenta = await invoke<number>("insert_venta_command", {
      idCliente,
      fecha,
      total,
    });
    console.log(`Venta insertada con ID ${idVenta}`);
    return idVenta;
  } catch (error) {
    console.error("Error al insertar venta:", error);
    throw error;
  }
}

// -------------------- Eliminar una venta por ID --------------------
export async function deleteVenta(id: number): Promise<void> {
  try {
    const response = await invoke<string>("delete_venta_command", { id });
    console.log(response);
  } catch (error) {
    console.error(`Error al eliminar venta con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Actualizar datos de una venta --------------------
export async function updateVenta(
  id: number,
  fecha: string,
  total: number
): Promise<string> {
  try {
    const response = await invoke<string>("update_venta_command", {
      id,
      fecha,
      total,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error al actualizar venta con ID ${id}:`, error);
    throw error;
  }
}
