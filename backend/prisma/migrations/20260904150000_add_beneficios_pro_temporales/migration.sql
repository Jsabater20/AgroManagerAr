CREATE TABLE "BeneficioProOrganizacion" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "otorgadoPorId" INTEGER NOT NULL,
    "motivo" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "revocadoEn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeneficioProOrganizacion_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "BeneficioProOrganizacion_organizacionId_activo_fechaFin_idx"
ON "BeneficioProOrganizacion"("organizacionId", "activo", "fechaFin");

CREATE INDEX "BeneficioProOrganizacion_otorgadoPorId_idx"
ON "BeneficioProOrganizacion"("otorgadoPorId");

ALTER TABLE "BeneficioProOrganizacion"
ADD CONSTRAINT "BeneficioProOrganizacion_organizacionId_fkey"
FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "BeneficioProOrganizacion"
ADD CONSTRAINT "BeneficioProOrganizacion_otorgadoPorId_fkey"
FOREIGN KEY ("otorgadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
