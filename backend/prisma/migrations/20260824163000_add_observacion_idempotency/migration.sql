-- AlterTable
ALTER TABLE "ObservacionActividad" ADD COLUMN "idempotencyKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ObservacionActividad_idempotencyKey_key" ON "ObservacionActividad"("idempotencyKey");
