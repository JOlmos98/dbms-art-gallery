use rusqlite::{params, Connection, Result};
use crate::dto::Cliente;

/// Obtener todos los clientes
pub fn get_all_clientes() -> Result<Vec<Cliente>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, direccion, telefono, email, fecha_registro, fecha_modificacion
             FROM Clientes",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let clientes_iter = stmt
        .query_map([], |row| {
            Ok(Cliente {
                id: row.get(0)?,
                nombre: row.get(1)?,
                direccion: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                fecha_registro: row.get(5)?,
                fecha_modificacion: row.get(6)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut clientes = Vec::new();
    for cliente in clientes_iter {
        clientes.push(cliente.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }
    Ok(clientes)
}

/// Obtener un cliente por ID
pub fn get_cliente_by_id(id: i32) -> Result<Cliente, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, direccion, telefono, email, fecha_registro, fecha_modificacion
             FROM Clientes WHERE id = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let cliente = stmt
        .query_row([id], |row| {
            Ok(Cliente {
                id: row.get(0)?,
                nombre: row.get(1)?,
                direccion: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                fecha_registro: row.get(5)?,
                fecha_modificacion: row.get(6)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(cliente)
}

/// Insertar un nuevo cliente
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
            "INSERT INTO Clientes (nombre, direccion, telefono, email, fecha_registro, fecha_modificacion)
             VALUES (?1, ?2, ?3, ?4, datetime('now'), datetime('now'))",
            params![nombre, direccion, telefono, email],
        )
        .map_err(|e| format!("Error al insertar cliente: {}", e))?;

    Ok(rows_inserted)
}

/// Eliminar un cliente por ID
pub fn eliminar_cliente(id: i32) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM Clientes WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar cliente: {}", e))?;

    Ok(rows_deleted)
}

/// Modificar el nombre de un cliente por ID
pub fn modificar_nombre_cliente(id: i32, nuevo_nombre: &str) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_updated = conn
        .execute(
            "UPDATE Clientes
             SET nombre = ?1, fecha_modificacion = datetime('now')
             WHERE id = ?2",
            params![nuevo_nombre, id],
        )
        .map_err(|e| format!("Error al actualizar nombre del cliente: {}", e))?;

    Ok(rows_updated)
}
