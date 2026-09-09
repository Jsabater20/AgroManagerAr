-- CreateEnum
CREATE TYPE "TipoCalculo" AS ENUM ('APLICACION', 'SIEMBRA', 'FERTILIZACION', 'MAQUINARIA', 'GANADERIA', 'ECONOMICO');

-- CreateTable
CREATE TABLE "CalculoGuardado" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" "TipoCalculo" NOT NULL,
    "titulo" TEXT NOT NULL,
    "campoId" INTEGER,
    "loteId" INTEGER,
    "maquinariaId" INTEGER,
    "datos" JSONB NOT NULL,
    "resultado" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalculoGuardado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CalculoGuardado_organizacionId_tipo_createdAt_idx" ON "CalculoGuardado"("organizacionId", "tipo", "createdAt");
CREATE INDEX "CalculoGuardado_usuarioId_createdAt_idx" ON "CalculoGuardado"("usuarioId", "createdAt");

-- AddForeignKey
ALTER TABLE "CalculoGuardado" ADD CONSTRAINT "CalculoGuardado_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CalculoGuardado" ADD CONSTRAINT "CalculoGuardado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
