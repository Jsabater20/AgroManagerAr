-- CreateEnum
CREATE TYPE "TurnoOrdene" AS ENUM ('MANANA', 'TARDE', 'UNICO');

-- CreateTable
CREATE TABLE "RegistroOrdene" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "animalId" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL,
    "turno" "TurnoOrdene" NOT NULL,
    "litros" DOUBLE PRECISION NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RegistroOrdene_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RegistroOrdene_organizacionId_fecha_idx" ON "RegistroOrdene"("organizacionId", "fecha");
CREATE INDEX "RegistroOrdene_animalId_fecha_idx" ON "RegistroOrdene"("animalId", "fecha");

-- AddForeignKey
ALTER TABLE "RegistroOrdene" ADD CONSTRAINT "RegistroOrdene_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RegistroOrdene" ADD CONSTRAINT "RegistroOrdene_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RegistroOrdene" ADD CONSTRAINT "RegistroOrdene_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
