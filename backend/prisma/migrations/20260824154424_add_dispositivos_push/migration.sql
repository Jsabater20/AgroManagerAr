-- CreateTable
CREATE TABLE "DispositivoPush" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "expoPushToken" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DispositivoPush_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DispositivoPush_expoPushToken_key" ON "DispositivoPush"("expoPushToken");

-- CreateIndex
CREATE INDEX "DispositivoPush_usuarioId_idx" ON "DispositivoPush"("usuarioId");

-- AddForeignKey
ALTER TABLE "DispositivoPush" ADD CONSTRAINT "DispositivoPush_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
