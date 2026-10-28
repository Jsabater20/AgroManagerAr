CREATE TYPE "OrigenMovimientoFinanciero" AS ENUM ('MANUAL', 'COSTO_PRODUCTIVO');
CREATE TYPE "TipoCostoProductivo" AS ENUM ('ESTIMADO', 'REAL');
CREATE TYPE "RubroCostoProductivo" AS ENUM (
  'INSUMO',
  'MAQUINARIA',
  'MANO_DE_OBRA',
  'CONTRATISTA',
  'SERVICIO',
  'COMBUSTIBLE',
  'MANTENIMIENTO',
  'OTRO'
);
CREATE TYPE "CriterioDistribucionCosto" AS ENUM ('MANUAL', 'POR_SUPERFICIE', 'IGUALITARIO');

ALTER TABLE "MovimientoFinanciero"
  ADD COLUMN "moneda" TEXT NOT NULL DEFAULT 'ARS',
  ADD COLUMN "origen" "OrigenMovimientoFinanciero" NOT NULL DEFAULT 'MANUAL';

ALTER TABLE "ActividadMiembro"
  ADD COLUMN "calculoOrigenId" INTEGER;

CREATE TABLE "CostoProductivo" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "actividadId" INTEGER,
  "calculoGuardadoId" INTEGER,
  "movimientoFinancieroId" INTEGER,
  "campoId" INTEGER,
  "loteId" INTEGER,
  "siembraId" INTEGER,
  "campaniaId" INTEGER,
  "insumoId" INTEGER,
  "maquinariaId" INTEGER,
  "creadoPorId" INTEGER NOT NULL,
  "tipo" "TipoCostoProductivo" NOT NULL,
  "rubro" "RubroCostoProductivo" NOT NULL,
  "criterioDistribucion" "CriterioDistribucionCosto" NOT NULL DEFAULT 'MANUAL',
  "descripcion" TEXT NOT NULL,
  "cantidad" DECIMAL(16,4),
  "unidad" TEXT,
  "costoUnitario" DECIMAL(16,2),
  "monto" DECIMAL(16,2) NOT NULL,
  "superficieHa" DECIMAL(12,2),
  "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "idempotencyKey" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CostoProductivo_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CostoProductivo_monto_no_negativo" CHECK ("monto" >= 0),
  CONSTRAINT "CostoProductivo_superficie_positiva" CHECK ("superficieHa" IS NULL OR "superficieHa" > 0)
);

CREATE UNIQUE INDEX "CostoProductivo_idempotencyKey_key" ON "CostoProductivo"("idempotencyKey");
CREATE UNIQUE INDEX "CostoProductivo_actividadId_movimientoFinancieroId_key"
  ON "CostoProductivo"("actividadId", "movimientoFinancieroId");
CREATE INDEX "CostoProductivo_organizacionId_tipo_fecha_idx"
  ON "CostoProductivo"("organizacionId", "tipo", "fecha");
CREATE INDEX "CostoProductivo_organizacionId_loteId_idx"
  ON "CostoProductivo"("organizacionId", "loteId");
CREATE INDEX "CostoProductivo_campaniaId_idx" ON "CostoProductivo"("campaniaId");
CREATE INDEX "CostoProductivo_movimientoFinancieroId_idx"
  ON "CostoProductivo"("movimientoFinancieroId");
CREATE INDEX "ActividadMiembro_calculoOrigenId_idx" ON "ActividadMiembro"("calculoOrigenId");

ALTER TABLE "ActividadMiembro"
  ADD CONSTRAINT "ActividadMiembro_calculoOrigenId_fkey"
  FOREIGN KEY ("calculoOrigenId") REFERENCES "CalculoGuardado"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CostoProductivo"
  ADD CONSTRAINT "CostoProductivo_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_actividadId_fkey"
  FOREIGN KEY ("actividadId") REFERENCES "ActividadMiembro"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_calculoGuardadoId_fkey"
  FOREIGN KEY ("calculoGuardadoId") REFERENCES "CalculoGuardado"("id")
  ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_movimientoFinancieroId_fkey"
  FOREIGN KEY ("movimientoFinancieroId") REFERENCES "MovimientoFinanciero"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_campoId_fkey"
  FOREIGN KEY ("campoId") REFERENCES "Campo"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_loteId_fkey"
  FOREIGN KEY ("loteId") REFERENCES "Lote"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_siembraId_fkey"
  FOREIGN KEY ("siembraId") REFERENCES "Siembra"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_campaniaId_fkey"
  FOREIGN KEY ("campaniaId") REFERENCES "Campania"("id")
  ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_insumoId_fkey"
  FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id")
  ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_maquinariaId_fkey"
  FOREIGN KEY ("maquinariaId") REFERENCES "Maquinaria"("id")
  ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "CostoProductivo_creadoPorId_fkey"
  FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
