<p align="center">
  <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="TypeScript" height="190" />
</p>

<h1 align="center">TypeScript — Guía Profesional</h1>

<p align="center">
  Tutorial práctico y progresivo para aprender TypeScript desde los fundamentos hasta patrones utilizados en proyectos reales.
</p>

<p align="center">
  <a href="https://github.com/Drako01/jugando_con_typescript/releases"><img alt="Release" src="https://img.shields.io/badge/release-v2.0.0-3178C6"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white"></a>
  <a href="./LICENCE"><img alt="License" src="https://img.shields.io/badge/license-MIT-green"></a>
</p>

<p align="center">
  Autor: <strong><a href="https://github.com/Drako01">Alejandro Di Stefano</a></strong>
</p>

---

## Objetivo

Este repositorio nació como un proyecto para experimentar con TypeScript y evolucionó hacia una **guía de estudio y referencia técnica**.

El objetivo es entender no sólo la sintaxis, sino también **qué problemas resuelve el sistema de tipos, cómo modelar contratos de software y cómo configurar TypeScript para proyectos reales**.

La aplicación incluida en el repositorio continúa funcionando como laboratorio práctico: utiliza clases, módulos ES, DOM, formularios, `localStorage`, modelado de entidades y compilación de TypeScript a JavaScript.

---

## Ruta de aprendizaje

| Capítulo | Contenido |
| --- | --- |
| [01 — Fundamentos y entorno](docs/01-fundamentos-entorno.md) | Qué es TypeScript, compilador, inferencia, `tsconfig`, build y workflow |
| [02 — Sistema de tipos](docs/02-sistema-de-tipos.md) | Primitivos, arrays, tuples, unions, literals, aliases, interfaces y `unknown` |
| [03 — Funciones, objetos y clases](docs/03-funciones-objetos-clases.md) | Funciones, contratos, OOP, access modifiers, abstract, readonly y composición |
| [04 — Narrowing y tipos avanzados](docs/04-narrowing-tipos-avanzados.md) | Type guards, discriminated unions, generics, `keyof`, indexed access y conditional types |
| [05 — Utility types y APIs tipadas](docs/05-utility-types-apis.md) | `Partial`, `Pick`, `Omit`, `Record`, DTOs, async, JSON y validación runtime |
| [06 — Módulos, DOM y aplicaciones](docs/06-modulos-dom-aplicaciones.md) | ES Modules, browser APIs, DOM seguro, localStorage y arquitectura frontend |
| [07 — TypeScript profesional](docs/07-typescript-profesional.md) | Strict mode, configuración, librerías, testing, linting, migraciones y buenas prácticas |
| [Cheat Sheet](docs/cheatsheet.md) | Sintaxis y patrones de consulta rápida |

---

## ¿Qué es TypeScript?

TypeScript es JavaScript con un sistema de tipos estático que analiza el código durante el desarrollo y la compilación.

```ts
function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}

calcularTotal(1200, 2);      // válido
// calcularTotal("1200", 2); // error antes de ejecutar
```

Los tipos desaparecen al compilar. El navegador o Node.js ejecutan JavaScript, no el sistema de tipos de TypeScript.

```text
Código .ts
   ↓
Type checker
   ↓
Compilador TypeScript
   ↓
JavaScript .js
   ↓
Browser / Node.js / runtime
```

TypeScript no reemplaza JavaScript: lo analiza, lo complementa y permite expresar contratos que JavaScript por sí solo no puede verificar en tiempo de desarrollo.

---

## Quick start

### Requisitos

- Node.js
- npm
- TypeScript
- editor con soporte para TypeScript, recomendado VS Code o equivalente

Clonar:

```bash
git clone https://github.com/Drako01/jugando_con_typescript.git
cd jugando_con_typescript
npm install
```

Verificar TypeScript:

```bash
npx tsc --version
```

Compilar:

```bash
npx tsc
```

