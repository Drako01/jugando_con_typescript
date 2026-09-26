# 04 — Narrowing y tipos avanzados

> Objetivo: aprender a transformar tipos amplios en tipos precisos y utilizar herramientas avanzadas sin perder legibilidad.

## Narrowing

TypeScript analiza el flujo de control para reducir unions.

```ts
function normalizar(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }

  return value.trim();
}
```

## `typeof`

Funciona bien para primitivos:

```ts
if (typeof value === "string") {
  // value: string
}
```

## `instanceof`

```ts
function mostrar(error: Error | string) {
  if (error instanceof Error) {
    console.error(error.message);
    return;
  }

  console.error(error);
}
```

## Operador `in`

```ts
type Admin = { permissions: string[] };
type Guest = { expiresAt: Date };

function inspect(user: Admin | Guest) {
  if ("permissions" in user) {
    console.log(user.permissions);
  }
}
```

## Type predicates

```ts
type Usuario = {
  id: number;
  nombre: string;
};

function isUsuario(value: unknown): value is Usuario {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "nombre" in value
  );
}
```

Un predicate no valida mágicamente todo el contrato. La función debe ser correcta.

## Discriminated unions

```ts
type EstadoCarga<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
```

Consumo:

```ts
function render<T>(state: EstadoCarga<T>) {
  switch (state.status) {
    case "idle":
      return "Sin iniciar";
    case "loading":
      return "Cargando";
    case "success":
      return state.data;
    case "error":
      return state.error.message;
  }
}
```

Este patrón evita combinaciones imposibles como `{ loading: true, error: Error, data: ... }`.

## Exhaustividad con `never`

```ts
function assertNever(value: never): never {
  throw new Error(`Estado no contemplado: ${JSON.stringify(value)}`);
}
```

Puede utilizarse en un `default` para detectar nuevos casos no manejados.

## Generics

Un generic conserva una relación entre entrada y salida.

```ts
function identidad<T>(value: T): T {
  return value;
}
```

```ts
const numero = identidad(10);     // number
const texto = identidad("hola"); // string
```

## Generic constraints

```ts
function getId<T extends { id: number }>(entity: T): number {
  return entity.id;
}
```

No queremos cualquier `T`; queremos un valor que garantice `id`.

## Múltiples parámetros genéricos

```ts
function pair<K, V>(key: K, value: V) {
  return { key, value };
}
```

## `keyof`

```ts
type Usuario = {
  id: number;
  nombre: string;
  email: string;
};

type UsuarioKey = keyof Usuario;
// "id" | "nombre" | "email"
```

## Acceso indexado

```ts
type UsuarioNombre = Usuario["nombre"]; // string
```

Con `keyof`:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

El retorno mantiene el tipo real de la propiedad.

## `typeof` en tipos

```ts
const config = {
  apiUrl: "/api",
  retries: 3
};

type Config = typeof config;
```

Permite derivar el tipo desde una fuente de verdad existente.

## `as const` + indexed access

```ts
const ESTADOS = ["draft", "published", "archived"] as const;
type Estado = typeof ESTADOS[number];
```

Evita duplicar lista y tipo.

## Mapped types

```ts
type Flags<T> = {
  [K in keyof T]: boolean;
};
```

Si `T` tiene `id`, `nombre`, `email`, el tipo resultante contiene esas mismas claves con valores booleanos.

## Conditional types

```ts
type EsArray<T> = T extends unknown[] ? true : false;
```

Son poderosos para librerías y APIs genéricas, pero su complejidad puede dispararse. En código de negocio, priorizar legibilidad.

## `infer`

```ts
type Elemento<T> = T extends Array<infer U> ? U : never;

type Item = Elemento<string[]>; // string
```

## Template literal types

```ts
type Evento = "created" | "updated";
type HandlerName = `on${Capitalize<Evento>}`;
// "onCreated" | "onUpdated"
```

Útiles para APIs donde los strings siguen reglas conocidas.

## Branded types

TypeScript es estructural; a veces dos strings conceptualmente distintos no deberían mezclarse.

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
```

Es un patrón avanzado. Debe acompañarse con funciones constructoras y una convención clara.

## No sobre-tipar

Un tipo extremadamente sofisticado puede ser técnicamente correcto y operacionalmente malo.

Antes de introducir conditional types complejos, preguntarse:

1. ¿reduce errores reales?
2. ¿mejora la API pública?
3. ¿el equipo puede mantenerlo?
4. ¿una solución más simple comunica lo mismo?

## Checklist

- [ ] domino `typeof`, `instanceof` e `in` para narrowing;
- [ ] puedo escribir un type predicate;
- [ ] uso discriminated unions para estados;
- [ ] entiendo generics y constraints;
- [ ] sé utilizar `keyof`, `typeof` e indexed access;
- [ ] conozco mapped y conditional types sin abusar de ellos.

[← Funciones y clases](03-funciones-objetos-clases.md) · [Siguiente: Utility Types y APIs →](05-utility-types-apis.md)
