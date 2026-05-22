# AgroManager AR 🌱

ERP agrícola integral para el mercado argentino. Gestión de campos, cultivos, ganadería, tareas, finanzas y campañas desde una sola plataforma, con asistente de IA incluido.

**Demo en vivo → [agromanagerar.com](https://www.agromanagerar.com)**

> **Cuenta demo:** `demo@agromanager.ar` / `Demo1234`

---

## Stack

| Capa | Tecnología |
|---|---|
| Backend | NestJS 11 + TypeScript |
| Base de datos | PostgreSQL (Neon) |
| ORM | Prisma 5 |
| Autenticación | JWT 7 días + Passport |
| Rate limiting | `@nestjs/throttler` (global + por ruta) |
| Emails | Resend (verificación, reset, contacto) |
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

### App pública
| Página | Descripción |
|---|---|
| **Home** | Landing page con features y CTA |
| **Precios** | Planes FREE y PRO |
| **Contacto** | Formulario con envío de email directo vía Resend |
| **Sobre nosotros** | Información del proyecto |
| **Legal** | Términos y privacidad |

### App privada (requiere login)
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
| **Perfil** | Edición de datos y cambio de contraseña |
| **AgroBot** | Chat IA flotante con contexto del establecimiento del usuario |
| **Admin** | Panel de administración de usuarios (solo rol ADMIN) |

---

## Autenticación

El flujo completo de auth incluye:

- **Registro** → envía email de verificación (Resend)
- **Verificación de email** → activa la cuenta (`/verify-email?token=...`)
- **Login** → devuelve JWT (7 días)
- **Olvidé mi contraseña** → envía link de reset con token SHA-256 (expira en 1 hora)
- **Reset de contraseña** → actualiza password y marca email como verificado
- **Perfil** → `GET /api/auth/me` con JWT

Rate limits por ruta:
| Ruta | Límite |
|---|---|
| `POST /auth/register` | 5 req / 60 s |
| `POST /auth/login` | 10 req / 60 s |
| `POST /auth/forgot-password` | 3 req / 60 s |
| `POST /auth/reset-password` | 5 req / 60 s |
| Global | 100 req / 60 s |

---

## Planes

| Plan | Acceso |
|---|---|
| **FREE** | Módulos básicos con límites |
| **PRO** | Acceso completo a todos los módulos |

El plan del usuario se persiste en la BD (`PlanTipo` enum) y se hidrata en el cliente desde `/api/auth/me` al iniciar sesión.

---

## Estructura del proyecto

```
AgroManagerAr/
├── backend/                    # API REST — NestJS
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/         # 6 migraciones aplicadas
│   └── src/
│       ├── main.ts
│       ├── app.controller.ts   # GET /health + POST /contact
│       ├── app.service.ts      # sendContactEmail (Resend)
│       ├── app.module.ts
│       ├── auth/               # JWT + email verify + forgot/reset password
│       ├── prisma/             # PrismaService global
│       ├── ai/                 # AgroBot (Gemini)
│       ├── plan/               # Gestión de planes de suscripción
│       ├── users/              # Perfil + admin de usuarios
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
        ├── store/              # Zustand (auth con hidratación)
        ├── components/
        │   ├── layout/         # Layout, Sidebar, PrivateRoute (con spinner de hidratación)
        │   └── ui/             # AiChat, AiInsights, modales, etc.
        └── pages/              # Una carpeta por módulo
            ├── home/           # Landing pública
            ├── auth/           # Login, Register, ForgotPassword, ResetPassword, VerifyEmail
            ├── precios/        # Planes FREE/PRO
            ├── contacto/       # Formulario de contacto
            ├── sobre-nosotros/
            ├── legal/
            └── [módulos privados]/
```

---

## Correr en local

### Requisitos
- Node.js 18+
- PostgreSQL o cuenta en [neon.tech](https://neon.tech)
- API key de [Google AI Studio](https://aistudio.google.com)
- Cuenta en [Resend](https://resend.com) con dominio verificado (para emails)

### Backend

```bash
cd backend
npm install

# Crear backend/.env con:
DATABASE_URL="postgresql://..."
JWT_SECRET="tu_secreto"
JWT_EXPIRATION="7d"
PORT=3001
FRONTEND_URL="http://localhost:5174"
GEMINI_API_KEY="tu_key"
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@tudominio.com"
CONTACT_EMAIL="tu_email@gmail.com"

npx prisma migrate deploy
npx prisma db seed      # carga usuario demo + datos de ejemplo
npm run start:dev       # http://localhost:3001/api
```

### Frontend

```bash
cd frontend
npm install

# Crear frontend/.env con:
VITE_API_URL=http://localhost:3001/api

npm run dev             # http://localhost:5174
```

### Usuario demo
| Campo | Valor |
|---|---|
| Email | demo@agromanager.ar |
| Contraseña | Demo1234 |

---

## API Endpoints principales

Todos los endpoints (salvo `/auth` y `/contact`) requieren `Authorization: Bearer <token>`.

### Auth
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registro + email de verificación |
| POST | `/api/auth/login` | Login → JWT |
| GET | `/api/auth/verify?token=` | Verificar email |
| POST | `/api/auth/forgot-password` | Envía link de reset |
| POST | `/api/auth/reset-password` | Actualiza contraseña |
| GET | `/api/auth/me` | Perfil autenticado |

### App
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Formulario de contacto (público) |
| GET/POST | `/api/campos` | Campos del usuario |
| POST | `/api/campos/:id/lotes` | Crear lote |
| GET/POST | `/api/siembras` | Siembras |
| POST | `/api/siembras/:id/cosechas` | Registrar cosecha |
| POST | `/api/siembras/:id/aplicaciones` | Aplicar insumo |
| GET/POST | `/api/ganado` | Animales |
| POST | `/api/ganado/:id/pesos` | Registrar peso |
| GET/POST | `/api/tareas` | Tareas rurales |
| GET/POST | `/api/finanzas` | Movimientos financieros |
| GET | `/api/finanzas/resumen` | Balance del año |
| GET/POST | `/api/campanias` | Campañas agrícolas |
| POST | `/api/ai/chat` | Chat con AgroBot |
| GET | `/api/ai/insights` | Insights automáticos del establecimiento |
| GET | `/api/users/profile` | Perfil del usuario |
| PATCH | `/api/users/profile` | Actualizar perfil |
| GET | `/api/users/admin/all` | Listar usuarios (ADMIN) |

---

## Deploy

### Backend → Railway

Variables de entorno requeridas en Railway:

```
DATABASE_URL=           # Neon connection string
JWT_SECRET=
JWT_EXPIRATION=7d
PORT=3001
FRONTEND_URL=           # https://www.agromanagerar.com
GEMINI_API_KEY=
RESEND_API_KEY=         # API key de Resend
RESEND_FROM_EMAIL=      # noreply@tudominio.com (dominio verificado en Resend)
CONTACT_EMAIL=          # Email donde llegan los mensajes del formulario de contacto
```

El archivo `railway.json` ya configura build y start automáticamente.

### Frontend → Vercel

Variables de entorno requeridas en Vercel:

```
VITE_API_URL=           # https://api.agromanagerar.com/api
```

El archivo `vercel.json` ya configura el rewrite para SPA.

---

## Base de datos

6 migraciones en producción (Neon PostgreSQL):

```
Usuario → Campo → Lote → Siembra → Cosecha
                                 ↘ AplicacionInsumo ← Insumo
Usuario → Animal → Prenez
                 → PesoAnimal (RegistroPeso)
Usuario → TareaRural → Campo
Usuario → MovimientoFinanciero
Usuario → Campania → Siembra
```

Campos en `Usuario`: `email`, `nombre`, `password`, `rol` (ADMIN/OPERADOR), `plan` (FREE/PRO), `planExpira`, `resetToken`, `resetTokenExpiry`, `emailVerificado`, `emailVerifToken`.

---

## Notas técnicas

- **AgroBot** consulta campos, siembras, animales, tareas y finanzas del usuario antes de cada respuesta para dar contexto personalizado.
- **Clima** usa Open-Meteo (gratuito, sin key) con 15 regiones agrícolas de Argentina predefinidas.
- **Emails** se envían vía Resend HTTP API (no SMTP). Railway bloquea conexiones SMTP salientes.
- **Hidratación de auth**: al montar la app, si hay token en localStorage se hace `GET /api/auth/me` para restaurar el perfil completo (plan, rol, nombre). `PrivateRoute` muestra spinner durante la hidratación.
- **CORS** acepta localhost:5173 y localhost:5174 en dev; en prod se sobreescribe con `FRONTEND_URL`.
- **Rate limiting** con `@nestjs/throttler`: global 100 req/min, con límites más estrictos en rutas de auth.


