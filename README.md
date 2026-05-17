# AgroManager AR 🌱

ERP agrícola integral para el mercado argentino. Gestión de campos, cultivos, ganadería, tareas, finanzas y campañas desde una sola plataforma, con asistente de IA incluido.

**Demo en vivo → [agromanager-ar.vercel.app](https://agro-manager-ar-px8f.vercel.app/login)**

> **Cuenta demo:** `demo@agromanager.ar` / `Demo1234`
>
> **Administrador:** `joaquingsabater@gmail.com` / `Jsadmin1234`

---

## Stack

| Capa | Tecnología |
|---|---|
| Backend | NestJS 11 + TypeScript |
| Base de datos | PostgreSQL (Neon) |
| ORM | Prisma 5 |
| Autenticación | JWT 7 días + Passport |
| Frontend | React 19 + TypeScript + Vite |
| Estilos | Tailwind CSS v4 |
| Estado global | Zustand |
| HTTP / Cache | Axios + TanStack Query |
| IA | Google Gemini (gemini-2.5-flash-lite) |
| Clima | Open-Meteo API (sin key) |
| Mapa | React-Leaflet + OpenStreetMap |
| Gráficos | Recharts |
| Deploy backend | Railway |
| Deploy frontend | Vercel |

---

## Módulos

| Módulo | Funcionalidad |
|---|---|
| **Dashboard** | Resumen general, strip de clima, insights de IA |
| **Campos** | Establecimientos y lotes con hectáreas |
| **Cultivos** | Catálogo de tipos de cultivo |
| **Siembras** | Ciclo siembra → cosecha → aplicación de insumos |
| **Insumos** | Fertilizantes, herbicidas, fungicidas |
| **Ganadería** | Rodeo, preñeces, registro de pesos |
| **Tareas** | Planificación y seguimiento de tareas rurales |
| **Finanzas** | Ingresos, egresos y balance anual |
| **Campañas** | Agrupación de siembras por campaña agrícola |
| **Rentabilidad** | Análisis de margen por cultivo / campo |
| **Clima** | Mapa interactivo de Argentina con 15 regiones agrícolas y pronóstico 7 días |
| **AgroBot** | Chat IA flotante con contexto del establecimiento del usuario |

---

## Estructura del proyecto

\`\`\`
AgroManagerAr/
├── backend/                    # API REST — NestJS
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/         # 4 migraciones aplicadas
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── auth/               # JWT register + login
│       ├── prisma/             # PrismaService global
│       ├── ai/                 # AgroBot (Gemini)
│       ├── campos/
│       ├── cultivos/
│       ├── siembras/
│       ├── insumos/
│       ├── ganado/
│       ├── tareas/
│       ├── finanzas/
│       └── campanias/
│
└── frontend/                   # SPA — React + Vite
    └── src/
        ├── api/                # Axios client + endpoints por módulo
        ├── store/              # Zustand (auth)
        ├── components/
        │   ├── layout/         # Layout, Sidebar, PrivateRoute
        │   └── ui/             # AiChat, AiInsights, modales, etc.
        └── pages/              # Una carpeta por módulo
\`\`\`

---

## Correr en local

### Requisitos
- Node.js 18+
- PostgreSQL o cuenta en [neon.tech](https://neon.tech)
- API key de [Google AI Studio](https://aistudio.google.com)

### Backend

\`\`\`bash
cd backend
npm install

# Crear backend/.env con:
# DATABASE_URL="postgresql://..."
# JWT_SECRET="tu_secreto"
# JWT_EXPIRATION="7d"
# PORT=3001
# GEMINI_API_KEY="tu_key"

npx prisma migrate deploy
npx prisma db seed      # carga usuario demo + datos de ejemplo
npm run start:dev       # http://localhost:3001/api
\`\`\`

### Frontend

\`\`\`bash
cd frontend
npm install

# Crear frontend/.env con:
# VITE_API_URL=http://localhost:3001/api

npm run dev             # http://localhost:5174
\`\`\`

### Usuario demo
| Campo | Valor |
|---|---|
| Email | demo@agromanager.ar |
| Contraseña | Demo1234 |

---

## API Endpoints principales

Todos los endpoints (salvo /auth) requieren Authorization: Bearer <token>.

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/auth/register | Registro |
| POST | /api/auth/login | Login → JWT |
| GET | /api/auth/me | Perfil autenticado |
| GET/POST | /api/campos | Campos del usuario |
| POST | /api/campos/:id/lotes | Crear lote |
| GET/POST | /api/siembras | Siembras |
| POST | /api/siembras/:id/cosechas | Registrar cosecha |
| POST | /api/siembras/:id/aplicaciones | Aplicar insumo |
| GET/POST | /api/ganado | Animales |
| POST | /api/ganado/:id/pesos | Registrar peso |
| GET/POST | /api/tareas | Tareas rurales |
| GET/POST | /api/finanzas | Movimientos financieros |
| GET | /api/finanzas/resumen | Balance del año |
| GET/POST | /api/campanias | Campañas agrícolas |
| POST | /api/ai/chat | Chat con AgroBot |
| GET | /api/ai/insights | Insights automáticos del establecimiento |

---

## Deploy

### Backend → Railway

Variables de entorno requeridas en Railway:

\`\`\`
DATABASE_URL=       # Neon connection string
JWT_SECRET=
JWT_EXPIRATION=7d
PORT=3001
FRONTEND_URL=       # URL de Vercel (sin trailing slash)
GEMINI_API_KEY=
\`\`\`

El archivo railway.json ya configura build y start automáticamente.

### Frontend → Vercel

Variables de entorno requeridas en Vercel:

\`\`\`
VITE_API_URL=       # URL del backend Railway + /api
\`\`\`

El archivo vercel.json ya configura el rewrite para SPA.

---

## Base de datos

4 migraciones en producción (Neon PostgreSQL):

\`\`\`
Usuario → Campo → Lote → Siembra → Cosecha
                                 ↘ AplicacionInsumo ← Insumo
Usuario → Animal → Prenez
                 → PesoAnimal
Usuario → TareaRural → Campo
Usuario → MovimientoFinanciero
Usuario → Campania → Siembra
\`\`\`

---

## Notas técnicas

- **AgroBot** consulta campos, siembras, animales, tareas y finanzas del usuario antes de cada respuesta para dar contexto personalizado.
- **Clima** usa Open-Meteo (gratuito, sin key) con 15 regiones agrícolas de Argentina predefinidas.
- **CORS** acepta localhost:5173 y localhost:5174 en dev; en prod se sobreescribe con FRONTEND_URL.
