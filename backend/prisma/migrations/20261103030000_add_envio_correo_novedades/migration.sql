ALTER TABLE "Usuario"
  ADD COLUMN "recibeNovedades" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "recibePromociones" BOOLEAN NOT NULL DEFAULT false;

UPDATE "Usuario"
SET
  "recibeNovedades" = "recibeComunicaciones",
  "recibePromociones" = "recibeComunicaciones";

CREATE TYPE "EstadoEnvioCorreoNovedad" AS ENUM ('PENDIENTE', 'ENVIADO', 'ERROR');

CREATE TABLE "EnvioCorreoNovedad" (
  "id" TEXT NOT NULL,
  "novedadId" TEXT NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "estado" "EstadoEnvioCorreoNovedad" NOT NULL DEFAULT 'PENDIENTE',
  "intentos" INTEGER NOT NULL DEFAULT 0,
  "error" TEXT,
  "enviadoEn" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "EnvioCorreoNovedad_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EnvioCorreoNovedad_novedadId_usuarioId_key"
  ON "EnvioCorreoNovedad"("novedadId", "usuarioId");

CREATE INDEX "EnvioCorreoNovedad_novedadId_estado_idx"
  ON "EnvioCorreoNovedad"("novedadId", "estado");

CREATE INDEX "EnvioCorreoNovedad_usuarioId_estado_idx"
  ON "EnvioCorreoNovedad"("usuarioId", "estado");

ALTER TABLE "EnvioCorreoNovedad"
  ADD CONSTRAINT "EnvioCorreoNovedad_novedadId_fkey"
  FOREIGN KEY ("novedadId") REFERENCES "NovedadProducto"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "EnvioCorreoNovedad"
  ADD CONSTRAINT "EnvioCorreoNovedad_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
