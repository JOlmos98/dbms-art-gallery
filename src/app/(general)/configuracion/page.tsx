import { Loading } from "@/components";

export default function ConfiguracionPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-28">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 mt-10 text-sidebar-accent">Configuración</h2>
          <div className="flex flex-col items-center mx-96">
          <Loading />
          </div>
        </div>
      </div>
    </div>
  );
}