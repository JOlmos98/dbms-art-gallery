"use client"

import { invoke } from "@tauri-apps/api/core";
import { Obra } from "./dto";

// -------------------- Obtener todas las obras --------------------
export async function getAllObras(): Promise<Obra[]> {
  try {
    const obras = await invoke<Obra[]>("get_all_obras_command");
    console.log("Obras obtenidas:", obras);
    return obras;
  } catch (error) {
    console.error("Error al obtener obras:", error);
    throw error;
  }
}

// -------------------- Obtener una obra por ID --------------------
export async function getObraById(id: number): Promise<Obra> {
  try {
    const obra = await invoke<Obra>("get_obra_by_id_command", { id });
    console.log(`Obra obtenida con ID ${id}:`, obra);
    return obra;
  } catch (error) {
    console.error(`Error al obtener obra con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Obtener todas las obras por tipo --------------------
export async function getAllObrasByTipo(tipo: string): Promise<Obra[]> {
  try {
    const obras = await invoke<Obra[]>("get_all_obras_by_tipo_command", { tipo });
    console.log(`Obras obtenidas del tipo ${tipo}:`, obras);
    return obras;
  } catch (error) {
    console.error(`Error al obtener obras del tipo ${tipo}:`, error);
    throw error;
  }
}

// -------------------- Obtener la cantidad total de obras --------------------
export async function getCountObras(): Promise<number> {
  try {
    const count = await invoke<number>("get_count_obras_command");
    console.log(`Total de obras: ${count}`);
    return count;
  } catch (error) {
    console.error("Error al obtener el total de obras:", error);
    throw error;
  }
}

// -------------------- Obtener la última fecha de actualización de obras --------------------
export async function getLastUpdateAtObras(): Promise<string> {
  try {
    const lastUpdate = await invoke<string>("get_last_update_at_obras_command");
    console.log(`Última actualización en obras: ${lastUpdate}`);
    return lastUpdate;
  } catch (error) {
    console.error("Error al obtener la última fecha de actualización de obras:", error);
    throw error;
  }
}

// -------------------- Insertar una nueva obra --------------------
export async function insertObra(
  titulo: string,
  tipo: string,
  precio: number,
  descripcion: string,
  fechaCreacion: string,
  estado: string, //Disponible o No disponible.
  idAutor: number
): Promise<string> {
  try {
    const response = await invoke<string>("insert_obra_command", {
      titulo,
      tipo,
      precio,
      descripcion,
      fechaCreacion,
      estado,
      idAutor,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al insertar obra:", error);
    throw error;
  }
}

// -------------------- Eliminar una obra por ID --------------------
export async function deleteObra(id: number): Promise<void> {
  try {
    const response = await invoke<string>("delete_obra_command", { id });
    console.log(response);
  } catch (error) {
    console.error(`Error al eliminar obra con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Actualizar datos de una obra --------------------
export async function updateObra(
  id: number,
  titulo: string,
  tipo: string,
  precio: number,
  descripcion: string,
  fechaCreacion: string,
  estado: string
): Promise<string> {
  try {
    const response = await invoke<string>("update_obra_command", {
      id,
      titulo,
      tipo,
      precio,
      descripcion,
      fechaCreacion,
      estado, //Disponible o No disponible.
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error al actualizar obra con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Marcar una obra como "No disponible" --------------------
export async function setObraNoDisponible(id: number): Promise<string> {
  try {
    const response = await invoke<string>("set_obra_no_disponible_command", { id });
    console.log(`Obra con ID ${id} marcada como 'No disponible'.`);
    return response;
  } catch (error) {
    console.error(`Error al actualizar estado de la obra con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Comprobar estado de una obra --------------------
export async function comprobarEstadoObra(idObra: number): Promise<boolean> {
  try {
    const estado = await invoke<boolean>("comprobar_estado_obra_command", { idObra }); // Cambia `id_obra` a `idObra`
    return estado;
  } catch (error) {
    console.error(`Error al comprobar el estado de la obra con ID ${idObra}:`, error);
    throw error;
  }
}