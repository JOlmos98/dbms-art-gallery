use tauri::command;
use crate::artistas_repository;
use crate::empleados_repository; 
use crate::clientes_repository; // Importar el repositorio de clientes
use crate::obras_repository;
use crate::ventas_repository;
use crate::detalles_ventas_repository;

use crate::dto::Cliente;
use crate::dto::Empleado;
use crate::dto::Artista;
use crate::dto::Obra;
use crate::dto::Venta;
use crate::dto::DetalleVenta;

// ------------------------------------------------------------------------------------------------
// ------------------------------------------ Artistas -------------------------------------------
// ------------------------------------------------------------------------------------------------

/// Insertar un artista
#[allow(non_snake_case)]
#[command]
pub fn insert_artista_command(nombre: String, pais: String, fechaNac: String, biografia: Option<String>) -> Result<String, String> {
    match artistas_repository::insert_artista(&nombre, &pais, &fechaNac, biografia.as_deref()) {
        Ok(_) => Ok(format!("Artista {} insertado correctamente.", nombre)),
        Err(err) => Err(format!("Error al insertar artista: {}", err)),
    }
}

/// Obtener todos los artistas
#[allow(non_snake_case)]
#[command]
pub fn get_all_artistas_command() -> Result<Vec<Artista>, String> {
    artistas_repository::get_all_artistas()
}

/// Obtener un artista por ID
#[allow(non_snake_case)]
#[command]
pub fn get_artista_by_id_command(id: i32) -> Result<Artista, String> {
    artistas_repository::get_artista_by_id(id)
}

/// Obtener todos los artistas por país
#[allow(non_snake_case)]
#[command]
pub fn get_all_artistas_by_pais_command(pais: String) -> Result<Vec<Artista>, String> {
    artistas_repository::get_all_artistas_by_pais(&pais)
}

/// Obtener la cantidad total de artistas
#[allow(non_snake_case)]
#[command]
pub fn get_count_artistas_command() -> Result<i32, String> {
    artistas_repository::get_count_artistas()
}

/// Obtener la última fecha de actualización en la tabla Artistas
#[allow(non_snake_case)]
#[command]
pub fn get_last_update_at_artistas_command() -> Result<String, String> {
    artistas_repository::get_last_update_at_artistas()
}

/// Eliminar un artista por ID
#[allow(non_snake_case)]
#[command]
pub fn delete_artista_command(id: i32) -> Result<String, String> {
    match artistas_repository::delete_artista(id) {
        Ok(_) => Ok(format!("Artista con ID {} eliminado correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar artista: {}", err)),
    }
}

