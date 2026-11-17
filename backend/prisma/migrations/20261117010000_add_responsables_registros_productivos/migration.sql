ALTER TABLE "Siembra" ADD COLUMN "usuarioId" INTEGER;
ALTER TABLE "Cosecha" ADD COLUMN "usuarioId" INTEGER;
ALTER TABLE "AplicacionInsumo" ADD COLUMN "usuarioId" INTEGER;

CREATE INDEX "Siembra_usuarioId_idx" ON "Siembra"("usuarioId");
CREATE INDEX "Cosecha_usuarioId_idx" ON "Cosecha"("usuarioId");
CREATE INDEX "AplicacionInsumo_usuarioId_idx" ON "AplicacionInsumo"("usuarioId");

ALTER TABLE "Siembra"
  ADD CONSTRAINT "Siembra_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Cosecha"
  ADD CONSTRAINT "Cosecha_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "AplicacionInsumo"
  ADD CONSTRAINT "AplicacionInsumo_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
