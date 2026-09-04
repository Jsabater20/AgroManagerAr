ALTER TABLE "Usuario" ADD COLUMN "codigoReferido" TEXT;

UPDATE "Usuario"
SET "codigoReferido" = CONCAT('AGRO', "id")
WHERE "codigoReferido" IS NULL;

ALTER TABLE "Usuario" ALTER COLUMN "codigoReferido" SET NOT NULL;
CREATE UNIQUE INDEX "Usuario_codigoReferido_key" ON "Usuario"("codigoReferido");

CREATE TABLE "Referido" (
    "id" SERIAL NOT NULL,
    "referenteId" INTEGER NOT NULL,
    "referidoId" INTEGER NOT NULL,
    "registradoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerificadoEn" TIMESTAMP(3),
    "primerCampoCreadoEn" TIMESTAMP(3),
    "validadoEn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referido_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Referido_referidoId_key" ON "Referido"("referidoId");
CREATE INDEX "Referido_referenteId_validadoEn_idx" ON "Referido"("referenteId", "validadoEn");

ALTER TABLE "Referido"
ADD CONSTRAINT "Referido_referenteId_fkey"
FOREIGN KEY ("referenteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Referido"
ADD CONSTRAINT "Referido_referidoId_fkey"
FOREIGN KEY ("referidoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
