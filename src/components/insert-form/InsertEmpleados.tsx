"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"; // Importa el toast de shadcn
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { empleadosSchema } from "@/schemas/empleadosSchema";
import { insertEmpleado } from "@/backend/invokeEmpleados";

export const InsertEmpleados = () => {

  const form = useForm<z.infer<typeof empleadosSchema>>({
    resolver: zodResolver(empleadosSchema),
    defaultValues: {
      nombre: "",
      cargo: "Empleado",
      telefono: "",
      email: "",
      confirmarEmail: "",
      fechaContratacion: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof empleadosSchema>) => {
    setLoading(true);
    try {
      await insertEmpleado(values.nombre, values.cargo, values.telefono, values.email, values.fechaContratacion);

      toast.success("Operación realizada con éxito.", {
        description: `Cliente ${values.nombre} registrado.`,
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
          <FormField control={form.control} name="nombre" render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>Nombre completo del empleado.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="cargo" render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Empleado, Encargado o Directivo" {...field} />
              </FormControl>
              <FormDescription>Cargo del empleado.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="telefono" render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Teléfono" {...field} />
              </FormControl>
              <FormDescription>Número de teléfono del empleado.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="Correo electrónico" {...field} />
              </FormControl>
              <FormDescription>Correo electrónico del empleado.</FormDescription>
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

          <FormField control={form.control} name="fechaContratacion" render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de contratación</FormLabel>
              <FormControl className="bg-gray-600 border-none text-sidebar-accent">
                <Input placeholder="YYYY-MM-DD" {...field}  />
              </FormControl>
              <FormDescription>Fecha en la que el empleado fue contratado.</FormDescription>
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

/*           <SelectDate />

"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


*/