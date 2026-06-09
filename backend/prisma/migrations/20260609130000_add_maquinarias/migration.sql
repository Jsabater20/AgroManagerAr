-- CreateEnum
CREATE TYPE "TipoMaquinaria" AS ENUM ('TRACTOR', 'SEMBRADORA', 'PULVERIZADORA', 'COSECHADORA', 'CAMIONETA', 'MIXER', 'ACOPLADO', 'TOLVA', 'HERRAMIENTA', 'OTRO');
CREATE TYPE "EstadoMaquinaria" AS ENUM ('OPERATIVA', 'EN_MANTENIMIENTO', 'FUERA_DE_SERVICIO');
CREATE TYPE "TipoMantenimiento" AS ENUM ('CAMBIO_ACEITE', 'REVISION_GENERAL', 'REPARACION', 'OTRO');
CREATE TYPE "TipoGastoMaq" AS ENUM ('COMBUSTIBLE', 'REPARACION', 'REPUESTO', 'SERVICIO', 'SEGURO', 'OTRO');

-- CreateTable Maquinaria
CREATE TABLE "Maquinaria" (
    "id"                SERIAL            NOT NULL,
    "usuarioId"         INTEGER           NOT NULL,
    "campoId"           INTEGER,
    "nombre"            TEXT              NOT NULL,
    "tipo"              "TipoMaquinaria"  NOT NULL,
    "marca"             TEXT,
    "modelo"            TEXT,
    "anio"              INTEGER,
    "patente"           TEXT,
    "estado"            "EstadoMaquinaria" NOT NULL DEFAULT 'OPERATIVA',
    "horasUso"          DOUBLE PRECISION,
    "seguroVencimiento" TIMESTAMP(3),
    "vtvVencimiento"    TIMESTAMP(3),
    "observaciones"     TEXT,
    "createdAt"         TIMESTAMP(3)      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"         TIMESTAMP(3)      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Maquinaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable MantenimientoMaquinaria
CREATE TABLE "MantenimientoMaquinaria" (
    "id"                   SERIAL              NOT NULL,
    "maquinariaId"         INTEGER             NOT NULL,
    "tipo"                 "TipoMantenimiento" NOT NULL,
    "descripcion"          TEXT,
    "fecha"                TIMESTAMP(3)        NOT NULL,
    "horasUso"             DOUBLE PRECISION,
    "costo"                DOUBLE PRECISION,
    "proximoMantenimiento" TIMESTAMP(3),
    "observaciones"        TEXT,
    "createdAt"            TIMESTAMP(3)        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"            TIMESTAMP(3)        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MantenimientoMaquinaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable GastoMaquinaria
CREATE TABLE "GastoMaquinaria" (
    "id"           SERIAL          NOT NULL,
    "maquinariaId" INTEGER         NOT NULL,
    "tipo"         "TipoGastoMaq"  NOT NULL,
    "descripcion"  TEXT            NOT NULL,
    "monto"        DOUBLE PRECISION NOT NULL,
    "fecha"        TIMESTAMP(3)    NOT NULL,
    "observaciones" TEXT,
    "createdAt"    TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GastoMaquinaria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Maquinaria" ADD CONSTRAINT "Maquinaria_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Maquinaria" ADD CONSTRAINT "Maquinaria_campoId_fkey"
    FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MantenimientoMaquinaria" ADD CONSTRAINT "MantenimientoMaquinaria_maquinariaId_fkey"
    FOREIGN KEY ("maquinariaId") REFERENCES "Maquinaria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GastoMaquinaria" ADD CONSTRAINT "GastoMaquinaria_maquinariaId_fkey"
    FOREIGN KEY ("maquinariaId") REFERENCES "Maquinaria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
