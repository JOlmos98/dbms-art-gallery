use rusqlite::{params, Connection, Result};

/// Función para insertar datos de ejemplo en Artistas, Clientes, Empleados y Obras.
/// Se insertan solo si hay menos de 5 artistas, menos de 5 clientes, menos de 10 obras y menos de 5 empleados.
pub fn insert_example_data(conn: &Connection) -> Result<()> {
    // Verificar si ya hay suficientes registros
    let count_artistas: i32 = conn.query_row("SELECT COUNT(*) FROM Artistas", [], |row| row.get(0))?;
    let count_clientes: i32 = conn.query_row("SELECT COUNT(*) FROM Clientes", [], |row| row.get(0))?;
    let count_obras: i32 = conn.query_row("SELECT COUNT(*) FROM Obras", [], |row| row.get(0))?;
    let count_empleados: i32 = conn.query_row("SELECT COUNT(*) FROM Empleados", [], |row| row.get(0))?;

    if count_artistas > 5 || count_clientes > 5 || count_empleados > 5 || count_obras > 10 {
        println!("Los registros de ejemplo no se insertarán porque ya hay suficientes datos.");
        return Ok(());
    }

    // Insertar 10 Artistas
    let artistas = vec![
        ("Pablo Picasso", "España", "1881-10-25", "Pintor y escultor del cubismo."),
        ("Vincent van Gogh", "Países Bajos", "1853-03-30", "Pintor postimpresionista."),
        ("Leonardo da Vinci", "Italia", "1452-04-15", "Pintor, ingeniero y científico renacentista."),
        ("Claude Monet", "Francia", "1840-11-14", "Pintor impresionista."),
        ("Salvador Dalí", "España", "1904-05-11", "Pintor surrealista."),
        ("Frida Kahlo", "México", "1907-07-06", "Pintora icónica del surrealismo."),
        ("Diego Rivera", "México", "1886-12-08", "Muralista mexicano."),
        ("Jackson Pollock", "EE.UU.", "1912-01-28", "Pintor del expresionismo abstracto."),
        ("Edvard Munch", "Noruega", "1863-12-12", "Autor de 'El Grito'."),
        ("Rembrandt", "Países Bajos", "1606-07-15", "Pintor del barroco."),
    ];

    for (nombre, pais, fecha_nac, biografia) in artistas {
        conn.execute(
            "INSERT INTO Artistas (nombre, pais, fechaNac, biografia, fechaModificacion) VALUES (?1, ?2, ?3, ?4, CURRENT_TIMESTAMP)",
            params![nombre, pais, fecha_nac, biografia],
        )?;
    }

    // Insertar 10 Clientes con nombres, correos y teléfonos realistas
    let clientes = vec![
        ("Juan Jiménez", "Avenida España 12", "968374623", "juanjimenez@gmail.com"),
        ("Alberto Garín", "Calle Mayor 45", "682391234", "albertgarin@hotmail.es"),
        ("María López", "Plaza del Sol 8", "678234567", "marialopez@yahoo.com"),
        ("Carlos Fernández", "Calle Serrano 32", "689765432", "carlos.fernandez@gmail.com"),
        ("Lucía Gómez", "Avenida Libertad 21", "612345678", "luciagomez@outlook.com"),
        ("Pedro Sánchez", "Paseo del Prado 10", "645789123", "pedrosanchez@gmail.com"),
        ("Ana Martínez", "Calle San Juan 2", "657890321", "anamartinez@yahoo.com"),
        ("Javier Ortega", "Avenida del Mar 5", "634567890", "javierortega@hotmail.com"),
        ("Sofía Ruiz", "Paseo de la Castellana 3", "678901234", "sofiaruiz@gmail.com"),
        ("Roberto Díaz", "Calle Alcalá 18", "612345987", "robertodiaz@outlook.com"),
    ];

    for (nombre, direccion, telefono, email) in clientes {
        conn.execute(
            "INSERT INTO Clientes (nombre, direccion, telefono, email, fechaModificacion) VALUES (?1, ?2, ?3, ?4, CURRENT_TIMESTAMP)",
            params![nombre, direccion, telefono, email],
        )?;
    }

    // Insertar 10 Empleados con nombres, correos y teléfonos realistas
    let empleados = vec![
        ("José Martínez", "Gerente", "654987321", "jose.martinez@empresa.com"),
        ("Laura Sánchez", "Administradora", "623456789", "laura.sanchez@empresa.com"),
        ("Daniel Pérez", "Atención al cliente", "698745236", "daniel.perez@empresa.com"),
        ("Marta Gómez", "Recepcionista", "657123987", "marta.gomez@empresa.com"),
        ("Francisco Ramírez", "Coordinador de ventas", "632154987", "francisco.ramirez@empresa.com"),
        ("Raquel Torres", "Asesora de arte", "689741235", "raquel.torres@empresa.com"),
        ("Luis Hernández", "Técnico de iluminación", "677654321", "luis.hernandez@empresa.com"),
        ("Carmen Navarro", "Guía de exposiciones", "698325741", "carmen.navarro@empresa.com"),
        ("Antonio Vega", "Conservador de obras", "665874123", "antonio.vega@empresa.com"),
        ("Beatriz Domínguez", "Relaciones públicas", "678963214", "beatriz.dominguez@empresa.com"),
    ];

    for (nombre, cargo, telefono, email) in empleados {
        conn.execute(
            "INSERT INTO Empleados (nombre, cargo, telefono, email, fechaContratacion, fechaModificacion) VALUES (?1, ?2, ?3, ?4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            params![nombre, cargo, telefono, email],
        )?;
    }

    // Insertar 30 Obras con nombres reconocibles, asignadas a los primeros 5 artistas
    let obras = vec![
        ("La Mona Lisa", "Pintura", 850000000, "Retrato icónico pintado por Leonardo da Vinci.", "1503-01-01"),
        ("La Última Cena", "Pintura", 450000000, "Famosa representación de la última cena de Jesús.", "1495-01-01"),
        ("Las Meninas", "Pintura", 200000000, "Obra maestra de Diego Velázquez, pintada en 1656.", "1656-01-01"),
        ("El Grito", "Pintura", 120000000, "Expresión angustiante de la existencia humana, por Edvard Munch.", "1893-01-01"),
        ("La Noche Estrellada", "Pintura", 100000000, "Paisaje nocturno lleno de emoción, pintado por Vincent van Gogh.", "1889-01-01"),
        ("Guernica", "Pintura", 200000000, "Pintura de Picasso que denuncia los horrores de la guerra.", "1937-01-01"),
        ("El Jardín de las Delicias", "Pintura", 180000000, "Tríptico del Bosco que representa visiones del paraíso y el infierno.", "1500-01-01"),
        ("La Persistencia de la Memoria", "Pintura", 90000000, "Los relojes derretidos de Dalí que exploran el tiempo y el inconsciente.", "1931-01-01"),
        ("David", "Escultura", 150000000, "Obra maestra de Miguel Ángel, representación del héroe bíblico.", "1504-01-01"),
        ("El Pensador", "Escultura", 110000000, "Escultura de Rodin que representa la meditación y la creatividad humana.", "1880-01-01"),
        ("Venus de Milo", "Escultura", 130000000, "Escultura icónica de la antigua Grecia, representando a Afrodita.", "100-01-01"),
        ("La Piedad", "Escultura", 140000000, "Majestuosa escultura de Miguel Ángel que representa a la Virgen María y Cristo.", "1499-01-01"),
        ("Las Señoritas de Avignon", "Pintura", 160000000, "Obra cubista de Pablo Picasso.", "1907-01-01"),
        ("El Beso", "Pintura", 95000000, "Obra de Gustav Klimt que representa una escena de amor apasionado.", "1907-01-01"),
        ("Saturno devorando a su hijo", "Pintura", 65000000, "Obra impactante de Francisco de Goya sobre la mitología griega.", "1820-01-01"),
        ("El Hombre de Vitruvio", "Dibujo", 90000000, "Estudio de las proporciones del cuerpo humano, de Leonardo da Vinci.", "1490-01-01"),
        ("Retrato de Adele Bloch-Bauer I", "Pintura", 135000000, "Retrato dorado de Gustav Klimt, también llamado 'La Dama Dorada'.", "1907-01-01"),
        ("Marilyn Monroe", "Pintura", 170000000, "Retrato pop-art de Marilyn Monroe, creado por Andy Warhol.", "1962-01-01"),
        ("Los Relojes Blandos", "Pintura", 78000000, "Variación surrealista de Dalí sobre la noción del tiempo.", "1931-01-01"),
        ("El Descendimiento", "Pintura", 110000000, "Obra religiosa de Rogier van der Weyden.", "1435-01-01"),
        ("La Joven de la Perla", "Pintura", 95000000, "Retrato de una joven con un pendiente de perla, pintado por Vermeer.", "1665-01-01"),
        ("El Baño de Venus", "Pintura", 68000000, "Obra mitológica de François Boucher.", "1751-01-01"),
        ("La Primavera", "Pintura", 130000000, "Obra de Sandro Botticelli sobre la mitología clásica.", "1482-01-01"),
        ("El Rapto de las Sabinas", "Escultura", 120000000, "Obra de Giambologna representando una escena mitológica romana.", "1582-01-01"),
        ("El Gran Masturbador", "Pintura", 70000000, "Obra surrealista de Salvador Dalí.", "1929-01-01"),
        ("Dama con Armiño", "Pintura", 100000000, "Retrato renacentista de Leonardo da Vinci.", "1490-01-01"),
        ("Busto de Nefertiti", "Escultura", 125000000, "Escultura egipcia representando a la reina Nefertiti.", "1345-01-01"),
        ("Las Tres Gracias", "Escultura", 105000000, "Obra de Antonio Canova representando la mitología griega.", "1817-01-01"),
        ("El Hombre que Camina", "Escultura", 70000000, "Obra modernista de Alberto Giacometti.", "1961-01-01"),
    ];

    for (titulo, tipo, precio, descripcion, fecha_creacion) in &obras {
        let id_autor = (obras.iter().position(|&(t, _, _, _, _)| t == *titulo).unwrap() % 5) + 1; // Alterna entre los 5 primeros artistas
        conn.execute(
            "INSERT INTO Obras (titulo, tipo, precio, descripcion, fechaCreacion, estado, idAutor, fechaRegistro, fechaModificacion) 
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            params![
                titulo,
                tipo,
                precio,
                descripcion,
                fecha_creacion,
                "Disponible",
                id_autor,
            ],
        )?;
    }

    println!("Registros de ejemplo insertados correctamente.");
    Ok(())
}
