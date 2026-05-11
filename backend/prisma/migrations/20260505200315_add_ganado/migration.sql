-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('BOVINO', 'PORCINO', 'EQUINO', 'OVINO', 'CAPRINO', 'AVIAR');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'HEMBRA');

-- CreateEnum
CREATE TYPE "CategoriaAnimal" AS ENUM ('VACA', 'VAQUILLONA', 'TERNERA', 'TORO', 'NOVILLO', 'TERNERO', 'CERDA', 'VERRACO', 'LECHON', 'YEGUA', 'POTRANCA', 'PADRILLO', 'POTRO', 'OVEJA', 'BORREGA', 'CARNERO', 'CORDERO', 'CABRA', 'CABRIO', 'CABRITO', 'GALLINA', 'GALLO', 'POLLO', 'POLLA');

-- CreateEnum
CREATE TYPE "EstadoPrenez" AS ENUM ('EN_CURSO', 'COMPLETADA', 'PERDIDA');

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" "Especie" NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "categoria" "CategoriaAnimal" NOT NULL,
    "peso" DOUBLE PRECISION,
    "fechaNacimiento" TIMESTAMP(3),
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prenez" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaEstimadaParto" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoPrenez" NOT NULL DEFAULT 'EN_CURSO',
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prenez_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prenez" ADD CONSTRAINT "Prenez_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
