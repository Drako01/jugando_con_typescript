<p align="center">
  <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="TypeScript" height="170" />
</p>

<h1 align="center">TypeScript + SASS — Guía Profesional con Laboratorio Práctico</h1>

<p align="center">
  Aprendé TypeScript y SASS de forma progresiva, entendiendo no sólo la sintaxis sino también cómo se aplican en una aplicación frontend real, responsive y mantenible.
</p>

<p align="center">
  <a href="https://github.com/Drako01/jugando_con_typescript/releases"><img alt="Release" src="https://img.shields.io/badge/release-v2.1.0-3178C6"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://sass-lang.com/"><img alt="SASS" src="https://img.shields.io/badge/SASS-SCSS-CC6699?logo=sass&logoColor=white"></a>
  <a href="./LICENCE"><img alt="License" src="https://img.shields.io/badge/license-MIT-green"></a>
</p>

<p align="center">
  Autor: <strong><a href="https://github.com/Drako01">Alejandro Di Stefano</a></strong>
</p>

---

## Demo online

La aplicación está publicada con GitHub Pages:

**https://drako01.github.io/jugando_con_typescript/**

El laboratorio permite crear categorías, profesores, cursos y alumnos, relacionarlos entre sí y persistir la información en `localStorage`.

La interfaz fue desarrollada deliberadamente sin frameworks de UI para que el código de TypeScript y SASS pueda estudiarse de punta a punta.

---

## Qué es este repositorio

Este proyecto nació como un experimento para practicar TypeScript y evolucionó hacia un material de estudio completo con **dos recorridos complementarios**:

### 1. TypeScript

Aprender a modelar software con tipos, interfaces, clases, generics, narrowing, Utility Types, módulos ES, DOM, APIs del navegador y configuración profesional.

### 2. SASS / SCSS

Aprender a construir una arquitectura de estilos escalable mediante variables, partials, `@use`, mixins, nesting, design tokens, Grid, Flexbox y responsive design.

El objetivo no es memorizar sintaxis. El objetivo es entender **por qué estas herramientas existen, qué problemas resuelven y cómo se integran en una aplicación real**.

---

# Ruta de aprendizaje

| Capítulo | Contenido |
| --- | --- |
| [01 — Fundamentos y entorno](docs/01-fundamentos-entorno.md) | Qué es TypeScript, compilador, inferencia, `tsconfig`, build y workflow |
| [02 — Sistema de tipos](docs/02-sistema-de-tipos.md) | Primitivos, arrays, tuples, unions, literals, aliases, interfaces y `unknown` |
| [03 — Funciones, objetos y clases](docs/03-funciones-objetos-clases.md) | Funciones, contratos, OOP, access modifiers, abstract, readonly y composición |
| [04 — Narrowing y tipos avanzados](docs/04-narrowing-tipos-avanzados.md) | Type guards, discriminated unions, generics, `keyof`, indexed access y conditional types |
| [05 — Utility Types y APIs tipadas](docs/05-utility-types-apis.md) | `Partial`, `Pick`, `Omit`, `Record`, DTOs, async, JSON y validación runtime |
| [06 — Módulos, DOM y aplicaciones](docs/06-modulos-dom-aplicaciones.md) | ES Modules, browser APIs, DOM seguro, localStorage y arquitectura frontend |
| [07 — TypeScript profesional](docs/07-typescript-profesional.md) | Strict mode, configuración, testing, linting, migraciones, `.d.ts` y project references |
| [08 — SASS profesional](docs/08-sass-profesional.md) | SCSS, variables, partials, `@use`, mixins, Grid, Flexbox, responsive design y arquitectura CSS |
| [Cheat Sheet](docs/cheatsheet.md) | Sintaxis y patrones TypeScript de consulta rápida |

---

# Arquitectura pedagógica del proyecto

El repositorio está pensado para estudiar código real y documentación en paralelo.

