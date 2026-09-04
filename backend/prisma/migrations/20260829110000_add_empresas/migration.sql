CREATE TYPE "RolEmpresa" AS ENUM (
  'OWNER',
  'ADMINISTRADOR',
  'GERENTE_GENERAL',
  'GERENTE_ESTABLECIMIENTO',
  'SUPERVISOR',
  'RESPONSABLE_FINANCIERO'
);

CREATE TABLE "Empresa" (
  "id" SERIAL NOT NULL,
  "nombre" TEXT NOT NULL,
  "activo" BOOLEAN NOT NULL DEFAULT true,
  "limiteEstablecimientos" INTEGER NOT NULL DEFAULT 3,
  "propietarioId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmpresaOrganizacion" (
  "id" SERIAL NOT NULL,
  "empresaId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmpresaOrganizacion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UsuarioEmpresa" (
  "id" SERIAL NOT NULL,
  "empresaId" INTEGER NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "rol" "RolEmpresa" NOT NULL,
  "activo" BOOLEAN NOT NULL DEFAULT true,
  "accesoTodasOrganizaciones" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "UsuarioEmpresa_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UsuarioEmpresaOrganizacion" (
  "id" SERIAL NOT NULL,
  "usuarioEmpresaId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UsuarioEmpresaOrganizacion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EmpresaOrganizacion_organizacionId_key" ON "EmpresaOrganizacion"("organizacionId");
CREATE UNIQUE INDEX "EmpresaOrganizacion_empresaId_organizacionId_key" ON "EmpresaOrganizacion"("empresaId", "organizacionId");
CREATE UNIQUE INDEX "UsuarioEmpresa_empresaId_usuarioId_key" ON "UsuarioEmpresa"("empresaId", "usuarioId");
CREATE UNIQUE INDEX "UsuarioEmpresaOrganizacion_usuarioEmpresaId_organizacionId_key" ON "UsuarioEmpresaOrganizacion"("usuarioEmpresaId", "organizacionId");
CREATE INDEX "Empresa_propietarioId_idx" ON "Empresa"("propietarioId");
CREATE INDEX "Empresa_activo_idx" ON "Empresa"("activo");
CREATE INDEX "EmpresaOrganizacion_empresaId_idx" ON "EmpresaOrganizacion"("empresaId");
CREATE INDEX "UsuarioEmpresa_usuarioId_idx" ON "UsuarioEmpresa"("usuarioId");
CREATE INDEX "UsuarioEmpresa_empresaId_activo_idx" ON "UsuarioEmpresa"("empresaId", "activo");
CREATE INDEX "UsuarioEmpresaOrganizacion_organizacionId_idx" ON "UsuarioEmpresaOrganizacion"("organizacionId");

ALTER TABLE "Empresa"
  ADD CONSTRAINT "Empresa_propietarioId_fkey"
  FOREIGN KEY ("propietarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "EmpresaOrganizacion"
  ADD CONSTRAINT "EmpresaOrganizacion_empresaId_fkey"
  FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EmpresaOrganizacion"
  ADD CONSTRAINT "EmpresaOrganizacion_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UsuarioEmpresa"
  ADD CONSTRAINT "UsuarioEmpresa_empresaId_fkey"
  FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UsuarioEmpresa"
  ADD CONSTRAINT "UsuarioEmpresa_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UsuarioEmpresaOrganizacion"
  ADD CONSTRAINT "UsuarioEmpresaOrganizacion_usuarioEmpresaId_fkey"
  FOREIGN KEY ("usuarioEmpresaId") REFERENCES "UsuarioEmpresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UsuarioEmpresaOrganizacion"
  ADD CONSTRAINT "UsuarioEmpresaOrganizacion_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
