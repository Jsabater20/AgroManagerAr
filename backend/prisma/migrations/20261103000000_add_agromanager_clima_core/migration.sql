ALTER TABLE "Campo"
  ADD COLUMN "provincia" TEXT,
  ADD COLUMN "localidad" TEXT;

CREATE TABLE "CachePronosticoClima" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "campoId" INTEGER NOT NULL,
  "proveedor" TEXT NOT NULL,
  "latitud" DOUBLE PRECISION NOT NULL,
  "longitud" DOUBLE PRECISION NOT NULL,
  "datos" JSONB NOT NULL,
  "obtenidoEn" TIMESTAMP(3) NOT NULL,
  "expiraEn" TIMESTAMP(3) NOT NULL,
  "actualizadoProveedorEn" TIMESTAMP(3),
  "errorUltimaConsulta" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CachePronosticoClima_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RegistroPrecipitacion" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "campoId" INTEGER NOT NULL,
  "loteId" INTEGER,
  "usuarioId" INTEGER,
  "fecha" TIMESTAMP(3) NOT NULL,
  "milimetros" DECIMAL(8,2) NOT NULL,
  "observaciones" TEXT,
  "corregidoEn" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "RegistroPrecipitacion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HistorialRegistroPrecipitacion" (
  "id" SERIAL NOT NULL,
  "registroId" INTEGER NOT NULL,
  "usuarioId" INTEGER,
  "accion" TEXT NOT NULL,
  "datosAntes" JSONB,
  "datosDespues" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "HistorialRegistroPrecipitacion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CachePronosticoClima_campoId_proveedor_key"
  ON "CachePronosticoClima"("campoId", "proveedor");
CREATE INDEX "CachePronosticoClima_organizacionId_expiraEn_idx"
  ON "CachePronosticoClima"("organizacionId", "expiraEn");
CREATE INDEX "RegistroPrecipitacion_organizacionId_campoId_fecha_idx"
  ON "RegistroPrecipitacion"("organizacionId", "campoId", "fecha");
CREATE INDEX "RegistroPrecipitacion_loteId_fecha_idx"
  ON "RegistroPrecipitacion"("loteId", "fecha");
CREATE INDEX "HistorialRegistroPrecipitacion_registroId_createdAt_idx"
  ON "HistorialRegistroPrecipitacion"("registroId", "createdAt");

ALTER TABLE "CachePronosticoClima"
  ADD CONSTRAINT "CachePronosticoClima_organizacionId_fkey"
    FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "CachePronosticoClima_campoId_fkey"
    FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "RegistroPrecipitacion"
  ADD CONSTRAINT "RegistroPrecipitacion_organizacionId_fkey"
    FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "RegistroPrecipitacion_campoId_fkey"
    FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "RegistroPrecipitacion_loteId_fkey"
    FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "RegistroPrecipitacion_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "HistorialRegistroPrecipitacion"
  ADD CONSTRAINT "HistorialRegistroPrecipitacion_registroId_fkey"
    FOREIGN KEY ("registroId") REFERENCES "RegistroPrecipitacion"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "HistorialRegistroPrecipitacion_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
