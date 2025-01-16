"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"; // Importa el toast de shadcn
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clientesSchema } from "@/schemas/clientesSchema";
import { insertarCliente } from "@/backend/invokeClientes";

export const InsertClientes = () => {

  const form = useForm<z.infer<typeof clientesSchema>>({
    resolver: zodResolver(clientesSchema),
    defaultValues: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      confirmarEmail: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof clientesSchema>) => {
    setLoading(true);
    try {
      await insertarCliente(values.nombre, values.direccion, values.telefono, values.email);

      toast.success("Operación realizada con éxito.", {
        description: `Cliente ${values.nombre} registrado.`,
        action: {
          label: "Deshacer",
          onClick: () => console.log("Deshacer"),
        },
        className: "group-[.toaster]:text-green-500",
      });

      form.reset(); //! Reinicia el formulario después de un registro exitoso
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
    <div className="p-6 max-w-lg mx-auto rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="nombre" render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>Nombre completo del cliente.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="direccion" render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Dirección" {...field} />
              </FormControl>
              <FormDescription>Dirección del cliente.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="telefono" render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Teléfono" {...field} />
              </FormControl>
              <FormDescription>Número de teléfono del cliente.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Correo electrónico" {...field} />
              </FormControl>
              <FormDescription>Correo electrónico del cliente.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="confirmarEmail" render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Email</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Confirmar correo electrónico" {...field} />
              </FormControl>
              <FormDescription>Repetir correo electrónico.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" disabled={loading} className="w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            {loading ? "Registrando..." : "Registrar Cliente"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
