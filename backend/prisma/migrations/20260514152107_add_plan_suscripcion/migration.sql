-- CreateEnum
CREATE TYPE "PlanTipo" AS ENUM ('FREE', 'PRO');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "mpSuscripcionId" TEXT,
ADD COLUMN     "plan" "PlanTipo" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "planExpira" TIMESTAMP(3);
