ALTER TABLE "PreferenciaAlerta"
  ADD COLUMN "alertasClimaActivas" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "AlertaGestion"
  ADD COLUMN "actividadMiembroId" INTEGER;

CREATE INDEX "AlertaGestion_actividadMiembroId_idx"
  ON "AlertaGestion"("actividadMiembroId");

ALTER TABLE "AlertaGestion"
  ADD CONSTRAINT "AlertaGestion_actividadMiembroId_fkey"
    FOREIGN KEY ("actividadMiembroId") REFERENCES "ActividadMiembro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
