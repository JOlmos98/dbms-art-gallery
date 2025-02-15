import { ExampleButton } from "@/components";

export default function HomePage() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-10 sm:mx-28">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Guía de funcionamiento</h2>
          <p className="text-lg mb-5 leading-relaxed text-sidebar-foreground">
            Esta aplicación permite gestionar la base de datos de una galería de arte, facilitando la administración de artistas, obras, clientes, ventas y empleados. A continuación, se describe la relación entre las distintas tablas del sistema:
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 text-sidebar-accent">Estructura de la Base de Datos</h3>
          <p className="text-lg leading-relaxed text-sidebar-foreground">
            La tabla <span className="font-bold text-sidebar-accent">Artistas</span> almacena información sobre los creadores de las obras, incluyendo su nombre, país de origen, fecha de nacimiento y biografía. Cada artista puede tener múltiples obras asociadas.
          </p>
          <p className="text-lg leading-relaxed text-sidebar-foreground mt-3">
            La tabla <span className="font-bold text-sidebar-accent">Obras</span> registra las piezas artísticas creadas por los artistas. Contiene datos como el título, tipo de obra (pintura, escultura, fotografía, etc), precio, descripción y estado (disponible o no). Cada obra está vinculada a un artista y puede formar parte de una venta.
          </p>
          <p className="text-lg leading-relaxed text-sidebar-foreground mt-3">
            La tabla <span className="font-bold text-sidebar-accent">Clientes</span> almacena la información de los compradores, incluyendo su nombre, dirección, teléfono y correo electrónico. Se relaciona con las ventas para registrar el historial de compras.
          </p>
          <p className="text-lg leading-relaxed text-sidebar-foreground mt-3">
            La tabla <span className="font-bold text-sidebar-accent">Ventas</span> registra las transacciones realizadas en la galería. Cada venta está asociada a un cliente y tiene un total de compra. La relación con la tabla <span className="font-bold text-sidebar-accent">DetallesVentas</span> permite gestionar qué obras fueron vendidas en cada transacción.
          </p>
          <p className="text-lg leading-relaxed text-sidebar-foreground mt-3">
            La tabla <span className="font-bold text-sidebar-accent">DetallesVentas</span> es una tabla intermedia que vincula las ventas con las obras, permitiendo registrar múltiples obras en una sola venta.
          </p>
          <p className="text-lg leading-relaxed text-sidebar-foreground mt-3">
            La tabla <span className="font-bold text-sidebar-accent">Empleados</span> gestiona los datos del personal de la galería, como su nombre, cargo, contacto y fecha de contratación.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 text-sidebar-accent">Flujo de Trabajo</h3>
          <div className="text-lg leading-relaxed text-sidebar-foreground">
            <p>- Los administradores pueden registrar nuevos artistas y sus obras.  </p>
            <p>- Los clientes pueden comprar obras disponibles en la galería.  </p>
            <p>- Se pueden gestionar las ventas y registrar la relación entre clientes y obras adquiridas.  </p>
            <p>- La información del personal de la galería se mantiene en la tabla de empleados.  </p>
          </div>

          <h3 className="text-2xl font-semibold mt-6 mb-3 text-sidebar-accent">Navegación</h3>
          <p className="text-lg leading-relaxed text-sidebar-foreground">
            Puedes acceder a las distintas secciones de la aplicación mediante el menú de navegación. La interfaz está diseñada para facilitar la gestión eficiente de la galería y su base de datos.
          </p>
          <ExampleButton />
        </div>
      </div>
    </div>
  );
}
