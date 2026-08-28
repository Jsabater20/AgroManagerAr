-- CreateEnum
CREATE TYPE "OrigenEvidencia" AS ENUM ('ACTIVIDADES', 'GANADERIA', 'MAQUINARIAS', 'CAMPOS', 'SIEMBRAS');

-- CreateEnum
CREATE TYPE "TipoRecursoEvidencia" AS ENUM ('ACTIVIDAD', 'CAMPO', 'LOTE', 'SIEMBRA', 'ANIMAL', 'MAQUINARIA');

-- CreateEnum
CREATE TYPE "EstadoEvidencia" AS ENUM ('PENDIENTE', 'CONFIRMADA');

-- CreateTable
CREATE TABLE "Evidencia" (
    "id" TEXT NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "origen" "OrigenEvidencia" NOT NULL,
    "tipoRecurso" "TipoRecursoEvidencia" NOT NULL,
    "recursoId" INTEGER NOT NULL,
    "comentario" TEXT,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoEvidencia" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evidencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivoEvidencia" (
    "id" TEXT NOT NULL,
    "evidenciaId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tamanoBytes" INTEGER NOT NULL,
    "ancho" INTEGER,
    "alto" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchivoEvidencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArchivoEvidencia_storageKey_key" ON "ArchivoEvidencia"("storageKey");
CREATE INDEX "Evidencia_organizacionId_tipoRecurso_recursoId_fechaHora_idx" ON "Evidencia"("organizacionId", "tipoRecurso", "recursoId", "fechaHora");
CREATE INDEX "Evidencia_usuarioId_idx" ON "Evidencia"("usuarioId");
CREATE INDEX "Evidencia_estado_createdAt_idx" ON "Evidencia"("estado", "createdAt");
CREATE INDEX "ArchivoEvidencia_evidenciaId_idx" ON "ArchivoEvidencia"("evidenciaId");

-- AddForeignKey
ALTER TABLE "Evidencia" ADD CONSTRAINT "Evidencia_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Evidencia" ADD CONSTRAINT "Evidencia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ArchivoEvidencia" ADD CONSTRAINT "ArchivoEvidencia_evidenciaId_fkey" FOREIGN KEY ("evidenciaId") REFERENCES "Evidencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
