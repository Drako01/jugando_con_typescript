# v2.1.0 — Responsive UI + SASS Learning Edition

Esta versión transforma el laboratorio de TypeScript en una experiencia visual y pedagógica más completa e incorpora **SASS como segundo eje de aprendizaje**.

## Qué cambia

La aplicación de gestión académica deja de ser sólo un ejemplo funcional y pasa a ser también el caso práctico del tutorial de estilos.

### Nueva interfaz

- diseño oscuro profesional inspirado en herramientas de desarrollo modernas;
- responsive real para desktop, tablet y mobile;
- hero introductorio;
- navegación sticky;
- flujo pedagógico de carga de datos;
- formularios en cards;
- layout con CSS Grid y Flexbox;
- tablas responsive;
- estados activos/inactivos;
- mejoras de contraste, foco y legibilidad;
- eliminación de Bootstrap del HTML para que los estilos del laboratorio sean propios y estudiables.

### SASS como segundo aprendizaje

Se incorpora un tutorial completo en:

`docs/08-sass-profesional.md`

Incluye:

- qué es SASS y cómo se compila;
- SCSS;
- partials;
- `@use`;
- design tokens;
- variables;
- nesting;
- mixins;
- `@content`;
- responsive design;
- Grid y Flexbox;
- arquitectura de estilos;
- formularios;
- tablas responsive;
- accesibilidad;
- CSS Custom Properties vs variables SASS;
- build pipeline;
- errores comunes;
- checklist profesional.

## Arquitectura SASS

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

## Mejoras TypeScript

La UI también se refactoriza para mostrar mejores patrones:

- helper genérico de selección de elementos DOM;
- formularios sin reload;
- refresco automático de tablas y selects;
- helpers tipados para localStorage;
- render de tablas encapsulado;
- sanitización básica del contenido interpolado;
- comisión con control de colisiones;
- separación más clara entre entrada de datos, persistencia y renderizado.

## Scripts

```bash
npm run typecheck
npm run styles
npm run styles:watch
npm run build
```

`npm run build` valida y compila TypeScript y luego genera el CSS desde SASS.

## Objetivo educativo

A partir de esta versión el repositorio permite estudiar dos capas de una aplicación frontend de forma integrada:

```text
TypeScript
   ↓
Lógica + DOM + tipos + estado

SASS
   ↓
Diseño + componentes + responsive + arquitectura CSS
```

La aplicación conecta ambas capas en un ejemplo concreto, pequeño y suficientemente completo para experimentar.

---

**Autor:** [Alejandro Di Stefano](https://github.com/Drako01)
