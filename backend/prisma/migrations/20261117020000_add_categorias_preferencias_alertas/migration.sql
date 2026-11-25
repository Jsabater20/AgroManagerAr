ALTER TABLE "PreferenciaAlerta"
  ADD COLUMN "alertasTareasActivas" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "alertasMaquinariasActivas" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "alertasCostosActivas" BOOLEAN NOT NULL DEFAULT true;
