# 02 — Sistema de tipos

> Objetivo: dominar las piezas fundamentales del sistema de tipos y aprender a modelar datos sin caer en `any`.

## Tipos primitivos

```ts
const nombre: string = "Ana";
const edad: number = 30;
const activo: boolean = true;
const identificador: bigint = 100n;
const clave: symbol = Symbol("clave");
```

También existen `null` y `undefined`, cuyo tratamiento se vuelve especialmente importante con `strictNullChecks`.

## Arrays

```ts
const nombres: string[] = ["Ana", "Luis"];
const ids: Array<number> = [1, 2, 3];
```

Array de objetos:

```ts
type Producto = {
  id: number;
  nombre: string;
};

const productos: Producto[] = [];
```

## Tuples

Una tuple expresa cantidad y posición:

```ts
const coordenada: [number, number] = [-34.60, -58.38];
```

Tuple con nombres semánticos:

```ts
type Resultado = [data: string, error: Error | null];
```

No conviene usar tuples largas para representar entidades complejas; un objeto suele ser más legible.

## Object types

```ts
const usuario: {
  id: number;
  nombre: string;
  activo: boolean;
} = {
  id: 1,
  nombre: "Ana",
  activo: true
};
```

Cuando el contrato se reutiliza, conviene extraerlo.

## Type aliases

```ts
type Usuario = {
  id: number;
  nombre: string;
  email?: string;
};
```

Los alias pueden representar más que objetos:

```ts
type ID = string | number;
type Estado = "draft" | "published";
type Punto = [number, number];
```

## Interfaces

```ts
interface Cliente {
  id: number;
  nombre: string;
  email: string;
}
```

Extensión:

```ts
interface ClientePremium extends Cliente {
  nivel: "gold" | "platinum";
}
```

## Propiedades opcionales

```ts
interface Perfil {
  nombre: string;
  telefono?: string;
}
```

La propiedad puede no existir. No es lo mismo que declarar explícitamente `string | undefined` bajo todas las configuraciones estrictas.

## `readonly`

```ts
interface Pedido {
  readonly id: string;
  total: number;
}
```

Evita reasignar la propiedad mediante ese contrato.

No convierte mágicamente todo el objeto en inmutable en runtime.

## Union types

```ts
let id: string | number;
```

Las unions son especialmente útiles para estados conocidos:

```ts
type EstadoPedido =
  | "pending"
  | "paid"
  | "cancelled";
```

Esto suele ser superior a `string`, porque restringe los estados válidos.

## Literal types

```ts
const metodo: "GET" = "GET";
```

Combinados:

```ts
type MetodoHTTP = "GET" | "POST" | "PUT" | "DELETE";
```

## Intersection types

```ts
type Identificable = { id: number };
type Auditable = { createdAt: Date };

type Entidad = Identificable & Auditable;
```

Usar intersections con intención. Composiciones demasiado agresivas producen tipos difíciles de leer.

## `unknown`

`unknown` representa un valor cuyo tipo todavía no conocemos.

```ts
function procesar(valor: unknown) {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  }
}
```

A diferencia de `any`, obliga a comprobar antes de usar.

## `any`

```ts
let dato: any;
```

`any` desactiva el chequeo de tipos para ese flujo de datos. Puede ser útil en una migración controlada, pero no debería ser la salida rápida ante cada error del compilador.

## `never`

Representa algo que nunca produce un valor.

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

También es útil para exhaustividad:

```ts
type Estado = "ok" | "error";

function assertNever(value: never): never {
  throw new Error(`Caso inesperado: ${value}`);
}
```

## `void`

Indica que una función no devuelve un valor útil:

```ts
function log(message: string): void {
  console.log(message);
}
```

## Enums: cuándo usarlos

```ts
enum Rol {
  Admin = "ADMIN",
  User = "USER"
}
```

Son válidos, pero en muchas APIs modernas una union de strings es más simple y produce menos JavaScript:

```ts
type Rol = "ADMIN" | "USER";
```

Elegir según necesidad, interoperabilidad y convención del proyecto.

## `as const`

```ts
const config = {
  method: "GET",
  retries: 3
} as const;
```

Preserva tipos literales y vuelve readonly la estructura inferida.

Muy útil para derivar tipos:

```ts
const ROLES = ["admin", "user", "support"] as const;
type Rol = typeof ROLES[number];
```

## `satisfies`

Permite comprobar que un valor cumple un contrato sin perder inferencia específica.

```ts
type Config = Record<string, string | number>;

const config = {
  host: "localhost",
  port: 3000
} satisfies Config;
```

## Regla de diseño

Preferí modelar dominios con tipos específicos:

```ts
type Currency = "ARS" | "USD";

type Money = {
  amount: number;
  currency: Currency;
};
```

Esto comunica mucho más que dos parámetros sueltos `number` y `string`.

## Checklist

- [ ] sé cuándo usar `type` e `interface`;
- [ ] entiendo unions e intersections;
- [ ] evito `any` salvo casos justificados;
- [ ] uso `unknown` para datos no confiables;
- [ ] conozco `never`, `readonly`, `as const` y `satisfies`;
- [ ] modelo estados con literales cuando el dominio lo permite.

[← Fundamentos](01-fundamentos-entorno.md) · [Siguiente: Funciones, objetos y clases →](03-funciones-objetos-clases.md)
