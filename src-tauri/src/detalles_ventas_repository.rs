use rusqlite::{params, Connection, Result};
use crate::dto::DetalleVenta;

/// ------------------------------------------------------------------------------------------------
/// -------------------------------------- Funciones DetallesVentas ---------------------------------
/// ------------------------------------------------------------------------------------------------

/// Insertar un nuevo detalle de venta
pub fn insert_detalle_venta(idVenta: i32, idObra: i32) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn.execute(
        "INSERT INTO DetallesVentas (idVenta, idObra) VALUES (?1, ?2)",
        params![idVenta, idObra],
    )
    .map_err(|e| format!("Error al insertar detalle de venta: {}", e))?;

    Ok(rows_inserted)
}

/// Obtener todos los detalles de ventas
pub fn get_all_detalles_ventas() -> Result<Vec<DetalleVenta>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT id, idVenta, idObra FROM DetallesVentas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let detalles_iter = stmt
        .query_map([], |row| {
            Ok(DetalleVenta {
                id: row.get(0)?,
                idVenta: row.get(1)?,
                idObra: row.get(2)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut detalles = Vec::new();
    for detalle in detalles_iter {
        detalles.push(detalle.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(detalles)
}

/// Obtener todos los detalles de una venta específica
pub fn get_detalles_by_venta(idVenta: i32) -> Result<Vec<DetalleVenta>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT id, idVenta, idObra FROM DetallesVentas WHERE idVenta = ?1")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let detalles_iter = stmt
        .query_map([idVenta], |row| {
            Ok(DetalleVenta {
                id: row.get(0)?,
                idVenta: row.get(1)?,
                idObra: row.get(2)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut detalles = Vec::new();
    for detalle in detalles_iter {
        detalles.push(detalle.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(detalles)
}

/// Obtener todos los detalles de una obra específica
pub fn get_detalles_by_obra(idObra: i32) -> Result<Vec<DetalleVenta>, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT id, idVenta, idObra FROM DetallesVentas WHERE idObra = ?1")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let detalles_iter = stmt
        .query_map([idObra], |row| {
            Ok(DetalleVenta {
                id: row.get(0)?,
                idVenta: row.get(1)?,
                idObra: row.get(2)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut detalles = Vec::new();
    for detalle in detalles_iter {
        detalles.push(detalle.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(detalles)
}

/// Obtener la cantidad total de detalles de ventas
pub fn get_count_detalles_ventas() -> Result<i32, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT COUNT(*) FROM DetallesVentas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let count: i32 = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(count)
}

/// Eliminar un detalle de venta por ID
pub fn delete_detalle_venta(id: i32) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM DetallesVentas WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar el detalle de venta: {}", e))?;

    Ok(rows_deleted)
}
