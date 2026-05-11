-- CreateEnum
CREATE TYPE "TipoTarea" AS ENUM ('SIEMBRA', 'COSECHA', 'FUMIGACION', 'FERTILIZACION', 'RIEGO', 'MANTENIMIENTO', 'VETERINARIA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoTarea" AS ENUM ('PENDIENTE', 'EN_CURSO', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateTable
CREATE TABLE "TareaRural" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" "TipoTarea" NOT NULL,
    "estado" "EstadoTarea" NOT NULL DEFAULT 'PENDIENTE',
    "prioridad" "Prioridad" NOT NULL DEFAULT 'MEDIA',
    "fechaProgramada" TIMESTAMP(3) NOT NULL,
    "fechaCompletada" TIMESTAMP(3),
    "campoId" INTEGER,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TareaRural_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TareaRural" ADD CONSTRAINT "TareaRural_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareaRural" ADD CONSTRAINT "TareaRural_campoId_fkey" FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
