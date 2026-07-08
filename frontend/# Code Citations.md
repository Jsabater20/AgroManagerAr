# Code Citations

## License: unknown
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hect
```


## License: unknown
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hect
```


## License: unknown
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hect
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type T
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type T
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Esp
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Esp
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Esp
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir: RepetirTarea;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type T
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir: RepetirTarea;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type T
```


## License: Apache-2.0
https://github.com/enonic/app-metafields/blob/f7f9c6c521be2b40c537512a42cbe1501ef0a0a7/src/main/resources/lib/app-metafields/types/index.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir: RepetirTarea;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type T
```


## License: unknown
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir: RepetirTarea;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type TipoMovimiento = 'INGRESO' | 'EGRESO';

export type CategoriaMovimiento =
  | 'COSECHA' | 'VENTA_ANIMAL' | 'INSUMO' | 'SERVICIO'
  | 'MANTENIMIENTO' | 'VETERINARIA' | 'COMBUSTIBLE' | 'MANO_DE_OBRA' | 'OTRO';

export interface MovimientoFinanciero {
  id: number;
  usuarioId: number;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
  createdAt: string;
  campo?: { id: number; nombre: string };
}

export interface CreateMovimientoDto {
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
}

export interface ResumenFinanciero {
  ingresos: number;
  egresos: number;
  saldo: number;
}

// ─── Campañas ─────────────────────────────────────────────────────────────────

export interface Camp
```


## License: unknown
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir: RepetirTarea;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type TipoMovimiento = 'INGRESO' | 'EGRESO';

export type CategoriaMovimiento =
  | 'COSECHA' | 'VENTA_ANIMAL' | 'INSUMO' | 'SERVICIO'
  | 'MANTENIMIENTO' | 'VETERINARIA' | 'COMBUSTIBLE' | 'MANO_DE_OBRA' | 'OTRO';

export interface MovimientoFinanciero {
  id: number;
  usuarioId: number;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
  createdAt: string;
  campo?: { id: number; nombre: string };
}

export interface CreateMovimientoDto {
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
}

export interface ResumenFinanciero {
  ingresos: number;
  egresos: number;
  saldo: number;
}

// ─── Campañas ─────────────────────────────────────────────────────────────────

export interface Camp
```


## License: unknown
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

```
Perfecto. **¡Todos los archivos ya están actualizados!** ✅

- ✅ **auth.store.ts** - Tiene `organizacionId`, `setOrganizacionId()`, `setOrganizaciones()`
- ✅ **client.ts** - Pasa `organizacionId` en query params automáticamente
- ✅ **organizations.api.ts** - Existe con todos los endpoints
- ✅ **types.ts** - Actualizado con `Organizacion` y `MiembroOrganizacion`

Aquí va el **types.ts completo actualizado:**

```typescript
// ─── Organizaciones ───────────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir: RepetirTarea;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type TipoMovimiento = 'INGRESO' | 'EGRESO';

export type CategoriaMovimiento =
  | 'COSECHA' | 'VENTA_ANIMAL' | 'INSUMO' | 'SERVICIO'
  | 'MANTENIMIENTO' | 'VETERINARIA' | 'COMBUSTIBLE' | 'MANO_DE_OBRA' | 'OTRO';

export interface MovimientoFinanciero {
  id: number;
  usuarioId: number;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
  createdAt: string;
  campo?: { id: number; nombre: string };
}

export interface CreateMovimientoDto {
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
}

export interface ResumenFinanciero {
  ingresos: number;
  egresos: number;
  saldo: number;
}

// ─── Campañas ─────────────────────────────────────────────────────────────────

export interface Camp
```