```text
.
├── docs/
│   ├── 01-fundamentos-entorno.md
│   ├── 02-sistema-de-tipos.md
│   ├── 03-funciones-objetos-clases.md
│   ├── 04-narrowing-tipos-avanzados.md
│   ├── 05-utility-types-apis.md
│   ├── 06-modulos-dom-aplicaciones.md
│   ├── 07-typescript-profesional.md
│   ├── 08-sass-profesional.md
│   └── cheatsheet.md
│
├── type/                         # Código fuente TypeScript
│   ├── functions/
│   │   └── Functions.ts
│   ├── models/
│   │   ├── Alumno.ts
│   │   ├── Profesor.ts
│   │   ├── Curso.ts
│   │   ├── Categoria.ts
│   │   └── Persona.ts
│   └── index.ts
│
├── sass/                         # Código fuente SASS / SCSS
│   ├── base/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _reset.scss
│   ├── components/
│   │   ├── _forms.scss
│   │   └── _tables.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _main.scss
│   │   └── _footer.scss
│   └── styles.scss
│
├── assets/
│   ├── js/                       # JavaScript compilado desde TypeScript
│   └── css/
│       └── styles.css            # CSS compilado desde SASS
│
├── index.html
├── tsconfig.json
├── package.json
├── CHANGELOG.md
├── RELEASE_NOTES_v2.0.0.md
└── RELEASE_NOTES_v2.1.0.md
```

---

# Quick start

## Requisitos

- Node.js
- npm
- un editor con buen soporte de TypeScript, como VS Code
- navegador moderno

Clonar el repositorio:

```bash
git clone https://github.com/Drako01/jugando_con_typescript.git
cd jugando_con_typescript
npm install
```

## Compilar todo

```bash
npm run build
```

Este comando compila:

1. TypeScript → JavaScript.
2. SASS → CSS.

## Verificar solamente TypeScript

```bash
npm run typecheck
```

## Compilar únicamente SASS

```bash
npm run styles
```

## Trabajar con SASS en modo watch

```bash
npm run styles:watch
```

## TypeScript en modo watch

```bash
npm run watch
```

Luego podés abrir `index.html` con un servidor local estático.

---

# Parte I — TypeScript

## ¿Qué es TypeScript?

TypeScript es JavaScript con un sistema de tipos estático que analiza el código antes de ejecutarlo.

```ts
function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}

calcularTotal(1200, 2);
// calcularTotal("1200", 2); // error de compilación
```

El flujo conceptual es:

```text
Código .ts
   ↓
Type checker
   ↓
Compilador TypeScript
   ↓
JavaScript .js
   ↓
Browser / Node.js
```

TypeScript no sustituye JavaScript. Lo complementa con información de tipos durante el desarrollo.

---

## Inferencia

```ts
const nombre = "Alejandro";
const edad = 30;
const activo = true;
```

No es necesario anotar cada variable. Si el compilador puede inferir correctamente el tipo, la inferencia suele producir código más limpio.

---

## Tipado explícito

```ts
let total: number = 0;
let email: string;
let habilitado: boolean = true;
```

---

## Arrays

```ts
const tecnologias: string[] = ["TypeScript", "SASS", "JavaScript"];
const ids: Array<number> = [1, 2, 3];
```

---

## Objetos

```ts
type Usuario = {
  id: number;
  nombre: string;
  email?: string;
};
```

---

## Union types

```ts
type Estado = "pending" | "approved" | "rejected";

let estado: Estado = "pending";
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

Regla práctica:

- `interface` es excelente para contratos de objetos extensibles;
- `type` es muy flexible para unions, intersections, tuples y composición avanzada.

---

## Evitar `any`

```ts
function procesar(valor: any) {
  valor.metodoQueNoExiste();
}
```

`any` desactiva gran parte de la protección del compilador.

Para datos realmente desconocidos suele ser mejor `unknown`:

```ts
function imprimir(valor: unknown) {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  }
}
```

---

## Narrowing

```ts
function formatear(valor: string | number): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }

  return valor.trim();
}
```

El compilador utiliza el flujo de control para reducir un tipo amplio a uno más específico.

---

## Discriminated unions

```ts
type Resultado<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

