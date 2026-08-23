# TypeScript Cheat Sheet

Referencia rápida. Para explicación conceptual, usar los capítulos del tutorial.

## Primitivos

```ts
let nombre: string = "Ana";
let edad: number = 30;
let activo: boolean = true;
let vacio: null = null;
let indefinido: undefined = undefined;
```

## Arrays y tuples

```ts
const ids: number[] = [1, 2, 3];
const nombres: Array<string> = ["Ana", "Luis"];
const coordenada: [number, number] = [-34.6, -58.38];
```

## Type alias

```ts
type ID = string | number;

type Usuario = {
  id: ID;
  nombre: string;
  email?: string;
};
```

## Interface

```ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
```

Extensión:

```ts
interface ProductoDigital extends Producto {
  downloadUrl: string;
}
```

## Union

```ts
type Estado = "draft" | "published" | "archived";
```

## Intersection

```ts
type Auditable = { createdAt: Date };
type Entidad = Usuario & Auditable;
```

## Funciones

```ts
function sumar(a: number, b: number): number {
  return a + b;
}
```

Arrow:

```ts
const sumar = (a: number, b: number): number => a + b;
```

Opcional:

```ts
function saludar(nombre: string, apellido?: string): string {
  return apellido ? `${nombre} ${apellido}` : nombre;
}
```

Default:

```ts
function paginar(page = 1, size = 20) {}
```

Rest:

```ts
function total(...values: number[]): number {
  return values.reduce((acc, value) => acc + value, 0);
}
```

## Function type

```ts
type Handler<T> = (value: T) => void;
```

## `unknown`

```ts
function procesar(value: unknown) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

## `never`

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

## Narrowing

```ts
if (typeof value === "string") {}
if (error instanceof Error) {}
if ("id" in object) {}
```

## Type predicate

```ts
function isUsuario(value: unknown): value is Usuario {
  return typeof value === "object" && value !== null && "id" in value;
}
```

## Discriminated union

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

## Generics

```ts
function identity<T>(value: T): T {
  return value;
}
```

Constraint:

```ts
function getId<T extends { id: number }>(value: T): number {
  return value.id;
}
```

## `keyof`

```ts
type UsuarioKey = keyof Usuario;
```

## Indexed access

```ts
type Nombre = Usuario["nombre"];
```

## `typeof`

```ts
const config = { port: 3000 };
type Config = typeof config;
```

## `as const`

```ts
const ROLES = ["admin", "user"] as const;
type Rol = typeof ROLES[number];
```

## `satisfies`

```ts
const config = {
  host: "localhost",
  port: 3000
} satisfies Record<string, string | number>;
```

## Utility Types

```ts
type A = Partial<Usuario>;
type B = Required<Usuario>;
type C = Readonly<Usuario>;
type D = Pick<Usuario, "id" | "nombre">;
type E = Omit<Usuario, "email">;
type F = Record<"admin" | "user", boolean>;
type G = Exclude<Estado, "archived">;
type H = Extract<Estado, "published">;
type I = NonNullable<string | null>;
```

## `ReturnType`

```ts
type R = ReturnType<typeof factory>;
```

## `Parameters`

```ts
type P = Parameters<typeof fn>;
```

## Classes

```ts
class UsuarioModel {
  constructor(
    public readonly id: number,
    public nombre: string,
    private email: string
  ) {}
}
```

## Abstract

```ts
abstract class Repository<T> {
  abstract findById(id: number): Promise<T | null>;
}
```

## Implements

```ts
interface Serializable {
  serialize(): string;
}

class Pedido implements Serializable {
  serialize(): string {
    return JSON.stringify(this);
  }
}
```

## Promise

```ts
async function load(): Promise<Usuario[]> {
  return [];
}
```

## Error seguro

```ts
try {
  // ...
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

## DOM

```ts
const form = document.querySelector<HTMLFormElement>("#form");
const input = document.querySelector<HTMLInputElement>("#email");
```

## Optional chaining

```ts
usuario.perfil?.telefono;
```

## Nullish coalescing

```ts
const telefono = usuario.telefono ?? "Sin teléfono";
```

## Modules

```ts
export type { Usuario };
export { crearUsuario };
```

```ts
import { crearUsuario, type Usuario } from "./usuario.js";
```

## Typecheck

```bash
npx tsc --noEmit
```

## Build

```bash
npx tsc
```

## Watch

```bash
npx tsc --watch
```

## `tsconfig` base

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

## Recordatorio

- `any` desactiva seguridad.
- `unknown` obliga a validar.
- `as` no valida runtime.
- JSON no rehidrata clases ni `Date`.
- tipos externos deben validarse en boundaries.
- `strict` debería ser baseline en proyectos nuevos.

[← Volver al README](../README.md)
