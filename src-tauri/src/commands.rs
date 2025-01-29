use tauri::command;
use crate::empleados_repository; 
use crate::clientes_repository; // Importar el repositorio de clientes
use crate::dto::Cliente;
use crate::dto::Empleado;

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

/// Insertar empleado
#[allow(non_snake_case)]
#[command]
pub fn insertar_empleado_command(nombre: String, cargo: String, telefono: String, email: String, fechaContratacion: String) -> Result<String, String> {
    match empleados_repository::insertar_empleado(&nombre, &cargo, &telefono, &email, &fechaContratacion) {
        Ok(_) => Ok(format!("Empleado {} insertado correctamente.", nombre)),
        Err(err) => Err(format!("Error al insertar empleado: {}", err)),
    }
}

/// Obtener todos los empleados
#[allow(non_snake_case)]
#[command]
pub fn get_all_empleados_command() -> Result<Vec<Empleado>, String> {
    empleados_repository::get_all_empleados()
}

/// Obtener un empleado por ID
#[allow(non_snake_case)]
#[command]
pub fn get_empleado_by_id_command(id: i32) -> Result<Empleado, String> {
    empleados_repository::get_empleado_by_id(id)
}

/// Obtener todos los empleados por cargo
#[allow(non_snake_case)]
#[command]
pub fn get_all_empleados_by_cargo_command(cargo: String) -> Result<Vec<Empleado>, String> {
    empleados_repository::get_all_empleados_by_cargo(&cargo)
}

/// Obtener la cantidad total de empleados
#[allow(non_snake_case)]
#[command]
pub fn get_count_empleados_command() -> Result<i32, String> {
    empleados_repository::get_count_empleados()
}

/// Obtener la última fecha de actualización en la tabla Empleados
#[allow(non_snake_case)]
#[command]
pub fn get_last_update_at_empleados_command() -> Result<String, String> {
    empleados_repository::get_last_update_at_empleados()
}

/// Eliminar un empleado por ID
#[allow(non_snake_case)]
#[command]
pub fn delete_empleado_command(id: i32) -> Result<String, String> {
    match empleados_repository::delete_empleado(id) {
        Ok(_) => Ok(format!("Empleado con ID {} eliminado correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar empleado: {}", err)),
    }
}

/// Actualizar la información de un empleado
#[allow(non_snake_case)]
#[command]
pub fn update_empleado_command(id: i32, nombre: String, cargo: String, telefono: String, email: String, fechaContratacion: String) -> Result<String, String> {
    match empleados_repository::update_empleado(id, &nombre, &cargo, &telefono, &email, &fechaContratacion) {
        Ok(_) => Ok(format!("Empleado con ID {} actualizado correctamente.", id)),
        Err(err) => Err(format!("Error al actualizar empleado: {}", err)),
    }
}


/*

pub fn get_all_clientes_command() -> Result<Vec<Cliente>, String> {
    clientes_repository::get_all_clientes()
}

*/