CREATE TYPE "NivelRiesgoHidrico" AS ENUM ('BAJO', 'MEDIO', 'ALTO');

CREATE TABLE "PerfilRiesgoHidricoCampo" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "campoId" INTEGER NOT NULL,
    "nivel" "NivelRiesgoHidrico" NOT NULL DEFAULT 'MEDIO',
    "zonasBajas" TEXT,
    "drenajes" TEXT,
    "caminosYAccesos" TEXT,
    "infraestructuraCritica" TEXT,
    "sectoresSeguros" TEXT,
    "observaciones" TEXT,
    "actualizadoPorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerfilRiesgoHidricoCampo_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PerfilRiesgoHidricoCampo_campoId_key" ON "PerfilRiesgoHidricoCampo"("campoId");
CREATE INDEX "PerfilRiesgoHidricoCampo_organizacionId_nivel_idx" ON "PerfilRiesgoHidricoCampo"("organizacionId", "nivel");

ALTER TABLE "PerfilRiesgoHidricoCampo"
  ADD CONSTRAINT "PerfilRiesgoHidricoCampo_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PerfilRiesgoHidricoCampo"
  ADD CONSTRAINT "PerfilRiesgoHidricoCampo_campoId_fkey"
  FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PerfilRiesgoHidricoCampo"
  ADD CONSTRAINT "PerfilRiesgoHidricoCampo_actualizadoPorId_fkey"
  FOREIGN KEY ("actualizadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
