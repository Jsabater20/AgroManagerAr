-- CreateEnum
CREATE TYPE "TipoGalponAvicola" AS ENUM ('POSTURA', 'ENGORDE', 'RECRIA', 'OTRO');

-- CreateTable
CREATE TABLE "GalponAvicola" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoGalponAvicola" NOT NULL,
    "capacidad" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GalponAvicola_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroAvicolaDiario" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "galponId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "avesPresentes" INTEGER NOT NULL,
    "huevos" INTEGER NOT NULL DEFAULT 0,
    "mortandad" INTEGER NOT NULL DEFAULT 0,
    "alimentoKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pesoPromedioGr" DOUBLE PRECISION,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RegistroAvicolaDiario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalponAvicola_organizacionId_activo_idx" ON "GalponAvicola"("organizacionId", "activo");
CREATE UNIQUE INDEX "RegistroAvicolaDiario_galponId_fecha_key" ON "RegistroAvicolaDiario"("galponId", "fecha");
CREATE INDEX "RegistroAvicolaDiario_organizacionId_fecha_idx" ON "RegistroAvicolaDiario"("organizacionId", "fecha");

-- AddForeignKey
ALTER TABLE "GalponAvicola" ADD CONSTRAINT "GalponAvicola_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GalponAvicola" ADD CONSTRAINT "GalponAvicola_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RegistroAvicolaDiario" ADD CONSTRAINT "RegistroAvicolaDiario_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RegistroAvicolaDiario" ADD CONSTRAINT "RegistroAvicolaDiario_galponId_fkey" FOREIGN KEY ("galponId") REFERENCES "GalponAvicola"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RegistroAvicolaDiario" ADD CONSTRAINT "RegistroAvicolaDiario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
