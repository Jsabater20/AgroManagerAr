CREATE TYPE "EstadoCampaniaPromocional" AS ENUM ('BORRADOR', 'ACTIVA', 'PAUSADA', 'FINALIZADA');
CREATE TYPE "OrigenAsignacionPromocion" AS ENUM ('EXISTENTE', 'REGISTRO', 'MANUAL');
CREATE TYPE "EstadoAsignacionPromocion" AS ENUM ('ASIGNADA', 'OMITIDA', 'ERROR');

CREATE TABLE "CampaniaPromocional" (
  "id" SERIAL NOT NULL,
  "codigo" TEXT NOT NULL,
  "nombre" TEXT NOT NULL,
  "descripcion" TEXT,
  "estado" "EstadoCampaniaPromocional" NOT NULL DEFAULT 'BORRADOR',
  "inicioNuevosRegistros" TIMESTAMP(3) NOT NULL,
  "finNuevosRegistros" TIMESTAMP(3) NOT NULL,
  "duracionMeses" INTEGER NOT NULL,
  "incluyeOrganizacionesEmpresa" BOOLEAN NOT NULL DEFAULT false,
  "mostrarEnSitio" BOOLEAN NOT NULL DEFAULT false,
  "activadaEn" TIMESTAMP(3),
  "creadaPorId" INTEGER NOT NULL,
  "activadaPorId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CampaniaPromocional_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CampaniaPromocional_codigo_key" ON "CampaniaPromocional"("codigo");
CREATE INDEX "CampaniaPromocional_estado_inicioNuevosRegistros_finNuevosRegistros_idx"
  ON "CampaniaPromocional"("estado", "inicioNuevosRegistros", "finNuevosRegistros");

CREATE TABLE "AsignacionPromocion" (
  "id" SERIAL NOT NULL,
  "campaniaId" INTEGER NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "fechaInicio" TIMESTAMP(3) NOT NULL,
  "fechaFin" TIMESTAMP(3) NOT NULL,
  "origen" "OrigenAsignacionPromocion" NOT NULL,
  "estado" "EstadoAsignacionPromocion" NOT NULL DEFAULT 'ASIGNADA',
  "detalle" TEXT,
  "asignadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "AsignacionPromocion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AsignacionPromocion_campaniaId_usuarioId_key"
  ON "AsignacionPromocion"("campaniaId", "usuarioId");
CREATE INDEX "AsignacionPromocion_usuarioId_fechaFin_idx"
  ON "AsignacionPromocion"("usuarioId", "fechaFin");
CREATE INDEX "AsignacionPromocion_campaniaId_estado_idx"
  ON "AsignacionPromocion"("campaniaId", "estado");

ALTER TABLE "BeneficioProOrganizacion"
  ADD COLUMN "asignacionPromocionId" INTEGER;
CREATE UNIQUE INDEX "BeneficioProOrganizacion_asignacionPromocionId_organizacionId_key"
  ON "BeneficioProOrganizacion"("asignacionPromocionId", "organizacionId");

ALTER TABLE "CampaniaPromocional"
  ADD CONSTRAINT "CampaniaPromocional_creadaPorId_fkey"
  FOREIGN KEY ("creadaPorId") REFERENCES "Usuario"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "CampaniaPromocional_activadaPorId_fkey"
  FOREIGN KEY ("activadaPorId") REFERENCES "Usuario"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "AsignacionPromocion"
  ADD CONSTRAINT "AsignacionPromocion_campaniaId_fkey"
  FOREIGN KEY ("campaniaId") REFERENCES "CampaniaPromocional"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "AsignacionPromocion_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "BeneficioProOrganizacion"
  ADD CONSTRAINT "BeneficioProOrganizacion_asignacionPromocionId_fkey"
  FOREIGN KEY ("asignacionPromocionId") REFERENCES "AsignacionPromocion"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
