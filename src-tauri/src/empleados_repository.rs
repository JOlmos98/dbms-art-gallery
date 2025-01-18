use rusqlite::{params, Connection, Result};
use crate::dto::Empleado;

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