Este patrón es especialmente útil para estados de UI, APIs y lógica de negocio.

---

## Generics

```ts
function primero<T>(items: T[]): T | undefined {
  return items[0];
}
```

Los generics permiten reutilizar lógica sin perder información de tipos.

---

## Utility Types

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

También conviene conocer:

- `Required<T>`
- `Readonly<T>`
- `Record<K, T>`
- `Exclude<T, U>`
- `Extract<T, U>`
- `NonNullable<T>`
- `ReturnType<T>`
- `Parameters<T>`

---

## TypeScript y datos externos

TypeScript no valida datos en runtime.

```ts
const response = await fetch("/api/user");
const data = await response.json();
```

Usar:

```ts
const usuario = data as Usuario;
```

no demuestra que `data` sea realmente un `Usuario`.

Cuando los datos vienen de APIs, formularios, archivos o `localStorage`, se necesita validación runtime.

---

# Parte II — SASS / SCSS

## ¿Qué es SASS?

SASS es un preprocesador CSS que permite organizar estilos con herramientas que CSS tradicionalmente no ofrecía de manera directa.

En este repositorio se utiliza la sintaxis **SCSS**, compatible visualmente con CSS.

```scss
$color-primary: #3178c6;

.button {
  background: $color-primary;

  &:hover {
    filter: brightness(1.1);
  }
}
```

SASS se compila a CSS antes de llegar al navegador.

```text
styles.scss
   ↓
Compilador SASS
   ↓
styles.css
   ↓
Browser
```

---

## Design tokens

El proyecto centraliza decisiones visuales en:

```text
sass/base/_variables.scss
```

Ejemplo:

```scss
$color-bg: #08111f;
$color-surface: #0f1b2d;
$color-primary: #3178c6;
$color-accent: #cf649a;

$radius-sm: 10px;
$radius-md: 16px;
$radius-lg: 24px;
```

Esto permite mantener una única fuente de verdad para colores, radios, sombras, tipografía y breakpoints.

---

## Partials

Los archivos que comienzan con `_` son partials:

```text
_variables.scss
_mixins.scss
_forms.scss
_tables.scss
_header.scss
```

No se compilan individualmente. Se integran desde `styles.scss`.

---

## `@use`

El proyecto utiliza el sistema moderno de módulos de SASS:

```scss
@use '../base/variables' as *;
@use '../base/mixins' as *;
```

Esto es preferible al antiguo `@import` porque mejora el encapsulamiento y evita colisiones globales difíciles de rastrear.

---

## Mixins

Un mixin encapsula estilos reutilizables.

```scss
@mixin focus-ring {
  outline: 3px solid rgba($color-primary-light, 0.28);
  outline-offset: 2px;
}
```

Luego:

```scss
.button:focus-visible {
  @include focus-ring;
}
```

---

## Mixins responsive

El proyecto define breakpoints reutilizables:

```scss
@mixin tablet {
  @media (max-width: $bp-tablet) {
    @content;
  }
}

@mixin mobile {
  @media (max-width: $bp-mobile) {
    @content;
  }
}
```

Uso:

```scss
@include mobile {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Nesting

SCSS permite expresar relaciones entre selectores con mayor claridad:

```scss
.site-footer {
  border-top: 1px solid $color-border;

  &__content {
    display: flex;
  }

  a {
    color: $color-primary-light;
  }
}
```

Debe usarse con moderación. El nesting excesivo genera selectores difíciles de mantener.

---

## Grid y Flexbox

El laboratorio utiliza Grid para estructuras bidimensionales:

```scss
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}
```

Y Flexbox para elementos lineales:

```scss
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

La elección depende del problema de layout, no de preferencias personales.

---

## Responsive design

La interfaz se adapta progresivamente:

