ALTER TABLE "UmbralAlertaHidricaCampo"
  ADD COLUMN "crearAccionesAutomaticas" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "ChecklistPreventivoHidrico"
  ADD COLUMN "origenAutomatico" TEXT,
  ADD COLUMN "actualizadoAutomaticamenteEn" TIMESTAMP(3);

CREATE INDEX "ChecklistPreventivoHidrico_organizacionId_campoId_origenAutomatico_estado_idx"
  ON "ChecklistPreventivoHidrico"("organizacionId", "campoId", "origenAutomatico", "estado");
