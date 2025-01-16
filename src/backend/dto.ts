
export interface Artista {
    id: number;
    nombre: string;
    pais: string;
    fechaNac: string;
    biografia?: string;
    obras?: Obra[]; // Un artista puede tener muchas obras
    fechaRegistro: string;
    fechaModificacion: string;
}

export interface Obra {
    id: number;
    titulo: string;
    tipo: string;
    precio: number;
    descripcion: string;
    fechaCreacion: string;
    estado: string;
    idAutor: number;
    autor?: Artista; // Una obra pertenece a un artista
    detalles?: DetalleVenta[]; // Una obra puede estar en muchas ventas
    fechaRegistro: string;
    fechaModificacion: string;
}

export interface Cliente {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    compras?: Venta[]; // Un cliente puede tener muchas ventas
    fechaRegistro: string;
    fechaModificacion: string;
}

export interface Venta {
    id: number;
    fecha: string;
    idCliente: number;
    cliente?: Cliente; // Relación con cliente
    total: number;
    detalles?: DetalleVenta[]; // Una venta puede tener muchos detalles
    fechaRegistro: string;
    fechaModificacion: string;
}

export interface DetalleVenta {
    id: number;
    idVenta: number;
    venta?: Venta; // Relación con venta
    idObra: number;
    obra?: Obra; // Relación con obra
}

export interface Empleado {
    id: number;
    nombre: string;
    cargo: string;
    telefono: string;
    email: string;
    fechaContratacion: string;
    fechaRegistro: string;
    fechaModificacion: string;
}