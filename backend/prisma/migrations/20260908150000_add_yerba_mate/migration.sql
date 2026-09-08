-- CreateTable
CREATE TABLE "CuadroYerba" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "campoId" INTEGER NOT NULL,
    "loteId" INTEGER,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "superficieHa" DOUBLE PRECISION,
    "edadPlantacion" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CuadroYerba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CosechaYerba" (
    "id" SERIAL NOT NULL,
    "cuadroId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fechaCosecha" TIMESTAMP(3) NOT NULL,
    "kgHojaVerde" DOUBLE PRECISION NOT NULL,
    "kgCanchada" DOUBLE PRECISION,
    "jornales" DOUBLE PRECISION,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CosechaYerba_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CuadroYerba_organizacionId_activo_idx" ON "CuadroYerba"("organizacionId", "activo");
CREATE INDEX "CuadroYerba_campoId_idx" ON "CuadroYerba"("campoId");
CREATE INDEX "CuadroYerba_loteId_idx" ON "CuadroYerba"("loteId");
CREATE INDEX "CosechaYerba_cuadroId_fechaCosecha_idx" ON "CosechaYerba"("cuadroId", "fechaCosecha");

-- AddForeignKey
ALTER TABLE "CuadroYerba" ADD CONSTRAINT "CuadroYerba_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CuadroYerba" ADD CONSTRAINT "CuadroYerba_campoId_fkey" FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CuadroYerba" ADD CONSTRAINT "CuadroYerba_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CuadroYerba" ADD CONSTRAINT "CuadroYerba_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CosechaYerba" ADD CONSTRAINT "CosechaYerba_cuadroId_fkey" FOREIGN KEY ("cuadroId") REFERENCES "CuadroYerba"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CosechaYerba" ADD CONSTRAINT "CosechaYerba_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
