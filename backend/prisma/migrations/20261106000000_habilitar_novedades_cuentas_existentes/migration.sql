-- Las cuentas existentes recibirán la primera comunicación de novedades.
-- Cada destinatario podrá dejar de recibirlas desde el enlace incluido en el email.
-- No se registra un consentimiento histórico que la cuenta no haya confirmado.
UPDATE "Usuario"
SET
  "recibeNovedades" = true,
  "recibeComunicaciones" = true
WHERE "recibeNovedades" = false;
