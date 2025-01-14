"use client";

import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { clientesSchema } from "@/schemas/clientesSchema";

export const InsertClientes = () => {

  const { register, handleSubmit } = useForm();
  const onsubmit = (data: FormEvent) => {
    console.log(data); //Lo que hace el form al pulsar el botón type="submit"
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof clientesSchema>>({
    resolver: zodResolver(clientesSchema),
    defaultValues: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      confirmarEmail: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof clientesSchema>) {
    // Do something with the form values.

    console.log("ESTE ES EL EMAIL 1: ", values.email)
    console.log("esto son todos los valores en json: ", JSON.stringify(values));
    console.log("ESTOS SON LOS VVALORES EN BRUTO: ", values);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center my-2">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField control={form.control} name="nombre" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                  <Input placeholder="nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre completo del cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="direccion" render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                  <Input placeholder="dirección" {...field} />
                </FormControl>
                <FormDescription>
                  Dirección de particular o empresa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="telefono" render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                  <Input placeholder="teléfono" {...field} />
                </FormControl>
                <FormDescription>
                  Número de teléfono del cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                  <Input placeholder="email" className="w-80" {...field} />
                </FormControl>
                <FormDescription>
                  Email del cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="confirmarEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Email</FormLabel>
                <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  Repetir email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

