"use client"

import { useSidebar } from "@/components/ui/sidebar";
import { TablaArtistas } from '../../../../components/tabla-artistas-general/TablaArtistas';

export default function VGArtistasPage() {
    const { open } = useSidebar();

    return (
        <div className={`grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen ${open ? 'mx-32' : 'mx-64'}`}>
            <div className="flex flex-col row-start-2 items-start sm:items-start">
                <div>
                    <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">
                        Vista general de Artistas
                    </h2>
                    <p className="text-lg mb-5">
                        La tabla <span className="font-bold text-sidebar-accent">Artistas</span> registra el nombre, país, fecha de nacimiento y biografía de los artistas.
                    </p>

                </div>

                <div>
                    <TablaArtistas />
                </div>
            </div>
        </div>
    );
}