use rusqlite::{params, Connection, Result};
use crate::dto::Obra;

/// Obtener todas las obras
pub fn get_all_obras() -> Result<Vec<Obra>, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaRegistro, fechaModificacion 
             FROM Obras",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let obras_iter = stmt
        .query_map([], |row| {
            Ok(Obra {
                id: row.get(0)?,
                titulo: row.get(1)?,
                tipo: row.get(2)?,
                precio: row.get(3)?,
                descripcion: row.get(4)?,
                fechaCreacion: row.get(5)?,
                estado: row.get(6)?,
                idAutor: row.get(7)?,
                detalles: None, // Se pueden cargar aparte
                fechaRegistro: row.get(8)?,
                fechaModificacion: row.get(9)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut obras = Vec::new();
    for obra in obras_iter {
        obras.push(obra.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(obras)
}

/// Obtener todas las obras por tipo
pub fn get_all_obras_by_tipo(tipo: &str) -> Result<Vec<Obra>, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaRegistro, fechaModificacion 
             FROM Obras WHERE tipo = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let obras_iter = stmt
        .query_map([tipo], |row| {
            Ok(Obra {
                id: row.get(0)?,
                titulo: row.get(1)?,
                tipo: row.get(2)?,
                precio: row.get(3)?,
                descripcion: row.get(4)?,
                fechaCreacion: row.get(5)?,
                estado: row.get(6)?,
                idAutor: row.get(7)?,
                detalles: None,
                fechaRegistro: row.get(8)?,
                fechaModificacion: row.get(9)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut obras = Vec::new();
    for obra in obras_iter {
        obras.push(obra.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(obras)
}

/// Obtener la cantidad total de obras
pub fn get_count_obras() -> Result<i32, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT COUNT(*) FROM Obras")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let count: i32 = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(count)
}

/// Obtener la última fecha de actualización en la tabla Obras
pub fn get_last_update_at_obras() -> Result<String, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT MAX(fechaModificacion) FROM Obras")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let last_update: Option<String> = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al obtener la última actualización: {}", e))?;

    match last_update {
        Some(date) => Ok(date),
        None => Err("No se encontraron registros en la tabla Obras.".to_string()),
    }
}

/// Obtener una obra por ID
pub fn get_obra_by_id(id: i32) -> Result<Obra, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaRegistro, fechaModificacion 
             FROM Obras WHERE id = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let obra = stmt
        .query_row([id], |row| {
            Ok(Obra {
                id: row.get(0)?,
                titulo: row.get(1)?,
                tipo: row.get(2)?,
                precio: row.get(3)?,
                descripcion: row.get(4)?,
                fechaCreacion: row.get(5)?,
                estado: row.get(6)?,
                idAutor: row.get(7)?,
                detalles: None,
                fechaRegistro: row.get(8)?,
                fechaModificacion: row.get(9)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(obra)
}

/// Insertar una nueva obra
#[allow(non_snake_case)]
pub fn insert_obra(titulo: &str, tipo: &str, precio: f64, descripcion: &str, fechaCreacion: &str, estado: &str, idAutor: i32) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn.execute(
        "INSERT INTO Obras (titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaRegistro, fechaModificacion) 
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, datetime('now'), datetime('now'))",
        params![titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor],
    )
    .map_err(|e| format!("Error al insertar obra: {}", e))?;

    Ok(rows_inserted)
}

/// Eliminar una obra por ID
pub fn delete_obra(id: i32) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM Obras WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar obra: {}", e))?;

    Ok(rows_deleted)
}

/// Actualizar la información de una obra
#[allow(non_snake_case)]
pub fn update_obra(id: i32, titulo: &str, tipo: &str, precio: f64, descripcion: &str, fechaCreacion: &str, estado: &str) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_updated = conn.execute(
        "UPDATE Obras
         SET titulo = ?1, tipo = ?2, precio = ?3, descripcion = ?4, fechaCreacion = ?5, estado = ?6, fechaModificacion = datetime('now')
         WHERE id = ?7",
        params![titulo, tipo, precio, descripcion, fechaCreacion, estado, id],
    )
    .map_err(|e| format!("Error al actualizar obra: {}", e))?;

    Ok(rows_updated)
}
