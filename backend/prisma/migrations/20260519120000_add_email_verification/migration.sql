-- AddColumn emailVerificado y emailVerifToken a Usuario
ALTER TABLE "Usuario" ADD COLUMN "emailVerificado" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Usuario" ADD COLUMN "emailVerifToken" TEXT;

-- Usuarios existentes quedan verificados automáticamente
UPDATE "Usuario" SET "emailVerificado" = true;
