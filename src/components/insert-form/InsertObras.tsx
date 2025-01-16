"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

export const InsertObras = () => {

  const onClick1 = () => {
    toast.success("Operación realizada con éxito.", {
      description: "Obra registrada correctamente.",
      className: "group-[.toaster]:text-green-500",
    });
  }

  const onClick2 = () => {
    toast.error("Operación fallida.", {
      description: "Obra NO registrada.",
      className: "group-[.toaster]:text-red-500",
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-36">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <h1 className="text-4xl font-bold mb-8 mt-8"></h1>
        <div>
          <h2 className="text-2xl font-bold mb-8"></h2>
          <Button onClick={onClick1} className="text-green-700">Toast test SUCCESS</Button>
          <div className="m-4"></div>
          <Button onClick={onClick2} className="text-red-700">Toast test ERROR</Button>
          <Button
            onClick={() =>
              toast("Evento creado", {
                description: "Domingo, 3 de diciembre de 2023 a las 9:00 AM",
                action: {
                  label: "Deshacer",
                  onClick: () => console.log("Deshacer"),
                },
                className: "text-red-500 p-14 group-[.toaster]:text-green-500", // Cambia el color del texto a rojo
              })
            }
          >TEST GREEN</Button>
        </div>
      </div>
    </div>
  );
}

