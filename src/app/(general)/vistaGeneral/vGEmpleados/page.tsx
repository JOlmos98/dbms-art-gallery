"use client";

import { TablaEmpleados } from "../../../../components/tabla-empleados-general/TablaEmpleados";

export default function VGEmpleadosPage() {

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
            <div className="flex flex-col row-start-2 items-start sm:items-start">
                <div>
                    <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">
                        Vista general de Empleados
                    </h2>
                    <p className="text-lg mb-5">
                        La tabla <span className="font-bold text-sidebar-accent">Artistas</span> registra datos de los creadores, como su nombre, país de origen. La tabla <span className="font-bold text-sidebar-accent">Obras</span> almacena...
                    </p>
                </div>

                <div>
                    <TablaEmpleados />
                </div>
            </div>
        </div>
    );
}

/*



<Button

onClick={async () => {
    try {
        const empleados = await getAllEmpleados();
        console.log("Lista de empleados:", empleados);
        // Aquí puedes mostrar un toast o realizar alguna acción con los datos
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        // También puedes mostrar un mensaje de error si es necesario
    }
}}
className="">
Prueba GET EMPLEADOS
</Button>         






    const [empleados, setEmpleados] = useState<Empleado[] | null>(null); // Estado para almacenar empleados
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado para errores
  
    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getAllEmpleados();
          setEmpleados(data); // Almacena los empleados obtenidos
        } catch (err) {
          console.error("Error al obtener empleados:", err);
          setError("Error al cargar los datos de empleados.");
        } finally {
          setLoading(false); // Desactiva el estado de carga
        }
      }
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Cargando datos de empleados...</div>; // Mensaje de carga
    }
  
    if (error) {
      return <div className="text-red-500">{error}</div>; // Mensaje de error
    }
  
    if (!empleados || empleados.length === 0) {
      return <div>No se encontraron empleados.</div>; // Mensaje si no hay datos
    }

*/