-- Add roles column to UsuarioOrganizacion
ALTER TABLE "UsuarioOrganizacion" ADD COLUMN "roles" TEXT NOT NULL DEFAULT '[]';

-- Add activo column to UsuarioOrganizacion
ALTER TABLE "UsuarioOrganizacion" ADD COLUMN "activo" BOOLEAN NOT NULL DEFAULT true;

-- Add fechaInvitacion column to UsuarioOrganizacion
ALTER TABLE "UsuarioOrganizacion" ADD COLUMN "fechaInvitacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Drop old columns (rol, estado) if they exist
ALTER TABLE "UsuarioOrganizacion" DROP COLUMN IF EXISTS "rol";
ALTER TABLE "UsuarioOrganizacion" DROP COLUMN IF EXISTS "estado";

-- CreateTable AsignacionCampo
CREATE TABLE "AsignacionCampo" (
    "id" SERIAL NOT NULL,
    "usuarioOrganizacionId" INTEGER NOT NULL,
    "campoId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaAsignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AsignacionCampo_pkey" PRIMARY KEY ("id")
);

-- CreateTable VisibilidadModulo
CREATE TABLE "VisibilidadModulo" (
    "id" SERIAL NOT NULL,
    "usuarioOrganizacionId" INTEGER NOT NULL,
    "moduloNombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaHabilitacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisibilidadModulo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AsignacionCampo_usuarioOrganizacionId_campoId_key" ON "AsignacionCampo"("usuarioOrganizacionId", "campoId");

-- CreateIndex
CREATE INDEX "AsignacionCampo_campoId_idx" ON "AsignacionCampo"("campoId");

-- CreateIndex
CREATE UNIQUE INDEX "VisibilidadModulo_usuarioOrganizacionId_moduloNombre_key" ON "VisibilidadModulo"("usuarioOrganizacionId", "moduloNombre");

-- CreateIndex
CREATE INDEX "VisibilidadModulo_usuarioOrganizacionId_idx" ON "VisibilidadModulo"("usuarioOrganizacionId");

-- AddForeignKey
ALTER TABLE "AsignacionCampo" ADD CONSTRAINT "AsignacionCampo_usuarioOrganizacionId_fkey" FOREIGN KEY ("usuarioOrganizacionId") REFERENCES "UsuarioOrganizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionCampo" ADD CONSTRAINT "AsignacionCampo_campoId_fkey" FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisibilidadModulo" ADD CONSTRAINT "VisibilidadModulo_usuarioOrganizacionId_fkey" FOREIGN KEY ("usuarioOrganizacionId") REFERENCES "UsuarioOrganizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
