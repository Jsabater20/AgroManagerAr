ALTER TABLE "TareaRural"
  ADD COLUMN "tareaOrigenId" INTEGER;

CREATE UNIQUE INDEX "TareaRural_tareaOrigenId_key" ON "TareaRural"("tareaOrigenId");

ALTER TABLE "TareaRural"
  ADD CONSTRAINT "TareaRural_tareaOrigenId_fkey"
  FOREIGN KEY ("tareaOrigenId") REFERENCES "TareaRural"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
