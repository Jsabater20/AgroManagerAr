ALTER TABLE "SolicitudAgroManagerDigital"
  ADD COLUMN "tipoProyecto" TEXT NOT NULL DEFAULT 'ESTABLECIMIENTO',
  ADD COLUMN "informacionPublicar" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "requiereCatalogo" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "administraContenido" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "tieneIdentidadVisual" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "tieneDominioPropio" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "requiereMantenimiento" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "referenciaUrl" TEXT,
  ADD COLUMN "funcionalidadesPersonalizadas" TEXT;
