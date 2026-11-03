ALTER TABLE "Usuario"
  ADD COLUMN "recibeComunicaciones" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "comunicacionesConsentidasEn" TIMESTAMP(3),
  ADD COLUMN "preferenciasComunicacionesActualizadasEn" TIMESTAMP(3);
