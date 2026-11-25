CREATE TYPE "EstadoSolicitudDigital" AS ENUM ('NUEVA', 'CONTACTADO', 'EN_EVALUACION', 'PRESUPUESTO_ENVIADO', 'EN_NEGOCIACION', 'PROYECTO_CONFIRMADO', 'EN_DESARROLLO', 'FINALIZADO', 'ARCHIVADO');

CREATE TABLE "SolicitudAgroManagerDigital" (
  "id" SERIAL NOT NULL,
  "nombre" TEXT NOT NULL,
  "establecimiento" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "telefono" TEXT NOT NULL,
  "provincia" TEXT NOT NULL,
  "localidad" TEXT NOT NULL,
  "actividad" TEXT NOT NULL,
  "servicio" TEXT NOT NULL,
  "tieneSitioWeb" BOOLEAN NOT NULL,
  "descripcion" TEXT NOT NULL,
  "presupuesto" TEXT,
  "fechaInicio" TEXT,
  "comentarios" TEXT,
  "consienteContacto" BOOLEAN NOT NULL DEFAULT false,
  "estado" "EstadoSolicitudDigital" NOT NULL DEFAULT 'NUEVA',
  "observacionesInternas" TEXT,
  "presupuestoEnviado" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SolicitudAgroManagerDigital_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SeguimientoSolicitudDigital" (
  "id" SERIAL NOT NULL,
  "solicitudId" INTEGER NOT NULL,
  "administrador" TEXT NOT NULL,
  "detalle" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SeguimientoSolicitudDigital_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SolicitudAgroManagerDigital_estado_createdAt_idx" ON "SolicitudAgroManagerDigital"("estado", "createdAt");
CREATE INDEX "SolicitudAgroManagerDigital_email_idx" ON "SolicitudAgroManagerDigital"("email");
CREATE INDEX "SeguimientoSolicitudDigital_solicitudId_createdAt_idx" ON "SeguimientoSolicitudDigital"("solicitudId", "createdAt");
ALTER TABLE "SeguimientoSolicitudDigital" ADD CONSTRAINT "SeguimientoSolicitudDigital_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "SolicitudAgroManagerDigital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
