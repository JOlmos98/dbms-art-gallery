use tauri::command;
use crate::empleados_repository; 
use crate::clientes_repository; // Importar el repositorio de clientes
use crate::dto::Cliente;

// ------------------------------------------------------------------------------------------------
// ------------------------------------------ Clientes --------------------------------------------
// ------------------------------------------------------------------------------------------------

// Comando para obtener todos los clientes
#[command]
pub fn get_all_clientes_command() -> Result<Vec<Cliente>, String> {
    clientes_repository::get_all_clientes()
}

// Comando para obtener un cliente por ID
#[command]
pub fn get_cliente_by_id_command(id: i32) -> Result<Cliente, String> {
    clientes_repository::get_cliente_by_id(id)
}

// Comando para insertar un nuevo cliente
#[command]
pub fn insertar_cliente_command(
    nombre: &str,
    direccion: &str,
    telefono: &str,
    email: &str,
) -> Result<String, String> {
    match clientes_repository::insertar_cliente(nombre, direccion, telefono, email) {
        Ok(_) => Ok("Cliente insertado correctamente.".to_string()),
        Err(err) => Err(format!("Error al insertar cliente: {}", err)),
    }
}

// Comando para eliminar un cliente por ID
#[command]
pub fn eliminar_cliente_command(id: i32) -> Result<String, String> {
    match clientes_repository::eliminar_cliente(id) {
        Ok(_) => Ok(format!("Cliente con ID {} eliminado correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar cliente: {}", err)),
    }
}

// Comando para modificar el nombre de un cliente
#[command]
pub fn modificar_nombre_cliente_command(id: i32, nuevo_nombre: String) -> Result<String, String> {
    match clientes_repository::modificar_nombre_cliente(id, &nuevo_nombre) {
        Ok(_) => Ok(format!("Cliente con ID {} modificado correctamente.", id)),
        Err(err) => Err(format!("Error al modificar cliente: {}", err)),
    }
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------ Empleados -------------------------------------------
// ------------------------------------------------------------------------------------------------

#[allow(non_snake_case)]
#[command]
pub fn insertar_empleado_command(nombre: String, cargo: String, telefono: String, email: String, fechaContratacion: String) -> Result<String, String> {
    match empleados_repository::insertar_empleado(&nombre, &cargo, &telefono, &email, &fechaContratacion) {
        Ok(_) => Ok(format!("Empleado {} insertado correctamente.", nombre)),
        Err(err) => Err(format!("Error al insertar empleado: {}", err)),
    }
}