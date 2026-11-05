ALTER TYPE "TipoRecursoEvidencia" ADD VALUE IF NOT EXISTS 'CHECKLIST_HIDRICO';

CREATE TYPE "EstadoChecklistPreventivoHidrico" AS ENUM ('PENDIENTE', 'COMPLETADO');
CREATE TYPE "CategoriaChecklistPreventivoHidrico" AS ENUM (
  'DRENAJE',
  'ACCESO',
  'INFRAESTRUCTURA',
  'GANADERIA',
  'MAQUINARIA_E_INSUMOS',
  'GENERAL'
);

CREATE TABLE "ChecklistPreventivoHidrico" (
  "id" SERIAL NOT NULL,
  "organizacionId" INTEGER NOT NULL,
  "campoId" INTEGER NOT NULL,
  "titulo" TEXT NOT NULL,
  "descripcion" TEXT,
  "categoria" "CategoriaChecklistPreventivoHidrico" NOT NULL DEFAULT 'GENERAL',
  "responsableId" INTEGER,
  "fechaLimite" TIMESTAMP(3),
  "estado" "EstadoChecklistPreventivoHidrico" NOT NULL DEFAULT 'PENDIENTE',
  "completadoEn" TIMESTAMP(3),
  "completadoPorId" INTEGER,
  "creadoPorId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ChecklistPreventivoHidrico_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ChecklistPreventivoHidrico_organizacionId_campoId_estado_fechaLimite_idx"
  ON "ChecklistPreventivoHidrico"("organizacionId", "campoId", "estado", "fechaLimite");
CREATE INDEX "ChecklistPreventivoHidrico_responsableId_estado_fechaLimite_idx"
  ON "ChecklistPreventivoHidrico"("responsableId", "estado", "fechaLimite");

ALTER TABLE "ChecklistPreventivoHidrico"
  ADD CONSTRAINT "ChecklistPreventivoHidrico_organizacionId_fkey"
  FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ChecklistPreventivoHidrico"
  ADD CONSTRAINT "ChecklistPreventivoHidrico_campoId_fkey"
  FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ChecklistPreventivoHidrico"
  ADD CONSTRAINT "ChecklistPreventivoHidrico_responsableId_fkey"
  FOREIGN KEY ("responsableId") REFERENCES "UsuarioOrganizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ChecklistPreventivoHidrico"
  ADD CONSTRAINT "ChecklistPreventivoHidrico_completadoPorId_fkey"
  FOREIGN KEY ("completadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ChecklistPreventivoHidrico"
  ADD CONSTRAINT "ChecklistPreventivoHidrico_creadoPorId_fkey"
  FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
