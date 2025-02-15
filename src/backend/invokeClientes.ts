'use client'

import { invoke } from "@tauri-apps/api/core";
import { Cliente } from "./dto";

// -------------------- Obtener todos los clientes --------------------
export async function getAllClientes(): Promise<Cliente[]> {
  try {
    const clientes = await invoke<Cliente[]>("get_all_clientes_command");
    console.log("Clientes obtenidos:", clientes);
    return clientes;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
}

// -------------------- Obtener un cliente por ID --------------------
export async function getClienteById(id: number): Promise<Cliente> {
  try {
    const cliente = await invoke<Cliente>("get_cliente_by_id_command", { id });
    console.log(`Cliente obtenido con ID ${id}:`, cliente);
    return cliente;
  } catch (error) {
    console.error(`Error al obtener cliente con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Insertar un nuevo cliente --------------------
export async function insertCliente(
  nombre: string,
  direccion: string,
  telefono: string,
  email: string
): Promise<string> {
  try {
    const response = await invoke<string>("insert_cliente_command", {
      nombre,
      direccion,
      telefono,
      email,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    throw error;
  }
}

// -------------------- Obtener la cantidad total de clientes --------------------
export async function getCountClientes(): Promise<number> {
  try {
    const count = await invoke<number>("get_count_clientes_command");
    console.log(`Total de clientes: ${count}`);
    return count;
  } catch (error) {
    console.error("Error al obtener el total de clientes:", error);
    throw error;
  }
}

// -------------------- Obtener la última fecha de actualización de clientes --------------------
export async function getLastUpdateAtClientes(): Promise<string> {
  try {
    const lastUpdate = await invoke<string>("get_last_update_at_clientes_command");
    console.log(`Última actualización en clientes: ${lastUpdate}`);
    return lastUpdate;
  } catch (error) {
    console.error("Error al obtener la última fecha de actualización de clientes:", error);
    throw error;
  }
}

// -------------------- Eliminar un cliente por ID --------------------
export async function deleteCliente(id: number): Promise<void> {
  try {
    const response = await invoke<string>("delete_cliente_command", { id });
    console.log(response);
  } catch (error) {
    console.error(`Error al eliminar cliente con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Actualizar datos de un cliente --------------------
export async function updateCliente(
  id: number,
  nombre: string,
  direccion: string,
  telefono: string,
  email: string
): Promise<string> {
  try {
    const response = await invoke<string>("update_cliente_command", {
      id,
      nombre,
      direccion,
      telefono,
      email,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error al actualizar cliente con ID ${id}:`, error);
    throw error;
  }
}
