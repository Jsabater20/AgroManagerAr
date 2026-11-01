CREATE TABLE "AlertaGestion" (
  "id" TEXT NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "clave" TEXT NOT NULL,
  "tipo" TEXT NOT NULL,
  "severidad" TEXT NOT NULL,
  "estado" TEXT NOT NULL DEFAULT 'ACTIVA',
  "titulo" TEXT NOT NULL,
  "mensaje" TEXT NOT NULL,
  "enlace" TEXT NOT NULL,
  "origenTipo" TEXT NOT NULL,
  "origenId" TEXT NOT NULL,
  "ciclo" INTEGER NOT NULL DEFAULT 1,
  "detectadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ultimaEvaluacionEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "revisadaEn" TIMESTAMP(3),
  "resueltaEn" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "AlertaGestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AlertaLectura" (
  "id" TEXT NOT NULL,
  "alertaId" TEXT NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "leidaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "AlertaLectura_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AlertaGestion_organizacionId_clave_key"
  ON "AlertaGestion"("organizacionId", "clave");
CREATE INDEX "AlertaGestion_organizacionId_estado_severidad_idx"
  ON "AlertaGestion"("organizacionId", "estado", "severidad");
CREATE INDEX "AlertaGestion_organizacionId_ultimaEvaluacionEn_idx"
  ON "AlertaGestion"("organizacionId", "ultimaEvaluacionEn");
CREATE UNIQUE INDEX "AlertaLectura_alertaId_usuarioId_key"
  ON "AlertaLectura"("alertaId", "usuarioId");
CREATE INDEX "AlertaLectura_usuarioId_leidaEn_idx"
  ON "AlertaLectura"("usuarioId", "leidaEn");

ALTER TABLE "AlertaGestion"
  ADD CONSTRAINT "AlertaGestion_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AlertaLectura"
  ADD CONSTRAINT "AlertaLectura_alertaId_fkey"
  FOREIGN KEY ("alertaId") REFERENCES "AlertaGestion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "AlertaLectura_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
