"use client"

import { TablaVentas } from "@/components/tabla-ventas-general/TablaVentas";
import { useSidebar } from "@/components/ui/sidebar";

export default function VGVentasPage() {
    const { open } = useSidebar();

    return (
        <div className={`grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen ${open ? 'mx-32' : 'mx-64'}`}>
            <div className="flex flex-col row-start-2 items-start sm:items-start">
                <div>
                    <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">
                        Vista general de Ventas
                    </h2>
                    <p className="text-lg mb-5">
                        La tabla <span className="font-bold text-sidebar-accent">Ventas</span> registra las transacciones realizadas, asociando cada venta a un cliente, la fecha de compra y el total de la venta.
                    </p>
                </div>

                <div>
                    <TablaVentas />
                </div>
            </div>
        </div>
    );
}