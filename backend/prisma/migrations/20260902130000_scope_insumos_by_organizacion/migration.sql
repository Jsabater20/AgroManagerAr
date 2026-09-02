ALTER TABLE "Insumo" ADD COLUMN "organizacionId" INTEGER;

WITH insumos_con_organizacion_unica AS (
  SELECT
    aplicacion."insumoId",
    MIN(campo."organizacionId") AS "organizacionId"
  FROM "AplicacionInsumo" aplicacion
  INNER JOIN "Siembra" siembra ON siembra.id = aplicacion."siembraId"
  INNER JOIN "Lote" lote ON lote.id = siembra."loteId"
  INNER JOIN "Campo" campo ON campo.id = lote."campoId"
  WHERE campo."organizacionId" IS NOT NULL
  GROUP BY aplicacion."insumoId"
  HAVING COUNT(DISTINCT campo."organizacionId") = 1
)
UPDATE "Insumo" insumo
SET "organizacionId" = origen."organizacionId"
FROM insumos_con_organizacion_unica origen
WHERE insumo.id = origen."insumoId";

ALTER TABLE "Insumo"
ADD CONSTRAINT "Insumo_organizacionId_fkey"
FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"(id)
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "Insumo_organizacionId_idx" ON "Insumo"("organizacionId");
