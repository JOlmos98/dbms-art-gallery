"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ventasSchema } from "@/schemas/ventasSchema";
import { insertVenta } from "@/backend/invokeVentas";
import { comprobarEstadoObra, setObraNoDisponible } from "@/backend/invokeObras"; // Para cambiar el estado de las obras
import { insertDetalleVenta } from "@/backend/invokeDetallesVentas"; // Para registrar detalles de venta

export const InsertVentas = () => {
  const form = useForm<z.infer<typeof ventasSchema>>({
    resolver: zodResolver(ventasSchema),
    defaultValues: {
      idCliente: "",
      fecha: "",
      total: "0",
      obrasVendidas: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof ventasSchema>) => {
    setLoading(true);
    const idCliente: number = parseInt(values.idCliente);
    const total: number = parseInt(values.total);
    const obrasVendidas: number[] = values.obrasVendidas.map((id) => parseInt(id));

    try {
      let disponibles = true;

      for (const idObra of obrasVendidas) {
        const estadoDisponible = await comprobarEstadoObra(idObra);
        if (!estadoDisponible) {
          disponibles = false;
          break;
        }
      }

      if (!disponibles) {
        toast.error("Error al registrar la venta.", {
          description: "Una o más obras ya están vendidas.",
          className: "group-[.toaster]:text-red-500",
        });
        setLoading(false);
        return;
      }

      // Insertar la venta en la base de datos
      const idVenta = await insertVenta(idCliente, values.fecha, total);

      // Insertar detalles de venta y actualizar estado de obras
      for (const idObra of obrasVendidas) {
        await insertDetalleVenta(idVenta, idObra); // Asociar obra con la venta
        await setObraNoDisponible(idObra); // Cambiar estado a "No disponible"
      }

      toast.success("Venta registrada con éxito.", {
        description: `Venta #${idVenta} creada con ${obrasVendidas.length} obra(s).`,
        action: {
          label: "Ocultar",
          onClick: () => console.log("Ocultar"),
        },
        className: "group-[.toaster]:text-green-500",
      });

      form.reset();
    } catch (error) {
      toast.error("Error al registrar la venta.", {
        description: "Revisa los datos ingresados o intenta nuevamente.",
        className: "group-[.toaster]:text-red-500",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

          {/* ID del Cliente */}
          <FormField control={form.control} name="idCliente" render={({ field }) => (
            <FormItem>
              <FormLabel>ID del Cliente</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input type="number" placeholder="ID del cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Fecha de la Venta */}
          <FormField control={form.control} name="fecha" render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de la Venta</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Total de la Venta */}
          <FormField control={form.control} name="total" render={({ field }) => (
            <FormItem>
              <FormLabel>Total de la Venta</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input type="number" placeholder="Total en USD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Obras Vendidas */}
          <FormField control={form.control} name="obrasVendidas" render={({ field }) => (
            <FormItem>
              <FormLabel>IDs de Obras Vendidas</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input
                  placeholder="IDs de obras separados por comas (ej: 1,2,3)"
                  onChange={(e) => {
                    const obrasArray = e.target.value
                      .split(",")
                      .map((id) => id.trim())
                      .filter((id) => id !== "");
                    field.onChange(obrasArray);
                  }}
                />
              </FormControl>
              <FormDescription>
                Introduce los IDs de las obras vendidas separados por comas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {/* Botón de Envío */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registrando..." : "Registrar Venta"}
          </Button>

        </form>
      </Form>
    </div>
  );
};
