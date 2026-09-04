CREATE TABLE "Notificacion" (
    "id" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "enlace" TEXT,
    "dedupeKey" TEXT,
    "leidaEn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Notificacion_dedupeKey_key" ON "Notificacion"("dedupeKey");
CREATE INDEX "Notificacion_usuarioId_leidaEn_createdAt_idx" ON "Notificacion"("usuarioId", "leidaEn", "createdAt");

ALTER TABLE "Notificacion"
ADD CONSTRAINT "Notificacion_usuarioId_fkey"
FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
