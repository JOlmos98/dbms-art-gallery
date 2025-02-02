use rusqlite::{params, Connection, Result};
use crate::dto::{Venta, DetalleVenta};

/// Obtener todas las ventas
pub fn get_all_ventas() -> Result<Vec<Venta>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, fecha, idCliente, total, fechaRegistro, fechaModificacion FROM Ventas",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let ventas_iter = stmt
        .query_map([], |row| {
            Ok(Venta {
                id: row.get(0)?,
                fecha: row.get(1)?,
                idCliente: row.get(2)?,
                total: row.get(3)?,
                detalles: None, // Se pueden cargar por separado si es necesario
                fechaRegistro: row.get(4)?,
                fechaModificacion: row.get(5)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut ventas = Vec::new();
    for venta in ventas_iter {
        ventas.push(venta.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(ventas)
}

/// Obtener una venta por ID
pub fn get_venta_by_id(id: i32) -> Result<Venta, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, fecha, idCliente, total, fechaRegistro, fechaModificacion FROM Ventas WHERE id = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let venta = stmt
        .query_row([id], |row| {
            Ok(Venta {
                id: row.get(0)?,
                fecha: row.get(1)?,
                idCliente: row.get(2)?,
                total: row.get(3)?,
                detalles: None, // Se pueden cargar por separado
                fechaRegistro: row.get(4)?,
                fechaModificacion: row.get(5)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(venta)
}

/// Obtener todas las ventas de un cliente específico
pub fn get_ventas_by_cliente(id_cliente: i32) -> Result<Vec<Venta>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, fecha, idCliente, total, fechaRegistro, fechaModificacion 
             FROM Ventas WHERE idCliente = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let ventas_iter = stmt
        .query_map([id_cliente], |row| {
            Ok(Venta {
                id: row.get(0)?,
                fecha: row.get(1)?,
                idCliente: row.get(2)?,
                total: row.get(3)?,
                detalles: None, // Se pueden cargar por separado
                fechaRegistro: row.get(4)?,
                fechaModificacion: row.get(5)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut ventas = Vec::new();
    for venta in ventas_iter {
        ventas.push(venta.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(ventas)
}

/// Obtener la cantidad total de ventas
pub fn get_count_ventas() -> Result<i32, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT COUNT(*) FROM Ventas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let count: i32 = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(count)
}

/// Obtener la última fecha de actualización en la tabla Ventas
pub fn get_last_update_at_ventas() -> Result<String, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT MAX(fechaModificacion) FROM Ventas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let last_update: Option<String> = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al obtener la última actualización: {}", e))?;

    match last_update {
        Some(date) => Ok(date),
        None => Err("No se encontraron registros en la tabla Ventas.".to_string()),
    }
}

/// Insertar una nueva venta
pub fn insert_venta(id_cliente: i32, fecha: &str, total: f64) -> Result<i32, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    conn.execute(
        "INSERT INTO Ventas (fecha, idCliente, total, fechaRegistro, fechaModificacion)
         VALUES (?1, ?2, ?3, datetime('now'), datetime('now'))",
        params![fecha, id_cliente, total],
    )
    .map_err(|e| format!("Error al insertar venta: {}", e))?;

    let id_venta = conn.last_insert_rowid() as i32;
    Ok(id_venta)
}

/// Eliminar una venta por ID
pub fn delete_venta(id: i32) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM Ventas WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar venta: {}", e))?;

    Ok(rows_deleted)
}

/// Actualizar la información de una venta
pub fn update_venta(id: i32, fecha: &str, total: f64) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_updated = conn.execute(
        "UPDATE Ventas
         SET fecha = ?1, total = ?2, fechaModificacion = datetime('now')
         WHERE id = ?3",
        params![fecha, total, id],
    )
    .map_err(|e| format!("Error al actualizar venta: {}", e))?;

    Ok(rows_updated)
}
