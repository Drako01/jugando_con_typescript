# 06 — Módulos, DOM y aplicaciones

> Objetivo: aplicar TypeScript en aplicaciones de navegador y entender cómo tipar módulos, DOM, eventos y almacenamiento local.

## ES Modules

Exportar:

```ts
export type Usuario = {
  id: number;
  nombre: string;
};

export function crearUsuario(nombre: string): Usuario {
  return { id: Date.now(), nombre };
}
```

Importar:

```ts
import { crearUsuario, type Usuario } from "./usuarios.js";
```

Cuando se compila a ES Modules para navegador, es habitual que el specifier final apunte a `.js`, aunque el fuente sea `.ts`.

## Default exports

```ts
export default class App {}
```

Importación:

```ts
import App from "./App.js";
```

En equipos grandes, exports nombrados suelen facilitar refactors y búsqueda, aunque ambas estrategias son válidas.

## Type-only imports

```ts
import type { Usuario } from "./types.js";
```

Expresa que el import sólo existe para el type checker.

## DOM

`getElementById` puede devolver `null`:

```ts
const form = document.getElementById("user-form");
```

Tipo inferido:

```ts
HTMLElement | null
```

Hay que contemplarlo:

```ts
if (!form) {
  throw new Error("user-form not found");
}
```

## Elementos específicos

Cuando conocemos el contrato del HTML:

```ts
const input = document.getElementById("email") as HTMLInputElement | null;

if (!input) return;

console.log(input.value);
```

Una assertion `as` le comunica al compilador algo que él no puede comprobar. Si el HTML cambia, la assertion puede quedar desactualizada.

## Helper tipado para DOM

```ts
function getRequiredElement<T extends HTMLElement>(
  id: string,
  ctor: { new (): T }
): T {
  const element = document.getElementById(id);

  if (!(element instanceof ctor)) {
    throw new Error(`Elemento inválido o inexistente: ${id}`);
  }

  return element;
}
```

En la práctica, también puede construirse una variante más simple por selector y comprobación concreta.

## Eventos

```ts
const form = document.querySelector<HTMLFormElement>("#user-form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

`querySelector<T>` permite indicar el tipo esperado del elemento.

## `event.target`

`target` es deliberadamente amplio.

```ts
button.addEventListener("click", (event) => {
  const target = event.currentTarget;

  if (target instanceof HTMLButtonElement) {
    console.log(target.dataset.id);
  }
});
```

Cuando importa el elemento al que se registró el listener, `currentTarget` suele expresar mejor la intención que `target`.

## Formularios

```ts
const form = document.querySelector<HTMLFormElement>("#profile-form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const nombre = data.get("nombre");

  if (typeof nombre !== "string" || !nombre.trim()) {
    return;
  }

  console.log(nombre.trim());
});
```

Los datos del formulario son input externo y requieren validación.

## `localStorage`

`localStorage` almacena strings.

```ts
localStorage.setItem("theme", "dark");
```

Objetos:

```ts
const usuario = { id: 1, nombre: "Ana" };
localStorage.setItem("usuario", JSON.stringify(usuario));
```

Lectura segura:

```ts
const raw = localStorage.getItem("usuario");

if (raw) {
  const data: unknown = JSON.parse(raw);
  // validar antes de usar
}
```

`JSON.parse()` no debe considerarse automáticamente confiable.

## Storage genérico

```ts
interface StorageCodec<T> {
  encode(value: T): string;
  decode(raw: string): T;
}

class JsonStorage<T> {
  constructor(
    private readonly key: string,
    private readonly codec: StorageCodec<T>
  ) {}

  save(value: T): void {
    localStorage.setItem(this.key, this.codec.encode(value));
  }

  load(): T | null {
    const raw = localStorage.getItem(this.key);
    return raw ? this.codec.decode(raw) : null;
  }
}
```

El codec debería validar datos si el contenido puede quedar corrupto o desactualizado.

## Fechas

```ts
const now = new Date();
```

Al serializar:

```ts
JSON.stringify({ createdAt: now });
```

La fecha termina como string ISO. Al recuperar:

```ts
const createdAt = new Date(dto.createdAt);
```

No asumir que JSON rehidrata automáticamente `Date`.

## Arquitectura básica frontend

Un proyecto pequeño puede comenzar así:

```text
src/
├── domain/
│   ├── models/
│   └── services/
├── infrastructure/
│   ├── api/
│   └── storage/
├── ui/
│   ├── components/
│   └── forms/
└── main.ts
```

No es una regla rígida. El objetivo es evitar que una sola función termine manejando DOM, persistencia, reglas de negocio y networking al mismo tiempo.

## Aplicación incluida en este repo

El laboratorio actual contiene:

- `Alumno`;
- `Profesor`;
- `Curso`;
- `Categoria`;
- formularios y eventos;
- persistencia en `localStorage`;
- módulos TypeScript;
- compilación a `assets/js`.

Esto permite estudiar un caso más realista que ejemplos aislados.

## Mejoras posibles sobre un laboratorio didáctico

En una aplicación de producción podríamos evolucionar:

```text
DOM directo
→ capa UI

localStorage directo
→ repository/storage adapter

JSON.parse + assertions
→ validación runtime

IDs por length + 1
→ estrategia de IDs estable

console.error
→ manejo de errores visible/observable
```

El objetivo educativo es entender por qué aparece cada abstracción, no agregar capas por decoración arquitectónica.

## Checklist

- [ ] entiendo imports/exports y type-only imports;
- [ ] trato elementos DOM como potencialmente nulos;
- [ ] valido forms y storage como inputs externos;
- [ ] entiendo que JSON pierde prototipos y `Date`;
- [ ] separo UI y dominio cuando la aplicación crece.

[← Utility Types y APIs](05-utility-types-apis.md) · [Siguiente: TypeScript profesional →](07-typescript-profesional.md)