### Desktop

- formularios en dos columnas;
- navegación completa;
- hero dividido en contenido + panel educativo.

### Tablet

- hero en una columna;
- cards apiladas;
- pasos del flujo en dos columnas.

### Mobile

- formularios de una sola columna;
- navegación simplificada;
- tablas con scroll horizontal;
- espacios y tamaños ajustados para pantallas pequeñas.

---

## Arquitectura SASS utilizada

```text
sass/
├── base/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _reset.scss
├── components/
│   ├── _forms.scss
│   └── _tables.scss
├── layout/
│   ├── _header.scss
│   ├── _main.scss
│   └── _footer.scss
└── styles.scss
```

Esta separación enseña una idea importante: **los estilos también necesitan arquitectura**.

No conviene que un proyecto grande termine con un único archivo de miles de líneas sin responsabilidades claras.

El capítulo completo está en:

**[08 — SASS profesional](docs/08-sass-profesional.md)**

---

# El laboratorio práctico

La aplicación utiliza un pequeño dominio académico:

```text
Categoría
   ↓
Profesor
   ↓
Curso
   ↓
Alumno
```

El flujo recomendado es:

1. Crear una categoría.
2. Crear un profesor.
3. Crear un curso y asociarlo.
4. Crear un alumno e inscribirlo.

Esto permite estudiar TypeScript sobre problemas concretos:

- clases;
- herencia;
- composición;
- arrays tipados;
- eventos DOM;
- formularios;
- `localStorage`;
- serialización JSON;
- fechas;
- render dinámico;
- módulos ES.

Y simultáneamente estudiar SASS sobre una interfaz real:

- design tokens;
- cards;
- forms;
- tablas;
- estados visuales;
- layouts;
- responsive;
- accesibilidad;
- focus states.

---

# Persistencia con localStorage

Este laboratorio es intencionalmente frontend-only.

Los datos se guardan en el navegador utilizando:

```ts
localStorage.setItem("Categorias", JSON.stringify(categorias));
```

Y se recuperan con:

```ts
const categorias = JSON.parse(
  localStorage.getItem("Categorias") || "[]"
);
```

Esto permite concentrarse en TypeScript, DOM y modelado sin introducir todavía backend o base de datos.

En una aplicación productiva real, la persistencia debería normalmente delegarse a una API y una base de datos.

---

# Accesibilidad y UX

El rediseño incorpora conceptos que también forman parte del aprendizaje frontend:

- `label` correctamente asociado a inputs;
- focus states visibles;
- tablas con región scrollable;
- navegación semántica;
- estados activo/inactivo diferenciados;
- tipografía legible;
- contraste alto;
- layout adaptable;
- controles suficientemente grandes para dispositivos móviles.

---

# Configuración TypeScript

