use serde::Serialize;

#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Cliente {
    pub id: i32,
    pub nombre: String,
    pub direccion: String,
    pub telefono: String,
    pub email: String,
    pub fecha_registro: String,
    pub fecha_modificacion: String,
}

// Puedes añadir más structs aquí según sea necesario, como `Empleado`, `Obra`, etc.
