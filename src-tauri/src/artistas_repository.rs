use rusqlite::{params, Connection, Result};
use crate::dto::Artista;
use crate::dto::Obra;


/// Obtener todos los artistas (incluyendo sus obras)
pub fn get_all_artistas() -> Result<Vec<Artista>, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT id, nombre, pais, fechaNac, biografia, fechaRegistro, fechaModificacion FROM Artistas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let artistas_iter = stmt
        .query_map([], |row| {
            let id = row.get(0)?;
            let obras = get_obras_by_autor(&conn, id).ok(); // Cargar obras del artista

            Ok(Artista {
                id,
                nombre: row.get(1)?,
                pais: row.get(2)?,
                fechaNac: row.get(3)?,
                biografia: row.get(4)?,
                obras, // Relación cargada
                fechaRegistro: row.get(5)?,
                fechaModificacion: row.get(6)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut artistas = Vec::new();
    for artista in artistas_iter {
        artistas.push(artista.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(artistas)
}

/// Obtener todos los artistas por país (incluyendo sus obras)
pub fn get_all_artistas_by_pais(pais: &str) -> Result<Vec<Artista>, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, nombre, pais, fechaNac, biografia, fechaRegistro, fechaModificacion 
             FROM Artistas WHERE pais = ?1",
        )
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let artistas_iter = stmt
        .query_map([pais], |row| {
            let id = row.get(0)?;
            let obras = get_obras_by_autor(&conn, id).ok(); // Cargar obras del artista

            Ok(Artista {
                id,
                nombre: row.get(1)?,
                pais: row.get(2)?,
                fechaNac: row.get(3)?,
                biografia: row.get(4)?,
                obras, // Relación cargada
                fechaRegistro: row.get(5)?,
                fechaModificacion: row.get(6)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut artistas = Vec::new();
    for artista in artistas_iter {
        artistas.push(artista.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(artistas)
}

/// Obtener la cantidad total de artistas
pub fn get_count_artistas() -> Result<i32, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT COUNT(*) FROM Artistas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let count: i32 = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(count)
}

/// Obtener la última fecha de actualización en la tabla Artistas
pub fn get_last_update_at_artistas() -> Result<String, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT MAX(fechaModificacion) FROM Artistas")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let last_update: Option<String> = stmt
        .query_row([], |row| row.get(0))
        .map_err(|e| format!("Error al obtener la última actualización: {}", e))?;

    match last_update {
        Some(date) => Ok(date),
        None => Err("No se encontraron registros en la tabla Artistas.".to_string()),
    }
}

/// Obtener un artista por ID (incluyendo sus obras)
pub fn get_artista_by_id(id: i32) -> Result<Artista, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT id, nombre, pais, fechaNac, biografia, fechaRegistro, fechaModificacion FROM Artistas WHERE id = ?1")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let artista = stmt
        .query_row([id], |row| {
            let obras = get_obras_by_autor(&conn, id).ok(); // Cargar obras del artista

            Ok(Artista {
                id: row.get(0)?,
                nombre: row.get(1)?,
                pais: row.get(2)?,
                fechaNac: row.get(3)?,
                biografia: row.get(4)?,
                obras, // Relación cargada
                fechaRegistro: row.get(5)?,
                fechaModificacion: row.get(6)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    Ok(artista)
}


/// Insertar un nuevo artista
pub fn insert_artista(nombre: &str, pais: &str, fechaNac: &str, biografia: Option<&str>) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn.execute(
        "INSERT INTO Artistas (nombre, pais, fechaNac, biografia, fechaRegistro, fechaModificacion) 
         VALUES (?1, ?2, ?3, ?4, datetime('now'), datetime('now'))",
        params![nombre, pais, fechaNac, biografia],
    )
    .map_err(|e| format!("Error al insertar artista: {}", e))?;

    Ok(rows_inserted)
}

/// Eliminar un artista por ID
pub fn delete_artista(id: i32) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_deleted = conn
        .execute("DELETE FROM Artistas WHERE id = ?1", [id])
        .map_err(|e| format!("Error al eliminar artista: {}", e))?;

    Ok(rows_deleted)
}

/// Actualizar la información de un artista
pub fn update_artista(id: i32, nombre: &str, pais: &str, fechaNac: &str, biografia: Option<&str>) -> Result<usize, String> {
    let conn = Connection::open("./gallery.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_updated = conn.execute(
        "UPDATE Artistas
         SET nombre = ?1, pais = ?2, fechaNac = ?3, biografia = ?4, fechaModificacion = datetime('now')
         WHERE id = ?5",
        params![nombre, pais, fechaNac, biografia, id],
    )
    .map_err(|e| format!("Error al actualizar artista: {}", e))?;

    Ok(rows_updated)
}



/// Obtener todas las obras de un artista por su ID
fn get_obras_by_autor(conn: &Connection, id_autor: i32) -> Result<Vec<Obra>, String> {
    let mut stmt = conn.prepare(
        "SELECT id, titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaRegistro, fechaModificacion
         FROM Obras WHERE idAutor = ?1",
    )
    .map_err(|e| format!("Error al preparar la consulta de obras: {}", e))?;

    let obras_iter = stmt
        .query_map([id_autor], |row| {
            Ok(Obra {
                id: row.get(0)?,
                titulo: row.get(1)?,
                tipo: row.get(2)?,
                precio: row.get(3)?,
                descripcion: row.get(4)?,
                fechaCreacion: row.get(5)?,
                estado: row.get(6)?,
                idAutor: row.get(7)?,
                detalles: None, // No cargamos detalles de ventas en este punto
                fechaRegistro: row.get(8)?,
                fechaModificacion: row.get(9)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta de obras: {}", e))?;

    let mut obras = Vec::new();
    for obra in obras_iter {
        obras.push(obra.map_err(|e| format!("Error al procesar obra: {}", e))?);
    }

    Ok(obras)
}



