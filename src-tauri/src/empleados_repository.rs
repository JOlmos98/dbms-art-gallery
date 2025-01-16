use rusqlite::{params, Connection, Result};
//use crate::dto::Empleado;
#[allow(non_snake_case)]
pub fn insertar_empleado(nombre: &str, cargo: &str, telefono: &str, email: &str, fechaContratacion: &str) -> Result<usize, String> {
    let conn = Connection::open("../prisma/gallery.db").map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let rows_inserted = conn.execute("INSERT INTO Empleados (nombre, cargo, telefono, email, fechaContratacion, fechaRegistro, fechaModificacion) VALUES (?1, ?2, ?3, ?4, ?5, datetime('now'), datetime('now'))",
            params![nombre, cargo, telefono, email, fechaContratacion],
        ).map_err(|e| format!("Error al insertar empleado: {}", e))?;

    Ok(rows_inserted)
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