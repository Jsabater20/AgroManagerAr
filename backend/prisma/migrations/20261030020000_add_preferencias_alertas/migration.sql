ALTER TABLE "Notificacion"
  ADD COLUMN "visibleEnApp" BOOLEAN NOT NULL DEFAULT true;

DROP INDEX IF EXISTS "Notificacion_usuarioId_leidaEn_createdAt_idx";
CREATE INDEX "Notificacion_usuarioId_visibleEnApp_leidaEn_createdAt_idx"
  ON "Notificacion"("usuarioId", "visibleEnApp", "leidaEn", "createdAt");

CREATE TABLE "PreferenciaAlerta" (
  "id" SERIAL NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "alertasActivas" BOOLEAN NOT NULL DEFAULT true,
  "notificacionEnApp" BOOLEAN NOT NULL DEFAULT true,
  "notificacionPush" BOOLEAN NOT NULL DEFAULT true,
  "notificacionEmail" BOOLEAN NOT NULL DEFAULT false,
  "soloPrioritarias" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PreferenciaAlerta_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PreferenciaAlerta_usuarioId_organizacionId_key"
  ON "PreferenciaAlerta"("usuarioId", "organizacionId");
CREATE INDEX "PreferenciaAlerta_organizacionId_idx"
  ON "PreferenciaAlerta"("organizacionId");

ALTER TABLE "PreferenciaAlerta"
  ADD CONSTRAINT "PreferenciaAlerta_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "PreferenciaAlerta_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
