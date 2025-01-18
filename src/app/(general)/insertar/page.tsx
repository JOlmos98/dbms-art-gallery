import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsertArtistas, InsertClientes, InsertEmpleados, InsertObras, InsertVentas } from '@/components';

export default function InsertarPage() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Insertar</h2>

          <Tabs defaultValue="clientes">
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
