# Evidencias en Cloudflare R2

El bucket de evidencias debe mantenerse privado. La API entrega URLs firmadas de corta duración para subir y leer archivos; no configurar un dominio público para este bucket.

## Variables requeridas

Configurar en el backend:

```env
R2_ACCOUNT_ID="tu-account-id"
R2_ACCESS_KEY_ID="tu-access-key-id"
R2_SECRET_ACCESS_KEY="tu-secret-access-key"
R2_BUCKET_NAME="agromanager-evidencias"
R2_ENDPOINT="https://tu-account-id.r2.cloudflarestorage.com"
R2_SIGNED_URL_EXPIRES_SECONDS=900
```

Crear un token de API de R2 limitado al bucket elegido, con los permisos `Object Read` y `Object Write`.

## CORS del bucket

Para que la web pueda usar las URLs firmadas, agregar una regla CORS al bucket y reemplazar los orígenes por los dominios reales del frontend:

```json
[
  {
    "AllowedOrigins": ["https://tu-frontend.com", "http://localhost:5173"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Expo/React Native no necesita CORS, pero sí utiliza las mismas URLs firmadas. Las imágenes se suben directamente a R2 y el backend solo conserva metadatos y permisos.