Modo watch:

```bash
npx tsc --watch
```

La configuración actual compila los archivos de `type/` hacia `assets/js/`.

---

## TypeScript en 5 minutos

### Inferencia

```ts
const nombre = "Alejandro";
const edad = 30;
const activo = true;
```

No es necesario anotar tipos cuando el compilador puede inferirlos correctamente.

### Tipado explícito

```ts
let total: number = 0;
let email: string;
let habilitado: boolean = true;
```

### Arrays

```ts
const tecnologias: string[] = ["TypeScript", "Node.js", "Go"];
const ids: Array<number> = [1, 2, 3];
```

### Objetos

```ts
type Usuario = {
  id: number;
  nombre: string;
  email?: string;
};

const usuario: Usuario = {
  id: 1,
  nombre: "Ana"
};
```

### Union types

```ts
type Estado = "pending" | "approved" | "rejected";

let estado: Estado = "pending";
```

### Funciones

```ts
function saludar(nombre: string): string {
  return `Hola ${nombre}`;
}
```

### Interfaces

```ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
```

### Generics

```ts
function primero<T>(items: T[]): T | undefined {
  return items[0];
}

const valor = primero([10, 20, 30]);
```

---

## `type` vs `interface`

Ambos permiten definir contratos.

```ts
type Coordenada = {
  x: number;
  y: number;
};
```

```ts
interface Cliente {
  id: number;
  nombre: string;
}
```

Como regla práctica:

- `interface` funciona muy bien para contratos de objetos y APIs extensibles;
- `type` es especialmente flexible para unions, intersections, tuples y composición avanzada.

No existe una obligación universal de elegir uno solo. La consistencia del proyecto importa más que convertir esta elección en una guerra religiosa.

---

## Evitar `any`

```ts
function procesar(valor: any) {
  valor.metodoQueNoExiste();
}
```

`any` desactiva gran parte de la protección de TypeScript.

Para datos desconocidos suele ser preferible `unknown`:

```ts
function imprimir(valor: unknown) {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  }
}
```

TypeScript obliga a comprobar qué es el valor antes de utilizarlo.

---

## Null y optional values

```ts
interface Perfil {
  nombre: string;
  telefono?: string;
}
```

Acceso seguro:

```ts
const longitud = perfil.telefono?.length;
```

Fallback:

```ts
const telefono = perfil.telefono ?? "Sin teléfono";
```

Con `strictNullChecks`, `null` y `undefined` dejan de esconderse debajo de la alfombra.

---

## Classes

```ts
class Persona {
  constructor(
    public readonly id: number,
    public nombre: string,
    private email: string
  ) {}

  getEmail(): string {
    return this.email;
  }
}
```

El proyecto real incluido en este repositorio utiliza clases como `Alumno`, `Profesor`, `Curso` y `Categoria`, por lo que permite analizar estos conceptos sobre un caso funcional y no sólo sobre ejemplos artificiales.

---

## Type narrowing

```ts
function formatear(valor: string | number): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }

  return valor.trim();
}
```

El narrowing es uno de los conceptos más importantes de TypeScript: el compilador reduce un tipo amplio a uno más específico mediante comprobaciones del flujo de control.

---

## Discriminated unions

```ts
type Resultado<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function mostrar<T>(resultado: Resultado<T>) {
  if (resultado.ok) {
    console.log(resultado.data);
  } else {
    console.error(resultado.error);
  }
}
```

Este patrón es excelente para modelar estados, respuestas de servicios y lógica de negocio sin depender de objetos ambiguos.

---

## Utility Types

TypeScript incluye herramientas para derivar tipos sin duplicarlos.

```ts
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

type UsuarioPatch = Partial<Usuario>;
type UsuarioPublico = Omit<Usuario, "email">;
type UsuarioPreview = Pick<Usuario, "id" | "nombre">;
```

Otros muy utilizados:

- `Required<T>`
- `Readonly<T>`
- `Record<K, T>`
- `Exclude<T, U>`
- `Extract<T, U>`
- `NonNullable<T>`
- `ReturnType<T>`
- `Parameters<T>`

---

## TypeScript no valida datos externos

Esto es crucial:

```ts
const response = await fetch("/api/user");
const data = await response.json();
```

Anotar `data as Usuario` **no valida** que la API haya enviado un usuario válido.

TypeScript verifica tipos durante desarrollo. Para datos provenientes de APIs, archivos, formularios o almacenamiento se necesita validación en runtime.

```ts
function isUsuario(value: unknown): value is Usuario {
  if (typeof value !== "object" || value === null) return false;

  return "id" in value && "nombre" in value;
}
```

En sistemas reales suelen utilizarse validadores de esquema específicos cuando la complejidad lo requiere.

---

## Configuración profesional

Este repositorio utiliza `strict: true`, una de las decisiones más importantes para obtener valor real del sistema de tipos.

Opciones que conviene conocer:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

No todas tienen que activarse de golpe en un proyecto heredado. En proyectos nuevos, cuanto antes se establezca una política estricta, menor será la deuda posterior.

Ver [TypeScript profesional](docs/07-typescript-profesional.md).

---

## Estructura del repositorio

```text
.
├── docs/                 # Tutorial completo
├── type/                 # Código fuente TypeScript del laboratorio
│   ├── functions/
│   ├── models/
│   └── index.ts
├── assets/js/            # JavaScript compilado
├── sass/                 # Estilos
├── index.html            # Aplicación de demostración
├── tsconfig.json
├── package.json
├── CHANGELOG.md
└── RELEASE_NOTES_v2.0.0.md
```

---

## Qué aprender del proyecto incluido

La aplicación existente permite observar:

- imports y exports;
- clases y composición de entidades;
- tipos sobre elementos del DOM;
- type assertions controladas;
- eventos;
- arrays tipados;
- serialización con `JSON.stringify`;
- recuperación de datos desde `localStorage`;
- fechas;
- formularios;
- interacción entre código TypeScript y browser APIs.

La documentación señala también dónde un ejemplo didáctico puede evolucionar hacia patrones más robustos para producción.

---

## Buenas prácticas resumidas

1. Preferí inferencia cuando el tipo sea evidente.
2. Evitá `any`; usá `unknown` para datos realmente desconocidos.
3. Activá `strict`.
4. Modelá estados con unions cuando corresponda.
5. No dupliques tipos: derivá con utility types.
6. Validá entradas externas en runtime.
7. Usá generics para preservar información de tipos, no para impresionar al compilador.
8. Separá dominio, infraestructura y UI en aplicaciones grandes.
9. Evitá assertions `as` si podés demostrar el tipo con narrowing.
10. Tratá los errores del compilador como feedback de diseño, no como obstáculos a silenciar.

---

## Contribuciones

Issues y Pull Requests son bienvenidos para:

- corregir errores conceptuales;
- agregar ejemplos;
- mejorar explicaciones;
- proponer ejercicios;
- documentar nuevos patrones o cambios relevantes en TypeScript.

Antes de contribuir, intentá mantener los ejemplos breves, ejecutables y enfocados en un concepto concreto.

---

## Releases

La evolución relevante del material se documenta mediante GitHub Releases y en [CHANGELOG.md](CHANGELOG.md).

La reestructuración profesional del repositorio corresponde a **v2.0.0**.

Ver [RELEASE_NOTES_v2.0.0.md](RELEASE_NOTES_v2.0.0.md).

---

## Recursos oficiales

- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## Licencia

Proyecto distribuido bajo licencia MIT. Ver [LICENCE](LICENCE).

---

## Autor

**[Alejandro Di Stefano](https://github.com/Drako01)**

Repositorio creado y mantenido como material práctico de aprendizaje, experimentación y referencia sobre TypeScript.
