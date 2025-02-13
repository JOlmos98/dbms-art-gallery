import { invoke } from "@tauri-apps/api/core";

export async function insertExampleData() {
  try {
    const mensaje = await invoke<string>("insert_example_data_command");
    console.log(mensaje);
  } catch (error) {
    console.error("Error al insertar registros de ejemplo:", error);
  }
}
