import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsertArtistas, InsertClientes, InsertEmpleados, InsertObras } from '@/components';
import { InsertVentas } from '../../../components/insert-form/InsertVentas';

export default function InsertarPage() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-36">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <h1 className="text-4xl font-bold mb-8 mt-8"></h1>
        <div className='flex flex-col gap-4'>
          <h2 className="text-4xl font-bold mb-8 text-sidebar-accent">Insertar</h2>

            <Tabs defaultValue="account" >
              <TabsList className=''>
                <TabsTrigger value="artistas">Artistas</TabsTrigger>
                <TabsTrigger value="obras">Obras</TabsTrigger>
                <TabsTrigger value="clientes">Clientes</TabsTrigger>
                <TabsTrigger value="ventas">Ventas</TabsTrigger>
                <TabsTrigger value="empleados">Empleados</TabsTrigger>
              </TabsList>
              <TabsContent value="artistas"> <InsertArtistas /> </TabsContent>
              <TabsContent value="obras"> <InsertObras /> </TabsContent>
              <TabsContent value="clientes"> <InsertClientes /> </TabsContent>
              <TabsContent value="ventas"> <InsertVentas /> </TabsContent>
              <TabsContent value="empleados"> <InsertEmpleados /> </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}

/*
          <Link href="/insertar/artistas" className='bg-sidebar py-4 px-12 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-2xl'>Artistas</Link>
          <Link href="/insertar/obras" className='bg-sidebar py-4 px-12 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-2xl'>Obras</Link>
          <Link href="/insertar/clientes" className='bg-sidebar py-4 px-12 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-2xl'>Clientes</Link>
          <Link href="/insertar/ventas" className='bg-sidebar py-4 px-12 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-2xl'>Ventas</Link>
          <Link href="/insertar/empleados" className='bg-sidebar py-4 px-12 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-2xl'>Empleados</Link>
*/