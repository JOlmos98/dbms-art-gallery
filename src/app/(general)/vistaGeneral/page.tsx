import Link from "next/link";

export default function VistaGeneralPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Vista General</h2>
          <p className="text-lg mb-5">
            La tabla <span className="font-bold text-sidebar-accent">Artistas</span> registra datos de los creadores, como su nombre, país de origen, fecha de nacimiento y una breve biografía, además de estar relacionada con las obras que han producido. La tabla <span className="font-bold text-sidebar-accent">Obras</span> almacena detalles sobre las piezas artísticas, como su título, tipo, precio, descripción y estado, y está vinculada a los artistas que las han creado y a las ventas en las que han sido incluidas. La tabla <span className="font-bold text-sidebar-accent">Clientes</span> contiene información de los compradores, incluyendo su nombre, dirección, teléfono y correo electrónico, junto con un historial de sus compras. Por su parte, la tabla <span className="font-bold text-sidebar-accent">Ventas</span> registra las transacciones realizadas, asociando cada venta a un cliente y un total, además de contener detalles sobre las obras vendidas a través de su relación con la tabla intermedia <span className="font-bold text-sidebar-accent">DetallesVentas</span>, que conecta directamente las ventas con las obras. Finalmente, la tabla <span className="font-bold text-sidebar-accent">Empleados</span> se utiliza para gestionar información sobre los trabajadores de la galería, como su nombre, cargo, contacto y la fecha en que fueron contratados. Todas estas tablas están diseñadas para trabajar de manera conjunta, estableciendo relaciones claras que permiten un manejo eficiente y estructurado de los datos.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">

            <Link href="/vistaGeneral/vGArtistas">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">Artistas</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: [insertar variable]</p>
                  <p>Última fecha de modificación: [insertar variable]</p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGClientes">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">Clientes</h2>
                <div className="flex flex-col items-start p-2">
                <p>Número de registros: [insertar variable]</p>
                  <p>Última fecha de modificación: [insertar variable]</p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGEmpleados">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">Empleados</h2>
                <div className="flex flex-col items-start p-2">
                <p>Número de registros: [insertar variable]</p>
                  <p>Última fecha de modificación: [insertar variable]</p>
                </div>
              </div>
            </Link>

          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Link href="/vistaGeneral/vGObras">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">Obras</h2>
                <div className="flex flex-col items-start p-2">
                <p>Número de registros: [insertar variable]</p>
                  <p>Última fecha de modificación: [insertar variable]</p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGVentas">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">Ventas</h2>
                <div className="flex flex-col items-start p-2">
                <p>Número de registros: [insertar variable]</p>
                  <p>Última fecha de modificación: [insertar variable]</p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGDetallesVentas">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">DetallesVentas</h2>
                <div className="flex flex-col items-start p-2">
                <p>Número de registros: [insertar variable]</p>
                  <p>Última fecha de modificación: [insertar variable]</p>
                </div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}