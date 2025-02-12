"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { obrasSchema } from "@/schemas/obrasSchema";
import { insertObra } from "@/backend/invokeObras";

export const InsertObras = () => {
  const form = useForm<z.infer<typeof obrasSchema>>({
    resolver: zodResolver(obrasSchema),
    defaultValues: {
      titulo: "",
      tipo: "",
      precio: "0",
      descripcion: "",
      fechaCreacion: "",
      estado: "Disponible",
      idAutor: "1",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof obrasSchema>) => {
    setLoading(true);
    const precio: number = parseInt(values.precio);
    const idAutor: number = parseInt(values.idAutor);
    try {
      await insertObra(
        values.titulo,
        values.tipo,
        precio,
        values.descripcion || "",
        values.fechaCreacion,
        values.estado,
        idAutor
      );

      toast.success("Obra registrada con éxito.", {
        description: `Obra '${values.titulo}' registrada correctamente.`,
        action: {
          label: "Ocultar",
          onClick: () => console.log("Ocultar"),
        },
        className: "group-[.toaster]:text-green-500",
      });

      form.reset();
    } catch (error) {
      toast.error("Error al registrar la obra.", {
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

          {/* Título de la Obra */}
          <FormField control={form.control} name="titulo" render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Título de la obra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Tipo de Obra */}
          <FormField control={form.control} name="tipo" render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Ejemplo: Pintura, Escultura..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Precio de la Obra */}
          <FormField control={form.control} name="precio" render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input type="number" placeholder="Precio en USD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Fecha de Creación */}
          <FormField control={form.control} name="fechaCreacion" render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Creación</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Estado de la Obra */}
          <FormField control={form.control} name="estado" render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-gray-600 border-none text-sidebar-accent">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>

                <SelectContent className="bg-gray-600 border-none text-sidebar-accent">
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="No disponible">No disponible</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          {/* ID del Autor */}
          <FormField control={form.control} name="idAutor" render={({ field }) => (
            <FormItem>
              <FormLabel>ID del Autor</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input type="number" placeholder="ID del autor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Descripción de la Obra */}
          <FormField control={form.control} name="descripcion" render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Describe la obra (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Botón de Envío */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registrando..." : "Registrar Obra"}
          </Button>

        </form>
      </Form>
    </div>
  );
};
