-- Las evidencias de demostracion pueden referenciar una imagen publica sin almacenarla en R2.
ALTER TABLE "ArchivoEvidencia" ADD COLUMN "urlExterna" TEXT;
