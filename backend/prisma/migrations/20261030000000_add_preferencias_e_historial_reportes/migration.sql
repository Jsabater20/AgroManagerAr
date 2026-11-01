CREATE TABLE "PreferenciaReporte" (
  "id" SERIAL NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "tipoPeriodo" TEXT NOT NULL DEFAULT 'MENSUAL',
  "vistaDesglose" TEXT NOT NULL DEFAULT 'LOTES',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PreferenciaReporte_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HistorialReporte" (
  "id" SERIAL NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "tipo" TEXT NOT NULL,
  "fechaReferencia" TIMESTAMP(3) NOT NULL,
  "periodoDesde" TIMESTAMP(3) NOT NULL,
  "periodoHasta" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "HistorialReporte_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PreferenciaReporte_usuarioId_organizacionId_key"
  ON "PreferenciaReporte"("usuarioId", "organizacionId");
CREATE INDEX "PreferenciaReporte_organizacionId_idx"
  ON "PreferenciaReporte"("organizacionId");
CREATE INDEX "HistorialReporte_usuarioId_organizacionId_createdAt_idx"
  ON "HistorialReporte"("usuarioId", "organizacionId", "createdAt");
CREATE INDEX "HistorialReporte_organizacionId_createdAt_idx"
  ON "HistorialReporte"("organizacionId", "createdAt");

ALTER TABLE "PreferenciaReporte"
  ADD CONSTRAINT "PreferenciaReporte_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "PreferenciaReporte_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "HistorialReporte"
  ADD CONSTRAINT "HistorialReporte_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "HistorialReporte_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
