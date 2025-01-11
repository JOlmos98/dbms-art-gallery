/*
  Warnings:

  - Added the required column `autorId` to the `Obras` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "fechaCreacion" DATETIME NOT NULL,
    "autorId" INTEGER NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Obras_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Artistas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Obras" ("fechaCreacion", "fechaModificacion", "fechaRegistro", "id", "precio", "tipo", "titulo") SELECT "fechaCreacion", "fechaModificacion", "fechaRegistro", "id", "precio", "tipo", "titulo" FROM "Obras";
DROP TABLE "Obras";
ALTER TABLE "new_Obras" RENAME TO "Obras";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
