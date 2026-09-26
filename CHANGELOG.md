# Changelog

Todos los cambios relevantes del repositorio se documentan en este archivo.

El proyecto utiliza [Semantic Versioning](https://semver.org/) como criterio de versionado del material.

## [2.1.0] — Responsive UI + SASS Learning Edition

### Added

- rediseño visual completo de la aplicación educativa;
- interfaz responsive para desktop, tablet y mobile;
- navegación sticky y hero pedagógico;
- flujo visual de carga Categoría → Profesor → Curso → Alumno;
- cards de formularios reutilizables;
- tablas responsive con scroll horizontal controlado;
- estados visuales activo/inactivo;
- focus states accesibles;
- sistema de design tokens en SASS;
- mixins de superficie, foco y breakpoints;
- arquitectura SASS modular basada en `@use`;
- tutorial completo `docs/08-sass-profesional.md`;
- scripts `styles` y `styles:watch`;
- compilación de TypeScript + SASS desde `npm run build`;
- CSS compilado versionado para poder abrir el laboratorio como sitio estático.

### Changed

- aplicación reposicionada como laboratorio conjunto de TypeScript + SASS;
- eliminación de la dependencia visual de Bootstrap en `index.html`;
- formularios reorganizados semánticamente;
- tablas generadas desde TypeScript con markup propio y accesible;
- helpers de localStorage refactorizados y tipados;
- sanitización básica del contenido renderizado en tablas;
- generación de comisión con control de colisiones;
- flujo de formularios sin recargas involuntarias;
- refresco automático de selects y tablas después de cada alta;
- `package.json` actualizado a v2.1.0.

### Fixed

- submit de Profesor y Categoría que podía recargar la página por falta de `preventDefault()`;
- tablas que no reflejaban inmediatamente las altas nuevas;
- ausencia de un contenedor responsive para datasets anchos;
- SASS original con `_variables.scss` y `_header.scss` vacíos;
- estilos demasiado dependientes de Bootstrap para un repositorio cuyo objetivo es enseñar frontend.

## [2.0.0] — Professional TypeScript Guide

### Added

- tutorial profesional organizado en capítulos;
- fundamentos del compilador y `tsconfig`;
- sistema de tipos completo;
- `type`, `interface`, unions, intersections y literal types;
- `unknown`, `never`, `readonly`, `as const` y `satisfies`;
- funciones, overloads y contratos;
- clases, abstracción, composición y structural typing;
- narrowing y type guards;
- discriminated unions;
- generics y constraints;
- `keyof`, indexed access y mapped types;
- conditional types e `infer`;
- Utility Types;
- Promises y async/await;
- DTOs, APIs tipadas y runtime validation;
- ES Modules;
- DOM, events, forms y localStorage;
- arquitectura frontend orientativa;
- strict mode y configuración profesional;
- linting, formatting, testing y CI;
- migración gradual desde JavaScript;
- `.d.ts`, `@types`, project references y publicación de librerías;
- cheat sheet de consulta rápida;
- navegación progresiva entre capítulos;
- release notes para v2.0.0.

### Changed

- README reconstruido como landing técnica e índice del curso;
- repositorio reposicionado de ejemplo aislado a material formativo y de referencia;
- autoría de Alejandro Di Stefano destacada en encabezado y cierre;
- aplicación existente documentada como laboratorio práctico;
- conceptos explicados con foco en uso profesional y no sólo sintaxis.

### Preserved

- aplicación original y su dominio académico;
- modelos `Alumno`, `Profesor`, `Curso` y `Categoria`;
- ejemplos DOM;
- persistencia con localStorage;
- licencia MIT original.

## [1.0.0]

Versión inicial del proyecto: aplicación educativa para experimentar con TypeScript, clases, DOM y persistencia local.
