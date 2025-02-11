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
    // Insertar un Cliente de ejemplo
    conn.execute(
        "INSERT INTO Clientes (nombre, direccion, telefono, email, fechaModificacion) 
         SELECT 'Juan Pérez', 'Calle 123', '555-1234', 'juan@example.com', CURRENT_TIMESTAMP
         WHERE NOT EXISTS (SELECT 1 FROM Clientes LIMIT 1);",
        [],
    )?;

    // Insertar un Empleado de ejemplo
    conn.execute(
        "INSERT INTO Empleados (nombre, cargo, telefono, email, fechaContratacion, fechaModificacion) 
         SELECT 'Carlos López', 'Vendedor', '555-5678', 'carlos@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
         WHERE NOT EXISTS (SELECT 1 FROM Empleados LIMIT 1);",
        [],
    )?;

    // Insertar un Artista de ejemplo
    conn.execute(
        "INSERT INTO Artistas (nombre, pais, fechaNac, biografia, fechaModificacion) 
         SELECT 'Frida Kahlo', 'México', '1907-07-06', 'Pintora icónica del surrealismo', CURRENT_TIMESTAMP
         WHERE NOT EXISTS (SELECT 1 FROM Artistas LIMIT 1);",
        [],
    )?;

    // Insertar una Obra de ejemplo
    conn.execute(
        "INSERT INTO Obras (titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaModificacion) 
         SELECT 'Las dos Fridas', 'Pintura', 50000, 'Obra surrealista de Frida Kahlo', '1939-01-01', 'Disponible', id, CURRENT_TIMESTAMP 
         FROM Artistas WHERE nombre = 'Frida Kahlo' LIMIT 1;",
        [],
    )?;

    // Insertar una Venta de ejemplo
    conn.execute(
        "INSERT INTO Ventas (fecha, idCliente, total, fechaModificacion) 
         SELECT CURRENT_TIMESTAMP, id, 50000, CURRENT_TIMESTAMP 
         FROM Clientes WHERE nombre = 'Juan Pérez' LIMIT 1;",
        [],
    )?;

    // Insertar un Detalle de Venta de ejemplo
    conn.execute(
        "INSERT INTO DetallesVentas (idVenta, idObra) 
         SELECT Ventas.id, Obras.id 
         FROM Ventas, Obras 
         WHERE Ventas.total = 50000 AND Obras.titulo = 'Las dos Fridas' LIMIT 1;",
        [],
    )?;

    Ok(())
}
