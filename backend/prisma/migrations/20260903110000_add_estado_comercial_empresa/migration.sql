CREATE TYPE "EstadoEmpresa" AS ENUM (
  'PENDIENTE',
  'ACTIVA',
  'SUSPENDIDA',
  'VENCIDA'
);

ALTER TABLE "Empresa"
  ADD COLUMN "estadoComercial" "EstadoEmpresa" NOT NULL DEFAULT 'ACTIVA',
  ADD COLUMN "fechaInicioComercial" TIMESTAMP(3),
  ADD COLUMN "fechaVencimiento" TIMESTAMP(3),
  ADD COLUMN "observacionesComerciales" TEXT;

CREATE INDEX "Empresa_estadoComercial_idx" ON "Empresa"("estadoComercial");
CREATE INDEX "Empresa_fechaVencimiento_idx" ON "Empresa"("fechaVencimiento");
