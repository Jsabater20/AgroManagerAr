CREATE TYPE "EstadoNovedadProducto" AS ENUM ('BORRADOR', 'PUBLICADA');

CREATE TYPE "CategoriaNovedadProducto" AS ENUM (
  'GENERAL',
  'FUNCIONALIDAD',
  'CLIMA',
  'ALERTAS',
  'AGROBOT',
  'REPORTES',
  'EMPRESAS',
  'SEGURIDAD'
);

CREATE TABLE "NovedadProducto" (
  "id" TEXT NOT NULL,
  "titulo" TEXT NOT NULL,
  "resumen" TEXT NOT NULL,
  "contenido" TEXT NOT NULL,
  "categoria" "CategoriaNovedadProducto" NOT NULL DEFAULT 'GENERAL',
  "estado" "EstadoNovedadProducto" NOT NULL DEFAULT 'BORRADOR',
  "version" TEXT,
  "destacada" BOOLEAN NOT NULL DEFAULT false,
  "publicadaEn" TIMESTAMP(3),
  "notificadaEn" TIMESTAMP(3),
  "creadoPorId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "NovedadProducto_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NovedadProductoLectura" (
  "id" TEXT NOT NULL,
  "novedadId" TEXT NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "leidaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "NovedadProductoLectura_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "NovedadProducto_estado_publicadaEn_idx"
  ON "NovedadProducto"("estado", "publicadaEn");

CREATE INDEX "NovedadProducto_destacada_publicadaEn_idx"
  ON "NovedadProducto"("destacada", "publicadaEn");

CREATE UNIQUE INDEX "NovedadProductoLectura_novedadId_usuarioId_key"
  ON "NovedadProductoLectura"("novedadId", "usuarioId");

CREATE INDEX "NovedadProductoLectura_usuarioId_leidaEn_idx"
  ON "NovedadProductoLectura"("usuarioId", "leidaEn");

ALTER TABLE "NovedadProducto"
  ADD CONSTRAINT "NovedadProducto_creadoPorId_fkey"
  FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "NovedadProductoLectura"
  ADD CONSTRAINT "NovedadProductoLectura_novedadId_fkey"
  FOREIGN KEY ("novedadId") REFERENCES "NovedadProducto"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "NovedadProductoLectura"
  ADD CONSTRAINT "NovedadProductoLectura_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
