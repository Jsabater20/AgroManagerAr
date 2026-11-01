ALTER TABLE "PreferenciaReporte"
  ADD COLUMN "envioAutomatico" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "frecuenciaEnvio" TEXT NOT NULL DEFAULT 'MENSUAL';

CREATE TABLE "EnvioReporteAutomatico" (
  "id" SERIAL NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "tipoPeriodo" TEXT NOT NULL,
  "periodoDesde" TIMESTAMP(3) NOT NULL,
  "periodoHasta" TIMESTAMP(3) NOT NULL,
  "estado" TEXT NOT NULL DEFAULT 'PROCESANDO',
  "error" TEXT,
  "enviadoEn" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "EnvioReporteAutomatico_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EnvioReporteAutomatico_usuarioId_organizacionId_tipoPeriodo_periodoDesde_periodoHasta_key"
  ON "EnvioReporteAutomatico"("usuarioId", "organizacionId", "tipoPeriodo", "periodoDesde", "periodoHasta");
CREATE INDEX "EnvioReporteAutomatico_organizacionId_createdAt_idx"
  ON "EnvioReporteAutomatico"("organizacionId", "createdAt");
CREATE INDEX "EnvioReporteAutomatico_estado_createdAt_idx"
  ON "EnvioReporteAutomatico"("estado", "createdAt");

ALTER TABLE "EnvioReporteAutomatico"
  ADD CONSTRAINT "EnvioReporteAutomatico_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "EnvioReporteAutomatico_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
