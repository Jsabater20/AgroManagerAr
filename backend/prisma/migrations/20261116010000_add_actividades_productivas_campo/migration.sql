CREATE TABLE "CampoActividadProductiva" (
  "id" SERIAL NOT NULL,
  "campoId" INTEGER NOT NULL,
  "tipoActividad" "ActividadProductiva" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CampoActividadProductiva_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CampoActividadProductiva_campoId_tipoActividad_key"
  ON "CampoActividadProductiva"("campoId", "tipoActividad");
CREATE INDEX "CampoActividadProductiva_tipoActividad_idx"
  ON "CampoActividadProductiva"("tipoActividad");
ALTER TABLE "CampoActividadProductiva"
  ADD CONSTRAINT "CampoActividadProductiva_campoId_fkey"
  FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
