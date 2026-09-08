-- CreateEnum
CREATE TYPE "SistemaFrutihorticola" AS ENUM ('CAMPO_ABIERTO', 'INVERNADERO', 'HUERTA', 'MONTE_FRUTAL', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoCultivoFrutihorticola" AS ENUM ('PLANIFICADO', 'EN_CURSO', 'FINALIZADO', 'PERDIDO');

-- CreateTable
CREATE TABLE "CultivoFrutihorticola" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "campoId" INTEGER NOT NULL,
    "loteId" INTEGER,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "variedad" TEXT,
    "sistema" "SistemaFrutihorticola" NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaEstimadaCosecha" TIMESTAMP(3),
    "estado" "EstadoCultivoFrutihorticola" NOT NULL DEFAULT 'EN_CURSO',
    "superficieM2" DOUBLE PRECISION,
    "cantidadPlantas" INTEGER,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CultivoFrutihorticola_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CosechaFrutihorticola" (
    "id" SERIAL NOT NULL,
    "cultivoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fechaCosecha" TIMESTAMP(3) NOT NULL,
    "kgPrimera" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "kgSegunda" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "kgDescarte" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "destino" TEXT,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CosechaFrutihorticola_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CultivoFrutihorticola_organizacionId_estado_idx" ON "CultivoFrutihorticola"("organizacionId", "estado");
CREATE INDEX "CultivoFrutihorticola_campoId_idx" ON "CultivoFrutihorticola"("campoId");
CREATE INDEX "CultivoFrutihorticola_loteId_idx" ON "CultivoFrutihorticola"("loteId");
CREATE INDEX "CosechaFrutihorticola_cultivoId_fechaCosecha_idx" ON "CosechaFrutihorticola"("cultivoId", "fechaCosecha");

-- AddForeignKey
ALTER TABLE "CultivoFrutihorticola" ADD CONSTRAINT "CultivoFrutihorticola_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CultivoFrutihorticola" ADD CONSTRAINT "CultivoFrutihorticola_campoId_fkey" FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CultivoFrutihorticola" ADD CONSTRAINT "CultivoFrutihorticola_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CultivoFrutihorticola" ADD CONSTRAINT "CultivoFrutihorticola_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CosechaFrutihorticola" ADD CONSTRAINT "CosechaFrutihorticola_cultivoId_fkey" FOREIGN KEY ("cultivoId") REFERENCES "CultivoFrutihorticola"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CosechaFrutihorticola" ADD CONSTRAINT "CosechaFrutihorticola_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
