-- CreateEnum
CREATE TYPE "RolOrganizacion" AS ENUM ('OWNER', 'ADMIN', 'OPERARIO', 'CONTADOR');

-- CreateEnum
CREATE TYPE "TipoRecurso" AS ENUM ('ORGANIZACION', 'CAMPO', 'LOTE', 'MAQUINARIA', 'ANIMAL', 'TAREA', 'MODULO');

-- CreateEnum
CREATE TYPE "EstadoMiembro" AS ENUM ('ACTIVO', 'INVITADO', 'INACTIVO', 'SUSPENDIDO');

-- CreateEnum
CREATE TYPE "EstadoInvitacion" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'EXPIRADA');

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "organizacionId" INTEGER;

-- AlterTable
ALTER TABLE "Campania" ADD COLUMN     "organizacionId" INTEGER;

-- AlterTable
ALTER TABLE "Campo" ADD COLUMN     "organizacionId" INTEGER;

-- AlterTable
ALTER TABLE "GastoMaquinaria" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MantenimientoMaquinaria" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Maquinaria" ADD COLUMN     "organizacionId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MovimientoFinanciero" ADD COLUMN     "organizacionId" INTEGER;

-- AlterTable
ALTER TABLE "TareaRural" ADD COLUMN     "organizacionId" INTEGER;

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "plan" "PlanTipo" NOT NULL DEFAULT 'FREE',
    "propietarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioOrganizacion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "rol" "RolOrganizacion" NOT NULL DEFAULT 'OPERARIO',
    "estado" "EstadoMiembro" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsuarioOrganizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsignacionRecurso" (
    "id" SERIAL NOT NULL,
    "usuarioOrganizacionId" INTEGER NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "recursoTipo" "TipoRecurso" NOT NULL,
    "recursoId" INTEGER NOT NULL,
    "permisosTipo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AsignacionRecurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvitacionOrganizacion" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "rol" "RolOrganizacion" NOT NULL DEFAULT 'OPERARIO',
    "token" TEXT NOT NULL,
    "estado" "EstadoInvitacion" NOT NULL DEFAULT 'PENDIENTE',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "aceptadoEn" TIMESTAMP(3),
    "usuarioId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvitacionOrganizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_email_key" ON "Organizacion"("email");

-- CreateIndex
CREATE INDEX "Organizacion_propietarioId_idx" ON "Organizacion"("propietarioId");

-- CreateIndex
CREATE INDEX "UsuarioOrganizacion_usuarioId_idx" ON "UsuarioOrganizacion"("usuarioId");

-- CreateIndex
CREATE INDEX "UsuarioOrganizacion_organizacionId_idx" ON "UsuarioOrganizacion"("organizacionId");

-- CreateIndex
CREATE INDEX "UsuarioOrganizacion_rol_idx" ON "UsuarioOrganizacion"("rol");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioOrganizacion_usuarioId_organizacionId_key" ON "UsuarioOrganizacion"("usuarioId", "organizacionId");

-- CreateIndex
CREATE INDEX "AsignacionRecurso_usuarioOrganizacionId_idx" ON "AsignacionRecurso"("usuarioOrganizacionId");

-- CreateIndex
CREATE INDEX "AsignacionRecurso_organizacionId_recursoTipo_recursoId_idx" ON "AsignacionRecurso"("organizacionId", "recursoTipo", "recursoId");

-- CreateIndex
CREATE UNIQUE INDEX "AsignacionRecurso_usuarioOrganizacionId_recursoTipo_recurso_key" ON "AsignacionRecurso"("usuarioOrganizacionId", "recursoTipo", "recursoId");

-- CreateIndex
CREATE UNIQUE INDEX "InvitacionOrganizacion_token_key" ON "InvitacionOrganizacion"("token");

-- CreateIndex
CREATE INDEX "InvitacionOrganizacion_email_idx" ON "InvitacionOrganizacion"("email");

-- CreateIndex
CREATE INDEX "InvitacionOrganizacion_token_idx" ON "InvitacionOrganizacion"("token");

-- CreateIndex
CREATE INDEX "InvitacionOrganizacion_organizacionId_idx" ON "InvitacionOrganizacion"("organizacionId");

-- CreateIndex
CREATE INDEX "Animal_organizacionId_idx" ON "Animal"("organizacionId");

-- CreateIndex
CREATE INDEX "Campania_organizacionId_idx" ON "Campania"("organizacionId");

-- CreateIndex
CREATE INDEX "Campo_organizacionId_idx" ON "Campo"("organizacionId");

-- CreateIndex
CREATE INDEX "Maquinaria_organizacionId_idx" ON "Maquinaria"("organizacionId");

-- CreateIndex
CREATE INDEX "MovimientoFinanciero_organizacionId_idx" ON "MovimientoFinanciero"("organizacionId");

-- CreateIndex
CREATE INDEX "TareaRural_organizacionId_idx" ON "TareaRural"("organizacionId");

-- AddForeignKey
ALTER TABLE "Campo" ADD CONSTRAINT "Campo_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareaRural" ADD CONSTRAINT "TareaRural_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maquinaria" ADD CONSTRAINT "Maquinaria_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoFinanciero" ADD CONSTRAINT "MovimientoFinanciero_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campania" ADD CONSTRAINT "Campania_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizacion" ADD CONSTRAINT "Organizacion_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioOrganizacion" ADD CONSTRAINT "UsuarioOrganizacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioOrganizacion" ADD CONSTRAINT "UsuarioOrganizacion_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionRecurso" ADD CONSTRAINT "AsignacionRecurso_usuarioOrganizacionId_fkey" FOREIGN KEY ("usuarioOrganizacionId") REFERENCES "UsuarioOrganizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionRecurso" ADD CONSTRAINT "AsignacionRecurso_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitacionOrganizacion" ADD CONSTRAINT "InvitacionOrganizacion_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitacionOrganizacion" ADD CONSTRAINT "InvitacionOrganizacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
