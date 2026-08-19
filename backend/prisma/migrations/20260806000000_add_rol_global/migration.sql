-- AddColumn rolGlobal to Usuario
ALTER TABLE "Usuario" ADD COLUMN "rolGlobal" TEXT NOT NULL DEFAULT 'USER';