El proyecto utiliza `strict: true`.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmitOnError": true
  }
}
```

`strict` es una de las decisiones más importantes para obtener valor real de TypeScript.

---

# Scripts disponibles

```json
{
  "scripts": {
    "build": "tsc && npm run styles",
    "watch": "tsc --watch",
    "typecheck": "tsc --noEmit",
    "styles": "npx --yes sass@1.92.1 sass/styles.scss assets/css/styles.css --style=compressed --no-source-map",
    "styles:watch": "npx --yes sass@1.92.1 sass/styles.scss assets/css/styles.css --watch"
  }
}
```

### `npm run build`

Compila TypeScript y SASS.

### `npm run typecheck`

Valida TypeScript sin emitir JavaScript.

### `npm run watch`

Observa cambios TypeScript.

### `npm run styles`

Compila SCSS a CSS.

### `npm run styles:watch`

Observa cambios SASS y recompila automáticamente.

---

# Flujo de build

```text
                     ┌────────────────────┐
                     │   Código fuente     │
                     └─────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
             TypeScript                    SASS
             type/*.ts                 sass/*.scss
                 │                           │
                 ▼                           ▼
               tsc                        sass
                 │                           │
                 ▼                           ▼
          assets/js/*.js            assets/css/styles.css
                 │                           │
                 └─────────────┬─────────────┘
                               ▼
                           index.html
                               │
                               ▼
                            Browser
```

---

# GitHub Pages

La demo pública se sirve desde la rama `gh-pages`.

El repositorio incluye un workflow destinado a:

1. instalar dependencias;
2. ejecutar el build;
3. generar JavaScript y CSS;
4. preparar el sitio estático;
5. publicar el resultado en `gh-pages`.

Esto conecta el aprendizaje de TypeScript + SASS con un flujo real de integración y despliegue.

---

# Buenas prácticas TypeScript

1. Preferí inferencia cuando el tipo sea evidente.
2. Evitá `any` siempre que sea razonable.
3. Usá `unknown` para datos externos.
4. Activá `strict`.
5. Modelá estados mediante unions.
6. Derivá tipos con Utility Types.
7. Validá datos externos en runtime.
8. Usá generics para preservar información de tipos.
9. Evitá assertions innecesarias.
10. Tratá los errores del compilador como feedback de diseño.

---

# Buenas prácticas SASS

1. Centralizá design tokens.
2. Dividí estilos por responsabilidad.
3. Preferí `@use` sobre `@import`.
4. Evitá nesting excesivo.
5. Creá mixins sólo cuando exista reutilización real.
6. No uses breakpoints arbitrarios en cada componente.
7. Diseñá mobile y desktop como parte del mismo sistema.
8. No dependas del preprocesador para cosas que CSS moderno resuelve mejor.
9. Compilá SASS en CI o durante el build.
10. Recordá que el navegador recibe CSS, no SCSS.

---

# Qué NO intenta ser este proyecto

No es un framework.

No intenta reemplazar:

- React;
- Angular;
- Vue;
- Next.js;
- NestJS;
- una API real;
- una base de datos productiva.

El objetivo es mantener suficiente complejidad para enseñar conceptos reales sin esconderlos detrás de demasiadas abstracciones.

---

# Contribuciones

Issues y Pull Requests son bienvenidos para:

- corregir errores conceptuales;
- mejorar explicaciones;
- agregar ejercicios;
- incorporar ejemplos TypeScript;
- mejorar arquitectura SASS;
- reportar problemas responsive;
- proponer mejoras de accesibilidad;
- documentar cambios relevantes en TypeScript o SASS.

---

# Releases

La evolución del proyecto sigue Semantic Versioning.

### v2.0.0 — Professional TypeScript Guide

Transformación del repositorio en una guía completa de TypeScript.

Ver:

[RELEASE_NOTES_v2.0.0.md](RELEASE_NOTES_v2.0.0.md)

### v2.1.0 — Responsive UI + SASS Learning Edition

Incorporación de:

- tutorial profesional de SASS;
- arquitectura SCSS modular;
- rediseño completo de la aplicación;
- responsive desktop/tablet/mobile;
- build combinado TypeScript + SASS;
- mejoras funcionales y pedagógicas del laboratorio.

Ver:

[RELEASE_NOTES_v2.1.0.md](RELEASE_NOTES_v2.1.0.md)

También podés consultar:

[CHANGELOG.md](CHANGELOG.md)

---

# Recursos oficiales

## TypeScript

- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## SASS

- [SASS](https://sass-lang.com/)
- [SASS Documentation](https://sass-lang.com/documentation/)
- [SASS Modules](https://sass-lang.com/documentation/at-rules/use/)
- [SASS Mixins](https://sass-lang.com/documentation/at-rules/mixin/)

---

# Licencia

Proyecto distribuido bajo licencia MIT.

Ver [LICENCE](LICENCE).

---

# Autor

**[Alejandro Di Stefano](https://github.com/Drako01)**

Repositorio creado y mantenido como material práctico, educativo y de referencia sobre **TypeScript, SASS y desarrollo frontend moderno**.
