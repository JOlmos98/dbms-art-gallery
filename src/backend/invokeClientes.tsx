'use client'

import { invoke } from "@tauri-apps/api/core";

export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  fechaModificacion: string;
}

// Obtener todos los clientes
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

// Obtener un cliente por ID
export async function getClienteById(id: number): Promise<Cliente | null> {
  try {
    const cliente = await invoke<Cliente | null>("get_cliente_by_id_command", { id });
    console.log("Cliente encontrado:", cliente);
    return cliente;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw error;
  }
}

// Insertar un nuevo cliente
export async function insertarCliente(
  nombre: string,
  direccion: string,
  telefono: string,
  email: string
): Promise<void> {
  try {
    const response = await invoke<string>("insertar_cliente_command", {
      nombre,
      direccion,
      telefono,
      email,
    });
    console.log(response);
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    throw error;
  }
}

// Eliminar un cliente por ID
export async function eliminarCliente(id: number): Promise<void> {
  try {
    const response = await invoke<string>("eliminar_cliente_command", { id });
    console.log(response);
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
}

// Modificar el nombre de un cliente
export async function modificarNombreCliente(id: number, nuevoNombre: string): Promise<void> {
  try {
    const response = await invoke<string>("modificar_nombre_cliente_command", { id, nuevoNombre });
    console.log(response);
  } catch (error) {
    console.error("Error al modificar cliente:", error);
    throw error;
  }
}
