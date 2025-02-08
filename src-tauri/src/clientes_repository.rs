use rusqlite::{params, Connection, Result};
use crate::dto::{Cliente, Venta};

/// Obtener todas las compras de un cliente
fn get_compras_by_cliente(conn: &Connection, id_cliente: i32) -> Result<Vec<Venta>, String> {
    let mut stmt = conn
        .prepare(
            "SELECT id, fecha, idCliente, total, fechaRegistro, fechaModificacion 
             FROM Ventas WHERE idCliente = ?1",
        )
        .map_err(|e| format!("Error al preparar consulta de compras: {}", e))?;

    let compras_iter = stmt
        .query_map([id_cliente], |row| {
            Ok(Venta {
                id: row.get(0)?,
                fecha: row.get(1)?,
                idCliente: row.get(2)?,
                total: row.get(3)?,
                detalles: None, // No cargamos detalles en esta consulta
                fechaRegistro: row.get(4)?,
                fechaModificacion: row.get(5)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar consulta de compras: {}", e))?;

    let mut compras = Vec::new();
    for compra in compras_iter {
        compras.push(compra.map_err(|e| format!("Error al procesar compra: {}", e))?);
    }

    Ok(compras)
}

/// Obtener todos los clientes
pub fn get_all_clientes() -> Result<Vec<Cliente>, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, direccion, telefono, email, fechaRegistro, fechaModificacion 
             FROM Clientes",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let clientes_iter = stmt
        .query_map([], |row| {
            let id = row.get(0)?;
            let compras = get_compras_by_cliente(&conn, id).ok(); // Obtener las compras del cliente

            Ok(Cliente {
                id,
                nombre: row.get(1)?,
                direccion: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                compras, // Relación cargada
                fechaRegistro: row.get(5)?,
                fechaModificacion: row.get(6)?,
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
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, direccion, telefono, email, fechaRegistro, fechaModificacion 
             FROM Clientes WHERE id = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let cliente = stmt
        .query_row([id], |row| {
            let compras = get_compras_by_cliente(&conn, id).ok(); // Obtener compras del cliente

            Ok(Cliente {
                id: row.get(0)?,
                nombre: row.get(1)?,
                direccion: row.get(2)?,
                telefono: row.get(3)?,
                email: row.get(4)?,
                compras, // Relación cargada
                fechaRegistro: row.get(5)?,
                fechaModificacion: row.get(6)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(cliente)
}

/// Insertar un nuevo cliente
pub fn insert_cliente(nombre: &str, direccion: &str, telefono: &str, email: &str) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn.execute(
        "INSERT INTO Clientes (nombre, direccion, telefono, email, fechaRegistro, fechaModificacion) 
         VALUES (?1, ?2, ?3, ?4, datetime('now'), datetime('now'))",
        params![nombre, direccion, telefono, email],
    )
    .map_err(|e| format!("Error al insertar cliente: {}", e))?;

    Ok(rows_inserted)
}

/// Obtener la cantidad total de clientes
pub fn get_count_clientes() -> Result<i32, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT COUNT(*) FROM Clientes")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let count: i32 = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(count)
}

/// Obtener la última fecha de actualización en la tabla Clientes
pub fn get_last_update_at_clientes() -> Result<String, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT MAX(fechaModificacion) FROM Clientes")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let last_update: Option<String> = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al obtener la última actualización: {}", e))?;

    match last_update {
        Some(date) => Ok(date),
        None => Err("No se encontraron registros en la tabla Clientes.".to_string()),
    }
}

/// Eliminar un cliente por ID
pub fn delete_cliente(id: i32) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM Clientes WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar cliente: {}", e))?;

    Ok(rows_deleted)
}

/// Actualizar la información de un cliente
pub fn update_cliente(id: i32, nombre: &str, direccion: &str, telefono: &str, email: &str) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_updated = conn.execute(
        "UPDATE Clientes
         SET nombre = ?1, direccion = ?2, telefono = ?3, email = ?4, fechaModificacion = datetime('now')
         WHERE id = ?5",
        params![nombre, direccion, telefono, email, id],
    )
    .map_err(|e| format!("Error al actualizar cliente: {}", e))?;

    Ok(rows_updated)
}
