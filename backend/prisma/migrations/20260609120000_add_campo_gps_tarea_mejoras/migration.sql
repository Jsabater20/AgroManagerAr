-- CreateEnum
CREATE TYPE "RepetirTarea" AS ENUM ('UNICA', 'SEMANAL', 'QUINCENAL', 'MENSUAL');

-- AlterTable Campo: GPS
ALTER TABLE "Campo" ADD COLUMN "latitud"  DOUBLE PRECISION;
ALTER TABLE "Campo" ADD COLUMN "longitud" DOUBLE PRECISION;

-- AlterTable TareaRural: fechaLimite + repetir
ALTER TABLE "TareaRural" ADD COLUMN "fechaLimite" TIMESTAMP(3);
ALTER TABLE "TareaRural" ADD COLUMN "repetir"     "RepetirTarea" NOT NULL DEFAULT 'UNICA';
