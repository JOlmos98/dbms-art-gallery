"use client";

import { FormEvent } from "react";
import { useForm } from "react-hook-form";

export const InsertEmpleados = () => {

  const { register, handleSubmit } = useForm();
  const onsubmit = (data: FormEvent) => {
    console.log(data); //Lo que hace el form al pulsar el botón type="submit"
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center my-14">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <div>
          <form action="" onSubmit={onsubmit} className="flex flex-col w-200 items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="name" className="text-xl w-40 text-right">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                className="bg-gray-500 rounded-md placeholder-gray-300 px-2 py-1 m-3 w-64 text-sidebar-accent"
                {...register("nombre")}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="email" className="text-xl w-40 text-right">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-500 rounded-md placeholder-gray-300 px-2 py-1 m-3 w-64 text-sidebar-accent"
                {...register("email", {
                  required: "Email requerido",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" }
                })}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="password" className="text-xl w-40 text-right">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-500 rounded-md placeholder-gray-300 px-2 py-1 m-3 w-64 text-sidebar-accent"
                {...register("password", {
                  required: "Contraseña requerida",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" }
                })}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="confirmPassword" className="text-xl w-40 text-right">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat password"
                className="bg-gray-500 rounded-md placeholder-gray-300 px-2 py-1 m-3 w-64 text-sidebar-accent"
                {...register("confirmPassword", {
                  required: "Repetir contraseña",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" }
                })}
              />
            </div>

            <button type="submit" className="bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800 w-40 mt-4">
              Register
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

