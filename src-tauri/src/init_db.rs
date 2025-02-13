use rusqlite::{Connection, Result};

/// Función para inicializar la base de datos si no existe
pub fn init_db() -> Result<()> {
    let conn = Connection::open("./gallery.db")?;

    // Habilitar claves foráneas
    conn.execute("PRAGMA foreign_keys = ON;", [])?;

    // Crear la tabla de Clientes
    conn.execute(
        "CREATE TABLE IF NOT EXISTS Clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            direccion TEXT NOT NULL,
            telefono TEXT NOT NULL,
            email TEXT NOT NULL,
            fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fechaModificacion DATETIME NOT NULL
        );",
        [],
    )?;

    // Crear la tabla de Ventas
    conn.execute(
        "CREATE TABLE IF NOT EXISTS Ventas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha DATETIME NOT NULL,
            idCliente INTEGER NOT NULL,
            total REAL NOT NULL,
            fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fechaModificacion DATETIME NOT NULL,
            FOREIGN KEY (idCliente) REFERENCES Clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE
        );",
        [],
    )?;

    // Crear la tabla de DetallesVentas
    conn.execute(
        "CREATE TABLE IF NOT EXISTS DetallesVentas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idVenta INTEGER NOT NULL,
            idObra INTEGER NOT NULL,
            FOREIGN KEY (idVenta) REFERENCES Ventas(id) ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (idObra) REFERENCES Obras(id) ON DELETE RESTRICT ON UPDATE CASCADE
        );",
        [],
    )?;

    // Crear la tabla de Empleados
    conn.execute(
        "CREATE TABLE IF NOT EXISTS Empleados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            cargo TEXT NOT NULL,
            telefono TEXT NOT NULL,
            email TEXT NOT NULL,
            fechaContratacion DATETIME NOT NULL,
            fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fechaModificacion DATETIME NOT NULL
        );",
        [],
    )?;

    // Crear la tabla de Artistas
    conn.execute(
        "CREATE TABLE IF NOT EXISTS Artistas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            pais TEXT NOT NULL,
            fechaNac DATETIME NOT NULL,
            biografia TEXT,
            fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fechaModificacion DATETIME NOT NULL
        );",
        [],
    )?;

    // Crear la tabla de Obras
    conn.execute(
        "CREATE TABLE IF NOT EXISTS Obras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            tipo TEXT NOT NULL,
            precio REAL NOT NULL,
            descripcion TEXT NOT NULL,
            fechaCreacion DATETIME NOT NULL,
            estado TEXT NOT NULL,
            idAutor INTEGER NOT NULL,
            fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fechaModificacion DATETIME NOT NULL,
            FOREIGN KEY (idAutor) REFERENCES Artistas(id) ON DELETE RESTRICT ON UPDATE CASCADE
        );",
        [],
    )?;

    // Insertar registros de ejemplo si la base de datos está vacía
    insert_example_data(&conn)?;

    Ok(())
}



/// Función para insertar registros de ejemplo en cada tabla
fn insert_example_data(conn: &Connection) -> Result<()> {
    // Insertar Cliente si la tabla está vacía
    conn.execute(
        "INSERT INTO Clientes (nombre, direccion, telefono, email, fechaModificacion)
         SELECT 'John Doe', 'Calle Ejemplo', '123555123', 'johndoe@example.com', CURRENT_TIMESTAMP
         WHERE (SELECT COUNT(*) FROM Clientes) = 0;",
        [],
    )?;

    // Insertar Empleado si la tabla está vacía
    conn.execute(
        "INSERT INTO Empleados (nombre, cargo, telefono, email, fechaContratacion, fechaModificacion)
         SELECT 'José Antonio', 'Empleado', '123555123', 'jose@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
         WHERE (SELECT COUNT(*) FROM Empleados) = 0;",
        [],
    )?;

    // Insertar Artista si la tabla está vacía
    conn.execute(
        "INSERT INTO Artistas (nombre, pais, fechaNac, biografia, fechaModificacion)
         SELECT 'Frida Kahlo', 'México', '1907-07-06', 'Pintora icónica del surrealismo', CURRENT_TIMESTAMP
         WHERE (SELECT COUNT(*) FROM Artistas) = 0;",
        [],
    )?;

    // Insertar Obra si la tabla está vacía
    conn.execute(
        "INSERT INTO Obras (titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaModificacion)
         SELECT 'Las dos Fridas', 'Pintura', 50000, 'Obra surrealista de Frida Kahlo', '1939-01-01', 'No disponible', id, CURRENT_TIMESTAMP
         FROM Artistas
         WHERE nombre = 'Frida Kahlo'
         AND (SELECT COUNT(*) FROM Obras) = 0
         LIMIT 1;",
        [],
    )?;

    // Insertar Venta si la tabla está vacía
    conn.execute(
        "INSERT INTO Ventas (fecha, idCliente, total, fechaModificacion)
         SELECT CURRENT_TIMESTAMP, id, 50000, CURRENT_TIMESTAMP
         FROM Clientes
         WHERE nombre = 'John Doe'
         AND (SELECT COUNT(*) FROM Ventas) = 0
         LIMIT 1;",
        [],
    )?;

    // Insertar Detalle de Venta si la tabla está vacía
    conn.execute(
        "INSERT INTO DetallesVentas (idVenta, idObra)
         SELECT Ventas.id, Obras.id
         FROM Ventas, Obras
         WHERE Ventas.total = 50000
         AND Obras.titulo = 'Las dos Fridas'
         AND (SELECT COUNT(*) FROM DetallesVentas) = 0
         LIMIT 1;",
        [],
    )?;

    Ok(())
}
