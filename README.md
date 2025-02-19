
# Tablas de la database

---

## **Artistas**

|Campo|Tipo|Clave|Descripción|
|---|---|---|---|
|`id`|Int|PK|Identificador único del artista.|
|`nombre`|String||Nombre completo del artista.|
|`pais`|String||País de origen del artista.|
|`fechaNac`|DateTime||Fecha de nacimiento del artista.|
|`biografia`|String?||Breve descripción opcional del artista.|
|`obras`|Obras[]||Relación con las obras del artista.|
|`fechaRegistro`|DateTime||Fecha de registro del artista.|
|`fechaModificacion`|DateTime||Fecha de última modificación del artista.|

---

## **Obras**

|Campo|Tipo|Clave|Descripción|
|---|---|---|---|
|`id`|Int|PK|Identificador único de la obra.|
|`titulo`|String||Título de la obra.|
|`tipo`|String||Tipo de obra (pintura, escultura, etc.).|
|`precio`|Float||Precio de venta de la obra.|
|`descripcion`|String||Descripción detallada de la obra.|
|`fechaCreacion`|DateTime||Fecha de creación de la obra.|
|`estado`|String||Estado de la obra (`disponible`, etc.).|
|`autor`|Artistas|FK (Artistas)|Relación con el autor de la obra.|
|`idAutor`|Int|FK|Identificador del autor.|
|`detalles`|DetallesVentas[]||Relación con la tabla `DetallesVentas`.|
|`fechaRegistro`|DateTime||Fecha de registro de la obra.|
|`fechaModificacion`|DateTime||Fecha de última modificación de la obra.|

---

## **Clientes**

|Campo|Tipo|Clave|Descripción|
|---|---|---|---|
|`id`|Int|PK|Identificador único del cliente.|
|`nombre`|String||Nombre completo del cliente.|
|`direccion`|String||Dirección del cliente.|
|`telefono`|String||Número de contacto del cliente.|
|`email`|String||Correo electrónico del cliente.|
|`compras`|Ventas[]||Relación con las ventas realizadas.|
|`fechaRegistro`|DateTime||Fecha de registro del cliente.|
|`fechaModificacion`|DateTime||Fecha de última modificación del cliente.|

---

## **Ventas**

|Campo|Tipo|Clave|Descripción|
|---|---|---|---|
|`id`|Int|PK|Identificador único de la venta.|
|`fecha`|DateTime||Fecha de la venta.|
|`cliente`|Clientes|FK (Clientes)|Relación con el cliente.|
|`idCliente`|Int|FK|Identificador del cliente.|
|`total`|Float||Total de la venta.|
|`detalles`|DetallesVentas[]||Relación con la tabla `DetallesVentas`.|
|`fechaRegistro`|DateTime||Fecha de registro de la venta.|
|`fechaModificacion`|DateTime||Fecha de última modificación de la venta.|

---

## **DetallesVentas**

|Campo|Tipo|Clave|Descripción|
|---|---|---|---|
|`id`|Int|PK|Identificador único del registro.|
|`venta`|Ventas|FK (Ventas)|Relación con la tabla `Ventas`.|
|`idVenta`|Int|FK|Identificador de la venta.|
|`obra`|Obras|FK (Obras)|Relación con la tabla `Obras`.|
|`idObra`|Int|FK|Identificador de la obra.|

---

## **Empleados**

|Campo|Tipo|Clave|Descripción|
|---|---|---|---|
|`id`|Int|PK|Identificador único del empleado.|
|`nombre`|String||Nombre completo del empleado.|
|`cargo`|String||Puesto del empleado.|
|`telefono`|String||Número de contacto del empleado.|
|`email`|String||Correo electrónico del empleado.|
|`fechaContratacion`|DateTime||Fecha de contratación del empleado.|
|`fechaRegistro`|DateTime||Fecha de registro del empleado.|
|`fechaModificacion`|DateTime||Fecha de última modificación del empleado.|

---
---
---
---
---

# Información autogenerada por Next.js

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
