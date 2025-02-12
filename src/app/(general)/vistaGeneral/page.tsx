"use client"

import { getCountArtistas, getLastUpdateAtArtistas } from "@/backend/invokeArtistas";
import { getCountClientes, getLastUpdateAtClientes } from "@/backend/invokeClientes";
import { getCountEmpleados, getLastUpdateAtEmpleados } from "@/backend/invokeEmpleados";
import { getCountObras, getLastUpdateAtObras } from "@/backend/invokeObras";
import { getCountVentas, getLastUpdateAtVentas } from "@/backend/invokeVentas";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VistaGeneralPage() {


  const [numEmpleados, setNumEmpleados] = useState<number | null>(null);
  const [ultimaFechaEmpleados, setUltimaFechaEmpleados] = useState<string | null>(null);
  const [numClientes, setNumClientes] = useState<number | null>(null);
  const [ultimaFechaClientes, setUltimaFechaClientes] = useState<string | null>(null);
  const [numArtistas, setNumArtistas] = useState<number | null>(null);
  const [ultimaFechaArtistas, setUltimaFechaArtistas] = useState<string | null>(null);
  const [numObras, setNumObras] = useState<number | null>(null);
  const [ultimaFechaObras, setUltimaFechaObras] = useState<string | null>(null);
  const [numVentas, setNumVentas] = useState<number | null>(null);
  const [ultimaFechaVentas, setUltimaFechaVentas] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const countEmpleados = await getCountEmpleados();
        const lastUpdateEmpleados = await getLastUpdateAtEmpleados();
        setNumEmpleados(countEmpleados);
        setUltimaFechaEmpleados(lastUpdateEmpleados);
  
        const countClientes = await getCountClientes();
        const lastUpdateClientes = await getLastUpdateAtClientes();
        setNumClientes(countClientes);
        setUltimaFechaClientes(lastUpdateClientes);
  
        const countArtistas = await getCountArtistas();
        const lastUpdateArtistas = await getLastUpdateAtArtistas();
        setNumArtistas(countArtistas);
        setUltimaFechaArtistas(lastUpdateArtistas);
  
        const countObras = await getCountObras();
        const lastUpdateObras = await getLastUpdateAtObras();
        setNumObras(countObras);
        setUltimaFechaObras(lastUpdateObras);
  
        const countVentas = await getCountVentas();
        const lastUpdateVentas = await getLastUpdateAtVentas();
        setNumVentas(countVentas);
        setUltimaFechaVentas(lastUpdateVentas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Vista General</h2>
          <p className="text-lg mb-5">
            La tabla <span className="font-bold text-sidebar-accent">Artistas</span> registra datos de los creadores, como su nombre, país de origen, fecha de nacimiento y una breve biografía, además de estar relacionada con las obras que han producido. La tabla <span className="font-bold text-sidebar-accent">Obras</span> almacena detalles sobre las piezas artísticas, como su título, tipo, precio, descripción y estado, y está vinculada a los artistas que las han creado y a las ventas en las que han sido incluidas. La tabla <span className="font-bold text-sidebar-accent">Clientes</span> contiene información de los compradores, incluyendo su nombre, dirección, teléfono y correo electrónico, junto con un historial de sus compras. Por su parte, la tabla <span className="font-bold text-sidebar-accent">Ventas</span> registra las transacciones realizadas, asociando cada venta a un cliente y un total, además de contener detalles sobre las obras vendidas a través de su relación con la tabla intermedia <span className="font-bold text-sidebar-accent">DetallesVentas</span>, que conecta directamente las ventas con las obras. Finalmente, la tabla <span className="font-bold text-sidebar-accent">Empleados</span> se utiliza para gestionar información sobre los trabajadores de la galería, como su nombre, cargo, contacto y la fecha en que fueron contratados.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">

            <Link href="/vistaGeneral/vGArtistas">
            <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
                <h2 className="font-bold justify-start text-2xl">Artistas</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {numArtistas !== null ? numArtistas : "Cargando..."}
                    </span>
                  </p>
                  <p>
                    Última fecha de modificación: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                      {ultimaFechaArtistas ?? "Cargando..."}
                    </span>
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGClientes">
            <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
                <h2 className="font-bold justify-start text-2xl">Clientes</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {numClientes !== null ? numClientes : "Cargando..."}
                    </span>
                  </p>
                  <p>
                    Última fecha de modificación: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                      {ultimaFechaClientes ?? "Cargando..."}
                    </span>
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGEmpleados">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
                <h2 className="font-bold justify-start text-2xl">Empleados</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {numEmpleados !== null ? numEmpleados : "Cargando..."}
                  </span>
                  </p>
                  <p>Última fecha de modificación: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {ultimaFechaEmpleados ?? "Cargando..."}
                  </span>
                  </p>
                </div>
              </div>
            </Link>

          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Link href="/vistaGeneral/vGObras">
            <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
                <h2 className="font-bold justify-start text-2xl">Obras</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {numObras !== null ? numObras : "Cargando..."}
                    </span>
                  </p>
                  <p>
                    Última fecha de modificación: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                      {ultimaFechaObras ?? "Cargando..."}
                    </span>
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGVentas">
            <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
                <h2 className="font-bold justify-start text-2xl">Ventas</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {numVentas !== null ? numVentas : "Cargando..."}
                    </span>
                  </p>
                  <p>
                    Última fecha de modificación: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                      {ultimaFechaVentas ?? "Cargando..."}
                    </span>
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/vistaGeneral/vGDetallesVentas">
            <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
                <h2 className="font-bold justify-start text-2xl">DetallesVentas</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                    {numVentas !== null ? numVentas : "Cargando..."}
                    </span>
                  </p>
                  <p>
                    Última fecha de modificación: <span className="font-bold text-sidebar-accent group-hover:text-sidebar-accent-foreground">
                      {ultimaFechaVentas ?? "Cargando..."}
                    </span>
                  </p>
                </div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}


/*

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCountEmpleados, getLastUpdateAtEmpleados } from "@/invoke"; // Importa las funciones necesarias

export default function VistaGeneralPage() {
  const [numEmpleados, setNumEmpleados] = useState<number | null>(null);
  const [ultimaFechaEmpleados, setUltimaFechaEmpleados] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const count = await getCountEmpleados();
        const lastUpdate = await getLastUpdateAtEmpleados();
        setNumEmpleados(count);
        setUltimaFechaEmpleados(lastUpdate);
      } catch (error) {
        console.error("Error al obtener datos de empleados:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Vista General</h2>
          <p className="text-lg mb-5">
            La tabla <span className="font-bold text-sidebar-accent">Empleados</span> se utiliza para gestionar información sobre los trabajadores de la galería, como su nombre, cargo, contacto y la fecha en que fueron contratados.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <Link href="/vistaGeneral/vGEmpleados">
              <div className="bg-sidebar-primary p-4 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <h2 className="font-bold justify-start text-2xl">Empleados</h2>
                <div className="flex flex-col items-start p-2">
                  <p>Número de registros: {numEmpleados !== null ? numEmpleados : "Cargando..."}</p>
                  <p>Última fecha de modificación: {ultimaFechaEmpleados ?? "Cargando..."}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


*/