-- CreateEnum
CREATE TYPE "EstadoActividad" AS ENUM ('PENDIENTE', 'EN_PROGRESO', 'PAUSADA', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoRecursoActividad" AS ENUM ('CAMPO', 'LOTE', 'SIEMBRA', 'ANIMAL', 'TAREA', 'MAQUINARIA', 'CAMPANIA', 'GENERAL');

-- CreateTable
CREATE TABLE "ActividadMiembro" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "usuarioOrganizacionId" INTEGER NOT NULL,
    "creadoPorId" INTEGER,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "recursoTipo" "TipoRecursoActividad" NOT NULL,
    "recursoId" INTEGER,
    "contexto" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaEstimadaFin" TIMESTAMP(3) NOT NULL,
    "fechaRealFin" TIMESTAMP(3),
    "estado" "EstadoActividad" NOT NULL DEFAULT 'PENDIENTE',
    "prioridad" "Prioridad" NOT NULL DEFAULT 'MEDIA',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActividadMiembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservacionActividad" (
    "id" SERIAL NOT NULL,
    "actividadMiembroId" INTEGER NOT NULL,
    "autorId" INTEGER,
    "contenido" TEXT NOT NULL,
    "estadoActividadAlMomento" "EstadoActividad" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservacionActividad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActividadMiembro_organizacionId_estado_idx" ON "ActividadMiembro"("organizacionId", "estado");

-- CreateIndex
CREATE INDEX "ActividadMiembro_usuarioOrganizacionId_estado_idx" ON "ActividadMiembro"("usuarioOrganizacionId", "estado");

-- CreateIndex
CREATE INDEX "ActividadMiembro_creadoPorId_idx" ON "ActividadMiembro"("creadoPorId");

-- CreateIndex
CREATE INDEX "ActividadMiembro_organizacionId_activo_idx" ON "ActividadMiembro"("organizacionId", "activo");

-- CreateIndex
CREATE INDEX "ObservacionActividad_actividadMiembroId_createdAt_idx" ON "ObservacionActividad"("actividadMiembroId", "createdAt");

-- AddForeignKey
ALTER TABLE "ActividadMiembro" ADD CONSTRAINT "ActividadMiembro_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActividadMiembro" ADD CONSTRAINT "ActividadMiembro_usuarioOrganizacionId_fkey" FOREIGN KEY ("usuarioOrganizacionId") REFERENCES "UsuarioOrganizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActividadMiembro" ADD CONSTRAINT "ActividadMiembro_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservacionActividad" ADD CONSTRAINT "ObservacionActividad_actividadMiembroId_fkey" FOREIGN KEY ("actividadMiembroId") REFERENCES "ActividadMiembro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservacionActividad" ADD CONSTRAINT "ObservacionActividad_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
