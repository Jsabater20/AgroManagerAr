CREATE TABLE "UsoAgroBotIa" (
  "id" SERIAL NOT NULL,
  "usuarioId" INTEGER NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "fecha" TIMESTAMP(3) NOT NULL,
  "consultas" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UsoAgroBotIa_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "UsoAgroBotIa_usuarioId_organizacionId_fecha_key"
  ON "UsoAgroBotIa"("usuarioId", "organizacionId", "fecha");
CREATE INDEX "UsoAgroBotIa_organizacionId_fecha_idx"
  ON "UsoAgroBotIa"("organizacionId", "fecha");

ALTER TABLE "UsoAgroBotIa"
  ADD CONSTRAINT "UsoAgroBotIa_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UsoAgroBotIa"
  ADD CONSTRAINT "UsoAgroBotIa_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
