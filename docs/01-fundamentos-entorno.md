# 01 — Fundamentos y entorno

> Objetivo: entender qué hace TypeScript, cómo participa el compilador y cómo preparar un flujo de trabajo reproducible.

## 1. TypeScript y JavaScript

TypeScript extiende JavaScript con análisis estático de tipos. El código que llega al runtime sigue siendo JavaScript.

```ts
const framework: string = "TypeScript";
```

Compilado conceptualmente:

```js
const framework = "TypeScript";
```

Los tipos existen para el compilador y las herramientas de desarrollo; no son una capa de validación automática en producción.

## 2. Qué problemas intenta resolver

En JavaScript es posible cometer errores que sólo aparecen al ejecutar:

```js
function total(precio, cantidad) {
  return precio * cantidad;
}

total("no-es-un-precio", 2);
```

TypeScript permite expresar el contrato:

```ts
function total(precio: number, cantidad: number): number {
  return precio * cantidad;
}
```

El objetivo no es escribir más anotaciones. El objetivo es que estados inválidos sean más difíciles de representar.

## 3. Instalación

En un proyecto Node:

```bash
npm install --save-dev typescript
```

Verificación:

```bash
npx tsc --version
```

Crear configuración:

```bash
npx tsc --init
```

## 4. Compilador

Compilar el proyecto:

```bash
npx tsc
```

Watch mode:

```bash
npx tsc --watch
```

Comprobar tipos sin emitir JavaScript:

```bash
npx tsc --noEmit
```

Esta última variante es habitual en CI cuando otra herramienta se encarga del build.

## 5. Anatomía de `tsconfig.json`

Configuración mínima orientativa:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "sourceMap": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

No existe un `tsconfig` universal. Las opciones dependen del runtime y de si el proyecto usa Node, browser, bundler, framework, librería o monorepo.

## 6. Opciones clave

### `target`

Define qué nivel de JavaScript emite el compilador.

```json
"target": "ES2022"
```

No debe confundirse con qué APIs existen en el runtime.

### `module`

Define el formato de módulos generado.

```json
"module": "ESNext"
```

### `moduleResolution`

Controla cómo se resuelven imports.

En proyectos modernos con bundler suele utilizarse una estrategia acorde al bundler; en Node deben respetarse las reglas del runtime seleccionado.

### `strict`

```json
"strict": true
```

Activa un conjunto de comprobaciones estrictas. Para proyectos nuevos debería ser la opción por defecto salvo una razón concreta para no hacerlo.

### `rootDir` / `outDir`

```json
"rootDir": "./src",
"outDir": "./dist"
```

Separan fuente y salida compilada.

## 7. Inferencia

TypeScript infiere tipos:

```ts
const nombre = "Ana"; // string
const edad = 32;       // number
```

Evitar anotaciones redundantes:

```ts
const nombre: string = "Ana";
```

No está mal, pero normalmente no aporta información adicional.

## 8. Type annotations donde sí ayudan

Parámetros públicos:

```ts
function buscarUsuario(id: number) {
  // ...
}
```

Contratos complejos:

```ts
const cache: Map<string, Usuario> = new Map();
```

APIs exportadas:

```ts
export function calcularImpuesto(total: number): number {
  return total * 0.21;
}
```

## 9. Errores de tipo vs errores de runtime

Este código puede compilar y aun fallar:

```ts
const response = await fetch("/api/data");
```

TypeScript no garantiza:

- que la red responda;
- que el JSON tenga la forma esperada;
- que una variable de entorno exista;
- que una base de datos esté disponible.

El sistema de tipos es una capa de prevención, no un sustituto de validación, tests u observabilidad.

## 10. Ciclo profesional

```text
editar
  ↓
typecheck
  ↓
lint
  ↓
tests
  ↓
build
  ↓
CI/CD
```

TypeScript aporta mayor valor cuando se integra al pipeline y no se usa sólo como extensión `.ts`.

## 11. Playground

Para experimentar con el lenguaje sin preparar un proyecto:

- https://www.typescriptlang.org/play

Es especialmente útil para estudiar inferencia y ver el JavaScript emitido.

## Checklist

- [ ] entiendo que TypeScript compila a JavaScript;
- [ ] sé ejecutar `tsc` y `tsc --noEmit`;
- [ ] puedo explicar `target`, `module`, `rootDir` y `outDir`;
- [ ] uso `strict` en proyectos nuevos;
- [ ] diferencio type safety de runtime validation.

[Siguiente: Sistema de tipos →](02-sistema-de-tipos.md)
