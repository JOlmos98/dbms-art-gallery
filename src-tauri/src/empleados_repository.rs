use rusqlite::{params, Connection, Result};
use crate::dto::Empleado;

/// Insertar empleado
#[allow(non_snake_case)]
pub fn insertar_empleado(nombre: &str, cargo: &str, telefono: &str, email: &str, fechaContratacion: &str) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db").map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn.execute("INSERT INTO Empleados (nombre, cargo, telefono, email, fechaContratacion, fechaRegistro, fechaModificacion) VALUES (?1, ?2, ?3, ?4, ?5, datetime('now'), datetime('now'))",
            params![nombre, cargo, telefono, email, fechaContratacion],
        ).map_err(|e| format!("Error al insertar empleado: {}", e))?;

    Ok(rows_inserted)
}

/// Obtener todos los empleados
pub fn get_all_empleados() -> Result<Vec<Empleado>, String> {
    // Conectar a la base de datos
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    // Preparar la consulta SQL
    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, cargo, telefono, email, fechaContratacion, fechaRegistro, fechaModificacion
             FROM Empleados",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    // Ejecutar la consulta y mapear los resultados a structs de Empleado
    let empleados_iter = stmt
        .query_map([], |row| {
            Ok(Empleado {
                id: row.get(0)?,
                nombre: row.get(1)?,
                cargo: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                fechaContratacion: row.get(5)?,
                fechaRegistro: row.get(6)?,
                fechaModificacion: row.get(7)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    // Procesar las filas obtenidas
    let mut empleados = Vec::new();
    for empleado in empleados_iter {
        empleados.push(empleado.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(empleados)
}

/// Obtener todos los empleados por cargo
pub fn get_all_empleados_by_cargo(cargo: &str) -> Result<Vec<Empleado>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, cargo, telefono, email, fechaContratacion, fechaRegistro, fechaModificacion
             FROM Empleados WHERE cargo = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let empleados_iter = stmt
        .query_map([cargo], |row| {
            Ok(Empleado {
                id: row.get(0)?,
                nombre: row.get(1)?,
                cargo: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                fechaContratacion: row.get(5)?,
                fechaRegistro: row.get(6)?,
                fechaModificacion: row.get(7)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut empleados = Vec::new();
    for empleado in empleados_iter {
        empleados.push(empleado.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(empleados)
}

/// Obtener la cantidad total de empleados
pub fn get_count_empleados() -> Result<i32, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT COUNT(*) FROM Empleados")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let count: i32 = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(count)
}

/// Obtener la última fecha de actualización en la tabla Empleados
pub fn get_last_update_at_empleados() -> Result<String, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT MAX(fechaModificacion) FROM Empleados")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let last_update: Option<String> = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al obtener la última actualización: {}", e))?;

    match last_update {
        Some(date) => Ok(date),
        None => Err("No se encontraron registros en la tabla Empleados.".to_string()),
    }
}

/// Obtener un empleado por ID
pub fn get_empleado_by_id(id: i32) -> Result<Empleado, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, cargo, telefono, email, fechaContratacion, fechaRegistro, fechaModificacion
             FROM Empleados WHERE id = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let empleado = stmt
        .query_row([id], |row| {
            Ok(Empleado {
                id: row.get(0)?,
                nombre: row.get(1)?,
                cargo: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                fechaContratacion: row.get(5)?,
                fechaRegistro: row.get(6)?,
                fechaModificacion: row.get(7)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(empleado)
}

/// Eliminar un empleado por ID
pub fn delete_empleado(id: i32) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM Empleados WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar empleado: {}", e))?;

    Ok(rows_deleted)
}

/// Actualizar la información de un empleado
pub fn update_empleado(id: i32, nombre: &str, cargo: &str, telefono: &str, email: &str, fechaContratacion: &str) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_updated = conn
        .execute(
            "UPDATE Empleados
             SET nombre = ?1, cargo = ?2, telefono = ?3, email = ?4, fechaContratacion = ?5, fechaModificacion = datetime('now')
             WHERE id = ?6",
            params![nombre, cargo, telefono, email, fechaContratacion, id],
        )
        .map_err(|e| format!("Error al actualizar empleado: {}", e))?;

    Ok(rows_updated)
}


/* 
// Insertar un nuevo cliente
pub fn insertar_cliente(
    nombre: &str,
    direccion: &str,
    telefono: &str,
    email: &str,
) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn
        .execute(
            "INSERT INTO Clientes (nombre, direccion, telefono, email, fechaRegistro, fechaModificacion)
             VALUES (?1, ?2, ?3, ?4, datetime('now'), datetime('now'))",
            params![nombre, direccion, telefono, email],
        )
        .map_err(|e| format!("Error al insertar cliente: {}", e))?;

    Ok(rows_inserted)
}
    */