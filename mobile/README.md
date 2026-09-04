# AgroManager AR Mobile

## Etapa 4: contexto organizacional

La organización activa se elige explícitamente y se conserva en la sesión. Para miembros, la app obtiene la membresía actual desde el backend y muestra solo los módulos habilitados. El plan visible se toma de la organización; la cuenta demo y la cuenta administradora protegida se mantienen en Pro desde el backend.

Aplicación Expo conectada al backend actual de AgroManager AR.

## Inicio

1. Copiá `.env.example` como `.env`.
2. En un teléfono físico, configurá `EXPO_PUBLIC_API_URL` con la IP LAN de la computadora que ejecuta el backend.
3. Instalá dependencias con `npm install`.
4. Ejecutá `npm start` y abrí el proyecto desde Expo Go.

La primera etapa incluye Expo Router, login real, sesión persistida en SecureStore, cliente Axios autenticado y selección explícita de organización.

La segunda etapa incorpora timeout, manejo uniforme de errores, cierre de sesión ante token vencido y comprobación de conectividad con `GET /api/health`.

La tercera etapa completa la autenticación: validación con React Hook Form y Zod, contraseña visible bajo demanda, recuperación por email y revalidación del perfil al restaurar una sesión guardada.
