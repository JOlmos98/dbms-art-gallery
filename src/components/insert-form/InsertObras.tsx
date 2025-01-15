"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

export let isSuccessToast = false;

export const InsertObras = () => {

  const onClick1 = () => {
    isSuccessToast = true;
    toast.success("Operación realizada con éxito.", {
      description: "Obra registrada correctamente.",
    });
  }

  const onClick2 = () => {
    isSuccessToast = false;
    toast.error("Operación fallida.", {
      description: "Obra NO registrada.",
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

        </div>
      </div>
    </div>
  );
}

