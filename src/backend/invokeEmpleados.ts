import { invoke } from "@tauri-apps/api/core";
import { Empleado } from "./dto";

// -------------------- Obtener todos los clientes --------------------
export async function getAllEmpleados(): Promise<Empleado[]> {
  try {
    const empleados = await invoke<Empleado[]>("get_all_empleados_command");
    console.log("Empleados obtenidos:", empleados);
    return empleados;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
}

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

// -------------------- Obtener un empleado por ID --------------------
export async function getEmpleadoById(id: number): Promise<Empleado> {
  try {
    const empleado = await invoke<Empleado>("get_empleado_by_id_command", { id });
    console.log(`Empleado obtenido con ID ${id}:`, empleado);
    return empleado;
  } catch (error) {
    console.error(`Error al obtener empleado con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Obtener empleados por cargo --------------------
export async function getAllEmpleadosByCargo(cargo: string): Promise<Empleado[]> {
  try {
    const empleados = await invoke<Empleado[]>("get_all_empleados_by_cargo_command", { cargo });
    console.log(`Empleados obtenidos con cargo ${cargo}:`, empleados);
    return empleados;
  } catch (error) {
    console.error(`Error al obtener empleados con cargo ${cargo}:`, error);
    throw error;
  }
}

// -------------------- Obtener la cantidad total de empleados --------------------
export async function getCountEmpleados(): Promise<number> {
  try {
    const count = await invoke<number>("get_count_empleados_command");
    console.log(`Total de empleados: ${count}`);
    return count;
  } catch (error) {
    console.error("Error al obtener el total de empleados:", error);
    throw error;
  }
}

// -------------------- Obtener la última fecha de actualización de empleados --------------------
export async function getLastUpdateAtEmpleados(): Promise<string> {
  try {
    const lastUpdate = await invoke<string>("get_last_update_at_empleados_command");
    console.log(`Última actualización en empleados: ${lastUpdate}`);
    return lastUpdate;
  } catch (error) {
    console.error("Error al obtener la última fecha de actualización de empleados:", error);
    throw error;
  }
}

// -------------------- Eliminar un empleado por ID --------------------
export async function deleteEmpleado(id: number): Promise<void> {
  try {
    const response = await invoke<string>("delete_empleado_command", { id });
    console.log(response);
  } catch (error) {
    console.error(`Error al eliminar empleado con ID ${id}:`, error);
    throw error;
  }
}

// -------------------- Actualizar datos de un empleado --------------------
export async function updateEmpleado(
  id: number,
  nombre: string,
  cargo: string,
  telefono: string,
  email: string,
  fechaContratacion: string
): Promise<void> {
  try {
    const response = await invoke<string>("update_empleado_command", {
      id,
      nombre,
      cargo,
      telefono,
      email,
      fechaContratacion,
    });
    console.log(response);
  } catch (error) {
    console.error(`Error al actualizar empleado con ID ${id}:`, error);
    throw error;
  }
}
