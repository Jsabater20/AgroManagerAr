CREATE TYPE "TipoEventoAgroManagerDigital" AS ENUM (
    'VISITA',
    'CLICK_PRESUPUESTO',
    'CLICK_WHATSAPP',
    'FORMULARIO_INICIADO',
    'FORMULARIO_ENVIADO'
);

CREATE TABLE "EventoAgroManagerDigital" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoEventoAgroManagerDigital" NOT NULL,
    "origen" VARCHAR(120),
    "medio" VARCHAR(120),
    "campania" VARCHAR(120),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventoAgroManagerDigital_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "EventoAgroManagerDigital_tipo_createdAt_idx" ON "EventoAgroManagerDigital"("tipo", "createdAt");
CREATE INDEX "EventoAgroManagerDigital_origen_createdAt_idx" ON "EventoAgroManagerDigital"("origen", "createdAt");
CREATE INDEX "EventoAgroManagerDigital_campania_createdAt_idx" ON "EventoAgroManagerDigital"("campania", "createdAt");
