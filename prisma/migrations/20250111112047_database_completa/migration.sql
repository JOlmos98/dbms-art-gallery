/*
  Warnings:

  - You are about to drop the column `autorId` on the `Obras` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `Obras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Obras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAutor` to the `Obras` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Clientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ventas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME NOT NULL,
    CONSTRAINT "Ventas_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DetallesVentas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idVenta" INTEGER NOT NULL,
    "idObra" INTEGER NOT NULL,
    CONSTRAINT "DetallesVentas_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "Ventas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DetallesVentas_idObra_fkey" FOREIGN KEY ("idObra") REFERENCES "Obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Empleados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fechaContratacion" DATETIME NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artistas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "fechaNac" DATETIME NOT NULL,
    "biografia" TEXT,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME NOT NULL
);
INSERT INTO "new_Artistas" ("biografia", "fechaModificacion", "fechaNac", "fechaRegistro", "id", "nombre", "pais") SELECT "biografia", "fechaModificacion", "fechaNac", "fechaRegistro", "id", "nombre", "pais" FROM "Artistas";
DROP TABLE "Artistas";
ALTER TABLE "new_Artistas" RENAME TO "Artistas";
CREATE TABLE "new_Obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "idAutor" INTEGER NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME NOT NULL,
    CONSTRAINT "Obras_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Artistas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Obras" ("fechaCreacion", "fechaModificacion", "fechaRegistro", "id", "precio", "tipo", "titulo") SELECT "fechaCreacion", "fechaModificacion", "fechaRegistro", "id", "precio", "tipo", "titulo" FROM "Obras";
DROP TABLE "Obras";
ALTER TABLE "new_Obras" RENAME TO "Obras";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
