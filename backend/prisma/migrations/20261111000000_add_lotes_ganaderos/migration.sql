-- CreateEnum
CREATE TYPE "SistemaLoteGanadero" AS ENUM ('CRIA_PROPIA', 'INVERNADA_COMPRADA', 'FEEDLOT');

-- CreateEnum
CREATE TYPE "EstadoLoteGanadero" AS ENUM ('ACTIVO', 'CERRADO');

-- CreateTable
CREATE TABLE "LoteGanadero" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "sistema" "SistemaLoteGanadero" NOT NULL,
    "estado" "EstadoLoteGanadero" NOT NULL DEFAULT 'ACTIVO',
    "ubicacion" TEXT,
    "cantidadInicial" INTEGER NOT NULL,
    "cantidadActual" INTEGER NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "pesoPromedioIngresoKg" DOUBLE PRECISION,
    "pesoPromedioActualKg" DOUBLE PRECISION,
    "costoCompraTotal" DOUBLE PRECISION,
    "fechaEgreso" TIMESTAMP(3),
    "precioVentaTotal" DOUBLE PRECISION,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LoteGanadero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroLoteGanadero" (
    "id" SERIAL NOT NULL,
    "loteGanaderoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cantidadActual" INTEGER NOT NULL,
    "pesoPromedioKg" DOUBLE PRECISION,
    "alimentoKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bajas" INTEGER NOT NULL DEFAULT 0,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RegistroLoteGanadero_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN "loteGanaderoId" INTEGER;

-- CreateIndex
CREATE INDEX "LoteGanadero_organizacionId_estado_idx" ON "LoteGanadero"("organizacionId", "estado");
CREATE INDEX "LoteGanadero_usuarioId_idx" ON "LoteGanadero"("usuarioId");
CREATE INDEX "RegistroLoteGanadero_loteGanaderoId_fecha_idx" ON "RegistroLoteGanadero"("loteGanaderoId", "fecha");
CREATE INDEX "RegistroLoteGanadero_usuarioId_idx" ON "RegistroLoteGanadero"("usuarioId");
CREATE INDEX "Animal_loteGanaderoId_idx" ON "Animal"("loteGanaderoId");

-- AddForeignKey
ALTER TABLE "LoteGanadero" ADD CONSTRAINT "LoteGanadero_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LoteGanadero" ADD CONSTRAINT "LoteGanadero_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RegistroLoteGanadero" ADD CONSTRAINT "RegistroLoteGanadero_loteGanaderoId_fkey" FOREIGN KEY ("loteGanaderoId") REFERENCES "LoteGanadero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RegistroLoteGanadero" ADD CONSTRAINT "RegistroLoteGanadero_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_loteGanaderoId_fkey" FOREIGN KEY ("loteGanaderoId") REFERENCES "LoteGanadero"("id") ON DELETE SET NULL ON UPDATE CASCADE;
