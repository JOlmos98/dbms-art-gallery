"use client"

import { invoke } from "@tauri-apps/api/core";
import { Artista } from "./dto";

// -------------------- Obtener todos los artistas --------------------
export async function getAllArtistas(): Promise<Artista[]> {
  try {
    const artistas = await invoke<Artista[]>("get_all_artistas_command");
    console.log("Artistas obtenidos:", artistas);
    return artistas;
  } catch (error) {
    console.error("Error al obtener artistas:", error);
    throw error;
  }
}

// -------------------- Obtener un artista por ID --------------------
export async function getArtistaById(id: number): Promise<Artista> {
  try {
    const artista = await invoke<Artista>("get_artista_by_id_command", { id });
    console.log(`Artista obtenido con ID ${id}:`, artista);
    return artista;
  } catch (error) {
    console.error(`Error al obtener artista con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Obtener todos los artistas por país --------------------
export async function getAllArtistasByPais(pais: string): Promise<Artista[]> {
  try {
    const artistas = await invoke<Artista[]>("get_all_artistas_by_pais_command", { pais });
    console.log(`Artistas obtenidos del país ${pais}:`, artistas);
    return artistas;
  } catch (error) {
    console.error(`Error al obtener artistas del país ${pais}:`, error);
    throw error;
  }
}

// -------------------- Obtener la cantidad total de artistas --------------------
export async function getCountArtistas(): Promise<number> {
  try {
    const count = await invoke<number>("get_count_artistas_command");
    console.log(`Total de artistas: ${count}`);
    return count;
  } catch (error) {
    console.error("Error al obtener el total de artistas:", error);
    throw error;
  }
}

// -------------------- Obtener la última fecha de actualización de artistas --------------------
export async function getLastUpdateAtArtistas(): Promise<string> {
  try {
    const lastUpdate = await invoke<string>("get_last_update_at_artistas_command");
    console.log(`Última actualización en artistas: ${lastUpdate}`);
    return lastUpdate;
  } catch (error) {
    console.error("Error al obtener la última fecha de actualización de artistas:", error);
    throw error;
  }
}

// -------------------- Insertar un nuevo artista --------------------
export async function insertArtista(
  nombre: string,
  pais: string,
  fechaNac: string,
  biografia?: string
): Promise<string> {
  try {
    const response = await invoke<string>("insert_artista_command", {
      nombre,
      pais,
      fechaNac,
      biografia,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al insertar artista:", error);
    throw error;
  }
}

// -------------------- Eliminar un artista por ID --------------------
export async function deleteArtista(id: number): Promise<void> {
  try {
    const response = await invoke<string>("delete_artista_command", { id });
    console.log(response);
  } catch (error) {
    console.error(`Error al eliminar artista con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Actualizar datos de un artista --------------------
export async function updateArtista(
  id: number,
  nombre: string,
  pais: string,
  fechaNac: string,
  biografia?: string
): Promise<string> {
  try {
    const response = await invoke<string>("update_artista_command", {
      id,
      nombre,
      pais,
      fechaNac,
      biografia,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error al actualizar artista con ID ${id}:`, error);
    throw error;
  }
}
