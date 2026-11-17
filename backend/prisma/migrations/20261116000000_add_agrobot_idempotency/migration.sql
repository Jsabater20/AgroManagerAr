ALTER TABLE "Campo" ADD COLUMN "agroBotIdempotencyKey" TEXT;
ALTER TABLE "ActividadMiembro" ADD COLUMN "agroBotIdempotencyKey" TEXT;

CREATE UNIQUE INDEX "Campo_agroBotIdempotencyKey_key" ON "Campo"("agroBotIdempotencyKey");
CREATE UNIQUE INDEX "ActividadMiembro_agroBotIdempotencyKey_key" ON "ActividadMiembro"("agroBotIdempotencyKey");
