CREATE TABLE "UmbralAlertaHidricaCampo" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "campoId" INTEGER NOT NULL,
  "activo" BOOLEAN NOT NULL DEFAULT true,
  "lluviaDiariaMm" DOUBLE PRECISION NOT NULL DEFAULT 25,
  "lluviaAcumulada48hMm" DOUBLE PRECISION NOT NULL DEFAULT 50,
  "probabilidadLluviaPct" INTEGER NOT NULL DEFAULT 70,
  "actualizadoPorId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UmbralAlertaHidricaCampo_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "UmbralAlertaHidricaCampo_campoId_key"
  ON "UmbralAlertaHidricaCampo"("campoId");
CREATE INDEX "UmbralAlertaHidricaCampo_organizacionId_activo_idx"
  ON "UmbralAlertaHidricaCampo"("organizacionId", "activo");

ALTER TABLE "UmbralAlertaHidricaCampo"
  ADD CONSTRAINT "UmbralAlertaHidricaCampo_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "UmbralAlertaHidricaCampo"
  ADD CONSTRAINT "UmbralAlertaHidricaCampo_campoId_fkey"
  FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "UmbralAlertaHidricaCampo"
  ADD CONSTRAINT "UmbralAlertaHidricaCampo_actualizadoPorId_fkey"
  FOREIGN KEY ("actualizadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
