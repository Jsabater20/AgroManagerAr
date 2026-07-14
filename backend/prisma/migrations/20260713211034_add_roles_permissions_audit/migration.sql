-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RolOrganizacion" ADD VALUE 'ASESOR';
ALTER TYPE "RolOrganizacion" ADD VALUE 'CONTRATISTA';

-- CreateTable
CREATE TABLE "RolPersonalizado" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolPersonalizado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsignacionPermiso" (
    "id" SERIAL NOT NULL,
    "usuarioOrganizacionId" INTEGER NOT NULL,
    "rolPersonalizadoId" INTEGER NOT NULL,
    "recursoTipo" TEXT,
    "recursoId" INTEGER,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AsignacionPermiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditoriaLog" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "organizacionId" INTEGER,
    "accion" TEXT NOT NULL,
    "entidad" TEXT,
    "entidadId" INTEGER,
    "cambios" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditoriaLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RolPersonalizado_organizacionId_idx" ON "RolPersonalizado"("organizacionId");

-- CreateIndex
CREATE UNIQUE INDEX "RolPersonalizado_organizacionId_nombre_key" ON "RolPersonalizado"("organizacionId", "nombre");

-- CreateIndex
CREATE INDEX "AsignacionPermiso_usuarioOrganizacionId_idx" ON "AsignacionPermiso"("usuarioOrganizacionId");

-- CreateIndex
CREATE INDEX "AsignacionPermiso_rolPersonalizadoId_idx" ON "AsignacionPermiso"("rolPersonalizadoId");

-- CreateIndex
CREATE INDEX "AsignacionPermiso_fechaVencimiento_idx" ON "AsignacionPermiso"("fechaVencimiento");

-- CreateIndex
CREATE INDEX "AuditoriaLog_usuarioId_idx" ON "AuditoriaLog"("usuarioId");

-- CreateIndex
CREATE INDEX "AuditoriaLog_organizacionId_idx" ON "AuditoriaLog"("organizacionId");

-- CreateIndex
CREATE INDEX "AuditoriaLog_createdAt_idx" ON "AuditoriaLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditoriaLog_accion_idx" ON "AuditoriaLog"("accion");

-- AddForeignKey
ALTER TABLE "RolPersonalizado" ADD CONSTRAINT "RolPersonalizado_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionPermiso" ADD CONSTRAINT "AsignacionPermiso_usuarioOrganizacionId_fkey" FOREIGN KEY ("usuarioOrganizacionId") REFERENCES "UsuarioOrganizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionPermiso" ADD CONSTRAINT "AsignacionPermiso_rolPersonalizadoId_fkey" FOREIGN KEY ("rolPersonalizadoId") REFERENCES "RolPersonalizado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditoriaLog" ADD CONSTRAINT "AuditoriaLog_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditoriaLog" ADD CONSTRAINT "AuditoriaLog_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
