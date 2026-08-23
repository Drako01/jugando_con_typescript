# 05 — Utility Types, async y APIs tipadas

> Objetivo: reutilizar contratos sin duplicación y tratar correctamente datos asíncronos y externos.

## Utility Types

Supongamos:

```ts
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
  createdAt: Date;
}
```

## `Partial<T>`

```ts
type UpdateUsuario = Partial<Usuario>;
```

Todas las propiedades pasan a ser opcionales.

Útil para patches, pero no siempre representa correctamente reglas de negocio. Un DTO explícito puede ser mejor cuando sólo ciertos campos son editables.

## `Required<T>`

```ts
type UsuarioCompleto = Required<Usuario>;
```

Convierte propiedades opcionales en requeridas.

## `Readonly<T>`

```ts
type UsuarioSnapshot = Readonly<Usuario>;
```

Impide reasignaciones directas a propiedades a través de ese tipo.

## `Pick<T, K>`

```ts
type UsuarioPreview = Pick<Usuario, "id" | "nombre">;
```

## `Omit<T, K>`

```ts
type CrearUsuario = Omit<Usuario, "id" | "createdAt">;
```

Muy útil para derivar DTOs simples.

## `Record<K, T>`

```ts
type Rol = "admin" | "user" | "support";

type Permisos = Record<Rol, string[]>;
```

Garantiza una entrada para cada clave de la union.

## `Exclude` y `Extract`

```ts
type Estado = "draft" | "published" | "archived";

type Visible = Exclude<Estado, "archived">;
type Final = Extract<Estado, "published" | "archived">;
```

## `NonNullable<T>`

```ts
type Valor = string | null | undefined;
type Seguro = NonNullable<Valor>; // string
```

## `ReturnType<T>`

```ts
function crearConfig() {
  return {
    host: "localhost",
    port: 3000
  };
}

type Config = ReturnType<typeof crearConfig>;
```

## `Parameters<T>`

```ts
function enviar(to: string, subject: string) {}

type Args = Parameters<typeof enviar>;
// [to: string, subject: string]
```

## Promises

```ts
async function obtenerUsuario(id: number): Promise<Usuario> {
  // ...
  throw new Error("Ejemplo");
}
```

Toda función `async` devuelve un `Promise`.

## Resultado nullable

Si puede no existir:

```ts
async function findById(id: number): Promise<Usuario | null> {
  return null;
}
```

El contrato obliga al consumidor a contemplarlo.

## APIs y `fetch`

```ts
const response = await fetch("/api/users/1");
const data = await response.json();
```

`response.json()` recibe información externa. No deberíamos asumir que coincide con nuestro tipo.

Esto es engañoso:

```ts
const user = (await response.json()) as Usuario;
```

`as` no valida nada.

## Runtime validation

Una estrategia manual:

```ts
function isUsuario(value: unknown): value is Usuario {
  if (typeof value !== "object" || value === null) return false;

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "nombre" in value &&
    typeof value.nombre === "string"
  );
}
```

Uso:

```ts
const data: unknown = await response.json();

if (!isUsuario(data)) {
  throw new Error("Respuesta inválida");
}

// data es Usuario aquí
```

Para esquemas grandes conviene una librería de validación runtime o un contrato compartido generado a partir de una fuente formal.

## Result pattern

En vez de lanzar excepciones para todos los casos esperables:

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

Ejemplo:

```ts
async function cargarUsuario(id: number): Promise<Result<Usuario>> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      return { ok: false, error: new Error("HTTP error") };
    }

    const data: unknown = await response.json();

    if (!isUsuario(data)) {
      return { ok: false, error: new Error("Invalid payload") };
    }

    return { ok: true, value: data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error : new Error("Unknown error")
    };
  }
}
```

## `unknown` en `catch`

No asumir que todo lo lanzado es `Error`:

```ts
try {
  // ...
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

## DTOs

Separar entidad y contratos de transporte suele evitar acoplamiento.

```ts
interface UsuarioDTO {
  id: number;
  name: string;
  created_at: string;
}

interface Usuario {
  id: number;
  nombre: string;
  createdAt: Date;
}
```

Mapper:

```ts
function mapUsuario(dto: UsuarioDTO): Usuario {
  return {
    id: dto.id,
    nombre: dto.name,
    createdAt: new Date(dto.created_at)
  };
}
```

Una fecha JSON llega como string. El tipo de dominio puede convertirla a `Date` explícitamente.

## Typed API client

```ts
interface ApiClient {
  get<T>(path: string): Promise<T>;
}
```

Esta abstracción mejora ergonomía, pero el generic `T` tampoco valida el servidor. La validación debe ubicarse en el boundary apropiado.

## Tipar errores de dominio

```ts
type CrearUsuarioError =
  | { code: "EMAIL_EXISTS" }
  | { code: "INVALID_EMAIL"; value: string }
  | { code: "NETWORK_ERROR"; cause: Error };
```

Esto da al consumidor una API exhaustiva y autodescriptiva.

## Regla clave

```text
TypeScript = confianza dentro del programa
Validación runtime = confianza en los bordes del programa
```

Los bordes incluyen:

- APIs;
- DB;
- localStorage;
- variables de entorno;
- query params;
- forms;
- archivos;
- mensajes de colas.

## Checklist

- [ ] sé derivar contratos con utility types;
- [ ] no confundo `as` con validación;
- [ ] modelo `Promise<T>` correctamente;
- [ ] trato `catch` como dato desconocido;
- [ ] valido inputs externos;
- [ ] considero DTOs y mappers cuando dominio y transporte difieren.

[← Tipos avanzados](04-narrowing-tipos-avanzados.md) · [Siguiente: Módulos, DOM y aplicaciones →](06-modulos-dom-aplicaciones.md)
