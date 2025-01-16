use serde::Serialize;

#[allow(non_snake_case)]
#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Artista {
    pub id: i32,
    pub nombre: String,
    pub pais: String,
    pub fechaNac: String,
    pub biografia: Option<String>,
    pub obras: Option<Vec<Obra>>, // Relación opcional con las obras
    pub fechaRegistro: String,
    pub fechaModificacion: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Obra {
    pub id: i32,
    pub titulo: String,
    pub tipo: String,
    pub precio: f64,
    pub descripcion: String,
    pub fechaCreacion: String,
    pub estado: String,
    pub idAutor: i32,
    pub detalles: Option<Vec<DetalleVenta>>, // Relación opcional con detalles de ventas
    pub fechaRegistro: String,
    pub fechaModificacion: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Cliente {
    pub id: i32,
    pub nombre: String,
    pub direccion: String,
    pub telefono: String,
    pub email: String,
    pub compras: Option<Vec<Venta>>, // Relación opcional con las ventas
    pub fechaRegistro: String,
    pub fechaModificacion: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Venta {
    pub id: i32,
    pub fecha: String,
    pub idCliente: i32,
    pub total: f64,
    pub detalles: Option<Vec<DetalleVenta>>, // Relación opcional con detalles de ventas
    pub fechaRegistro: String,
    pub fechaModificacion: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct DetalleVenta {
    pub id: i32,
    pub idVenta: i32,
    pub idObra: i32,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)] // Habilita la serialización para enviar como JSON
pub struct Empleado {
    pub id: i32,
    pub nombre: String,
    pub cargo: String,
    pub telefono: String,
    pub email: String,
    pub fechaContratacion: String,
    pub fechaRegistro: String,
    pub fechaModificacion: String,
}