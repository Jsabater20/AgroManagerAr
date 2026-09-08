CREATE TYPE "ActividadProductiva" AS ENUM (
  'AGRICOLA',
  'GANADERIA',
  'TAMBO',
  'AVICOLA',
  'FRUTIHORTICOLA',
  'YERBA'
);

ALTER TABLE "Organizacion"
ADD COLUMN "actividadPrincipal" "ActividadProductiva";

CREATE TABLE "OrganizacionActividadProductiva" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "tipoActividad" "ActividadProductiva" NOT NULL,
  "activo" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "OrganizacionActividadProductiva_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "OrganizacionActividadProductiva_organizacionId_tipoActividad_key"
ON "OrganizacionActividadProductiva"("organizacionId", "tipoActividad");

CREATE INDEX "OrganizacionActividadProductiva_organizacionId_activo_idx"
ON "OrganizacionActividadProductiva"("organizacionId", "activo");

CREATE INDEX "Organizacion_actividadPrincipal_idx"
ON "Organizacion"("actividadPrincipal");

ALTER TABLE "OrganizacionActividadProductiva"
ADD CONSTRAINT "OrganizacionActividadProductiva_organizacionId_fkey"
FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
