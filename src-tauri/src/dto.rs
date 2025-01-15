use serde::Serialize;

#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Cliente {
    pub id: i32,
    pub nombre: String,
    pub direccion: String,
    pub telefono: String,
    pub email: String,
    pub fechaRegistro: String,
    pub fechaModificacion: String,
}

// Puedes añadir más structs aquí según sea necesario, como `Empleado`, `Obra`, etc.
