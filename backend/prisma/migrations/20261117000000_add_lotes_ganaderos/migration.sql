DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SistemaLoteGanadero') THEN
    CREATE TYPE "SistemaLoteGanadero" AS ENUM ('CRIA_PROPIA', 'INVERNADA_COMPRADA', 'FEEDLOT');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'EstadoLoteGanadero') THEN
    CREATE TYPE "EstadoLoteGanadero" AS ENUM ('ACTIVO', 'CERRADO');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "LoteGanadero" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "sistema" "SistemaLoteGanadero" NOT NULL,
  "estado" "EstadoLoteGanadero" NOT NULL DEFAULT 'ACTIVO',
  "ubicacion" TEXT,
  "cantidadInicial" INTEGER NOT NULL,
  "cantidadActual" INTEGER NOT NULL,
  "fechaIngreso" TIMESTAMP(3) NOT NULL,
  "pesoPromedioIngresoKg" DOUBLE PRECISION,
  "pesoPromedioActualKg" DOUBLE PRECISION,
  "costoCompraTotal" DOUBLE PRECISION,
  "fechaEgreso" TIMESTAMP(3),
  "precioVentaTotal" DOUBLE PRECISION,
  "observaciones" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "LoteGanadero_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RegistroLoteGanadero" (
  "id" SERIAL NOT NULL,
  "loteGanaderoId" INTEGER NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "fecha" TIMESTAMP(3) NOT NULL,
  "cantidadActual" INTEGER NOT NULL,
  "pesoPromedioKg" DOUBLE PRECISION,
  "alimentoKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "bajas" INTEGER NOT NULL DEFAULT 0,
  "observaciones" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RegistroLoteGanadero_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Animal" ADD COLUMN IF NOT EXISTS "loteGanaderoId" INTEGER;
CREATE INDEX IF NOT EXISTS "Animal_loteGanaderoId_idx" ON "Animal"("loteGanaderoId");
CREATE INDEX IF NOT EXISTS "LoteGanadero_organizacionId_estado_idx" ON "LoteGanadero"("organizacionId", "estado");
CREATE INDEX IF NOT EXISTS "LoteGanadero_usuarioId_idx" ON "LoteGanadero"("usuarioId");
CREATE INDEX IF NOT EXISTS "RegistroLoteGanadero_loteGanaderoId_fecha_idx" ON "RegistroLoteGanadero"("loteGanaderoId", "fecha");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'LoteGanadero_organizacionId_fkey'
      AND conrelid = '"LoteGanadero"'::regclass
  ) THEN
    ALTER TABLE "LoteGanadero"
      ADD CONSTRAINT "LoteGanadero_organizacionId_fkey"
      FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'LoteGanadero_usuarioId_fkey'
      AND conrelid = '"LoteGanadero"'::regclass
  ) THEN
    ALTER TABLE "LoteGanadero"
      ADD CONSTRAINT "LoteGanadero_usuarioId_fkey"
      FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'RegistroLoteGanadero_loteGanaderoId_fkey'
      AND conrelid = '"RegistroLoteGanadero"'::regclass
  ) THEN
    ALTER TABLE "RegistroLoteGanadero"
      ADD CONSTRAINT "RegistroLoteGanadero_loteGanaderoId_fkey"
      FOREIGN KEY ("loteGanaderoId") REFERENCES "LoteGanadero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'RegistroLoteGanadero_usuarioId_fkey'
      AND conrelid = '"RegistroLoteGanadero"'::regclass
  ) THEN
    ALTER TABLE "RegistroLoteGanadero"
      ADD CONSTRAINT "RegistroLoteGanadero_usuarioId_fkey"
      FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'Animal_loteGanaderoId_fkey'
      AND conrelid = '"Animal"'::regclass
  ) THEN
    ALTER TABLE "Animal"
      ADD CONSTRAINT "Animal_loteGanaderoId_fkey"
      FOREIGN KEY ("loteGanaderoId") REFERENCES "LoteGanadero"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
