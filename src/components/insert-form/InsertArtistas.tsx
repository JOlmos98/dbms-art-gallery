"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { artistasSchema } from "@/schemas/artistasSchema";
import { insertArtista } from "@/backend/invokeArtistas";

export const InsertArtistas = () => {

  const form = useForm<z.infer<typeof artistasSchema>>({
    resolver: zodResolver(artistasSchema),
    defaultValues: {
      nombre: "",
      pais: "",
      fechaNac: "",
      biografia: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof artistasSchema>) => {
    setLoading(true);
    try {
      await insertArtista(values.nombre, values.pais, values.fechaNac, values.biografia);

      toast.success("Operación realizada con éxito.", {
        description: `Artista ${values.nombre} registrado.`,
        action: {
          label: "Ocultar",
          onClick: () => console.log("Ocultar"),
        },
        className: "group-[.toaster]:text-green-500",
      });

      form.reset();
    } catch (error) {
      toast.error("Error al realizar operación.", {
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
          
          {/* Nombre del Artista */}
          <FormField control={form.control} name="nombre" render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Nombre del artista" {...field} />
              </FormControl>
              <FormDescription>Introduce el nombre completo del artista.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {/* País del Artista */}
          <FormField control={form.control} name="pais" render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="País de origen" {...field} />
              </FormControl>
              <FormDescription>País de origen del artista.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {/* Fecha de Nacimiento */}
          <FormField control={form.control} name="fechaNac" render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormDescription>Introduce la fecha de nacimiento en formato YYYY-MM-DD.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {/* Biografía */}
          <FormField control={form.control} name="biografia" render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Escribe una breve biografía (opcional)" {...field} />
              </FormControl>
              <FormDescription>Máximo 500 caracteres.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {/* Botón de Envío */}
          <Button type="submit" disabled={loading} className="w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            {loading ? "Registrando..." : "Registrar Artista"}
          </Button>

        </form>
      </Form>
    </div>
  );
};
