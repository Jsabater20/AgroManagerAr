ALTER TYPE "CategoriaNovedadProducto" ADD VALUE IF NOT EXISTS 'ACTUALIZACION';
ALTER TYPE "CategoriaNovedadProducto" ADD VALUE IF NOT EXISTS 'ARREGLOS';
ALTER TYPE "CategoriaNovedadProducto" ADD VALUE IF NOT EXISTS 'PROMOCION';

UPDATE "NovedadProducto"
SET "categoria" = 'FUNCIONALIDAD'
WHERE "categoria" IN ('CLIMA', 'ALERTAS', 'AGROBOT', 'REPORTES', 'EMPRESAS');

UPDATE "NovedadProducto"
SET "categoria" = 'GENERAL'
WHERE "categoria" = 'SEGURIDAD';
