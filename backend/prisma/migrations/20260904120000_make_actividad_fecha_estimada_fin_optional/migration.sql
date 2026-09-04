-- Permite crear actividades sin una fecha estimada de finalización.
ALTER TABLE "ActividadMiembro"
ALTER COLUMN "fechaEstimadaFin" DROP NOT NULL;