/// Actualizar la información de un artista
#[allow(non_snake_case)]
#[command]
pub fn update_artista_command(id: i32, nombre: String, pais: String, fechaNac: String, biografia: Option<String>) -> Result<String, String> {
    match artistas_repository::update_artista(id, &nombre, &pais, &fechaNac, biografia.as_deref()) {
        Ok(_) => Ok(format!("Artista con ID {} actualizado correctamente.", id)),
        Err(err) => Err(format!("Error al actualizar artista: {}", err)),
    }
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------ Empleados -------------------------------------------
// ------------------------------------------------------------------------------------------------

/// Insertar empleado
#[allow(non_snake_case)]
#[command]
pub fn insert_empleado_command(nombre: String, cargo: String, telefono: String, email: String, fechaContratacion: String) -> Result<String, String> {
    match empleados_repository::insert_empleado(&nombre, &cargo, &telefono, &email, &fechaContratacion) {
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

// ------------------------------------------------------------------------------------------------
// ------------------------------------------ Clientes --------------------------------------------
// ------------------------------------------------------------------------------------------------

/// Insertar cliente
#[allow(non_snake_case)]
#[command]
pub fn insert_cliente_command(nombre: String, direccion: String, telefono: String, email: String) -> Result<String, String> {
    match clientes_repository::insert_cliente(&nombre, &direccion, &telefono, &email) {
        Ok(_) => Ok(format!("Cliente {} insertado correctamente.", nombre)),
        Err(err) => Err(format!("Error al insertar cliente: {}", err)),
    }
}

/// Obtener todos los clientes
#[allow(non_snake_case)]
#[command]
pub fn get_all_clientes_command() -> Result<Vec<Cliente>, String> {
    clientes_repository::get_all_clientes()
}

/// Obtener un cliente por ID
#[allow(non_snake_case)]
#[command]
pub fn get_cliente_by_id_command(id: i32) -> Result<Cliente, String> {
    clientes_repository::get_cliente_by_id(id)
}

/// Obtener la cantidad total de clientes
#[allow(non_snake_case)]
#[command]
pub fn get_count_clientes_command() -> Result<i32, String> {
    clientes_repository::get_count_clientes()
}

/// Obtener la última fecha de actualización en la tabla Clientes
#[allow(non_snake_case)]
#[command]
pub fn get_last_update_at_clientes_command() -> Result<String, String> {
    clientes_repository::get_last_update_at_clientes()
}

/// Eliminar un cliente por ID
#[allow(non_snake_case)]
#[command]
pub fn delete_cliente_command(id: i32) -> Result<String, String> {
    match clientes_repository::delete_cliente(id) {
        Ok(_) => Ok(format!("Cliente con ID {} eliminado correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar cliente: {}", err)),
    }
}

/// Actualizar la información de un cliente
#[allow(non_snake_case)]
#[command]
pub fn update_cliente_command(id: i32, nombre: String, direccion: String, telefono: String, email: String) -> Result<String, String> {
    match clientes_repository::update_cliente(id, &nombre, &direccion, &telefono, &email) {
        Ok(_) => Ok(format!("Cliente con ID {} actualizado correctamente.", id)),
        Err(err) => Err(format!("Error al actualizar cliente: {}", err)),
    }
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------ Obras --------------------------------------------
// ------------------------------------------------------------------------------------------------

/// Insertar una nueva obra
#[allow(non_snake_case)]
#[command]
pub fn insert_obra_command(
    titulo: String,
    tipo: String,
    precio: f64,
    descripcion: String,
    fechaCreacion: String,
    estado: String,
    idAutor: i32,
) -> Result<String, String> {
    match obras_repository::insert_obra(&titulo, &tipo, precio, &descripcion, &fechaCreacion, &estado, idAutor) {
        Ok(_) => Ok(format!("Obra '{}' insertada correctamente.", titulo)),
        Err(err) => Err(format!("Error al insertar obra: {}", err)),
    }
}

/// Obtener todas las obras
#[allow(non_snake_case)]
#[command]
pub fn get_all_obras_command() -> Result<Vec<Obra>, String> {
    obras_repository::get_all_obras()
}

/// Obtener una obra por ID
#[allow(non_snake_case)]
#[command]
pub fn get_obra_by_id_command(id: i32) -> Result<Obra, String> {
    obras_repository::get_obra_by_id(id)
}

/// Obtener todas las obras por tipo
#[allow(non_snake_case)]
#[command]
pub fn get_all_obras_by_tipo_command(tipo: String) -> Result<Vec<Obra>, String> {
    obras_repository::get_all_obras_by_tipo(&tipo)
}

/// Obtener la cantidad total de obras
#[allow(non_snake_case)]
#[command]
pub fn get_count_obras_command() -> Result<i32, String> {
    obras_repository::get_count_obras()
}

/// Obtener la última fecha de actualización en la tabla Obras
#[allow(non_snake_case)]
#[command]
pub fn get_last_update_at_obras_command() -> Result<String, String> {
    obras_repository::get_last_update_at_obras()
}

/// Eliminar una obra por ID
#[allow(non_snake_case)]
#[command]
pub fn delete_obra_command(id: i32) -> Result<String, String> {
    match obras_repository::delete_obra(id) {
        Ok(_) => Ok(format!("Obra con ID {} eliminada correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar obra: {}", err)),
    }
}

/// Actualizar la información de una obra
#[allow(non_snake_case)]
#[command]
pub fn update_obra_command(
    id: i32,
    titulo: String,
    tipo: String,
    precio: f64,
    descripcion: String,
    fechaCreacion: String,
    estado: String,
) -> Result<String, String> {
    match obras_repository::update_obra(id, &titulo, &tipo, precio, &descripcion, &fechaCreacion, &estado) {
        Ok(_) => Ok(format!("Obra con ID {} actualizada correctamente.", id)),
        Err(err) => Err(format!("Error al actualizar obra: {}", err)),
    }
}

/// ------------------------------------------------------------------------------------------------
/// ------------------------------------------ Ventas ----------------------------------------------
/// ------------------------------------------------------------------------------------------------

/// Insertar una nueva venta
#[allow(non_snake_case)]
#[command]
pub fn insert_venta_command(idCliente: i32, fecha: String, total: f64) -> Result<i32, String> {
    ventas_repository::insert_venta(idCliente, &fecha, total)
}

/// Obtener todas las ventas
#[allow(non_snake_case)]
#[command]
pub fn get_all_ventas_command() -> Result<Vec<Venta>, String> {
    ventas_repository::get_all_ventas()
}

/// Obtener una venta por ID
#[allow(non_snake_case)]
#[command]
pub fn get_venta_by_id_command(id: i32) -> Result<Venta, String> {
    ventas_repository::get_venta_by_id(id)
}

/// Obtener todas las ventas de un cliente por ID
#[allow(non_snake_case)]
#[command]
pub fn get_ventas_by_cliente_command(idCliente: i32) -> Result<Vec<Venta>, String> {
    ventas_repository::get_ventas_by_cliente(idCliente)
}

/// Obtener la cantidad total de ventas
#[allow(non_snake_case)]
#[command]
pub fn get_count_ventas_command() -> Result<i32, String> {
    ventas_repository::get_count_ventas()
}

/// Obtener la última fecha de actualización en la tabla Ventas
#[allow(non_snake_case)]
#[command]
pub fn get_last_update_at_ventas_command() -> Result<String, String> {
    ventas_repository::get_last_update_at_ventas()
}

/// Eliminar una venta por ID
#[allow(non_snake_case)]
#[command]
pub fn delete_venta_command(id: i32) -> Result<String, String> {
    match ventas_repository::delete_venta(id) {
        Ok(_) => Ok(format!("Venta con ID {} eliminada correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar la venta: {}", err)),
    }
}

/// Actualizar una venta
#[allow(non_snake_case)]
#[command]
pub fn update_venta_command(id: i32, fecha: String, total: f64) -> Result<String, String> {
    match ventas_repository::update_venta(id, &fecha, total) {
        Ok(_) => Ok(format!("Venta con ID {} actualizada correctamente.", id)),
        Err(err) => Err(format!("Error al actualizar la venta: {}", err)),
    }
}

/// ------------------------------------------------------------------------------------------------
/// -------------------------------------- Commands DetallesVentas ---------------------------------
/// ------------------------------------------------------------------------------------------------

/// Insertar un nuevo detalle de venta
#[allow(non_snake_case)]
#[command]
pub fn insert_detalle_venta_command(idVenta: i32, idObra: i32) -> Result<String, String> {
    match detalles_ventas_repository::insert_detalle_venta(idVenta, idObra) {
        Ok(_) => Ok(format!("Detalle de venta insertado correctamente. Venta ID: {}, Obra ID: {}", idVenta, idObra)),
        Err(err) => Err(format!("Error al insertar detalle de venta: {}", err)),
    }
}

/// Obtener todos los detalles de ventas
#[allow(non_snake_case)]
#[command]
pub fn get_all_detalles_ventas_command() -> Result<Vec<DetalleVenta>, String> {
    detalles_ventas_repository::get_all_detalles_ventas()
}

/// Obtener todos los detalles de ventas por ID de Venta
#[allow(non_snake_case)]
#[command]
pub fn get_detalles_by_venta_command(idVenta: i32) -> Result<Vec<DetalleVenta>, String> {
    detalles_ventas_repository::get_detalles_by_venta(idVenta)
}

/// Obtener todos los detalles de ventas por ID de Obra
#[allow(non_snake_case)]
#[command]
pub fn get_detalles_by_obra_command(idObra: i32) -> Result<Vec<DetalleVenta>, String> {
    detalles_ventas_repository::get_detalles_by_obra(idObra)
}

/// Obtener la cantidad total de detalles de ventas
#[allow(non_snake_case)]
#[command]
pub fn get_count_detalles_ventas_command() -> Result<i32, String> {
    detalles_ventas_repository::get_count_detalles_ventas()
}

/// Eliminar un detalle de venta por ID
#[allow(non_snake_case)]
#[command]
pub fn delete_detalle_venta_command(id: i32) -> Result<String, String> {
    match detalles_ventas_repository::delete_detalle_venta(id) {
        Ok(_) => Ok(format!("Detalle de venta con ID {} eliminado correctamente.", id)),
        Err(err) => Err(format!("Error al eliminar detalle de venta: {}", err)),
    }
}
