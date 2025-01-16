'use client'

import { invoke } from "@tauri-apps/api/core";

// -------------------- Insertar un nuevo empleado --------------------
export async function insertarEmpleado(nombre: string, cargo: string, telefono: string, email: string, fechaContratacion: string): Promise<void> {
  try {
    const response = await invoke<string>("insertar_empleado_command", {
      nombre,
      cargo,
      telefono,
      email,
      fechaContratacion,
    });
    console.log(response);
  } catch (error) {
    console.error("Error al insertar empleado:", error);
    throw error;
  }
}

/*

// -------------------- Insertar un nuevo cliente --------------------
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

*/