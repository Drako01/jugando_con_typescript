# TypeScript Guide v2.0.0 — Professional Edition

Esta versión transforma `jugando_con_typescript` de un proyecto de experimentación en una **guía completa de TypeScript con laboratorio práctico incluido**.

## Highlights

- Ruta de aprendizaje progresiva desde fundamentos hasta temas avanzados.
- Sistema de tipos explicado con ejemplos concretos.
- Interfaces, aliases, unions, intersections y literal types.
- Narrowing, type guards y discriminated unions.
- Generics, `keyof`, indexed access, mapped y conditional types.
- Utility Types y contratos derivados.
- Async/await, APIs tipadas y runtime validation.
- DOM, formularios, eventos y localStorage.
- OOP, composición y diseño de contratos.
- Strict mode y configuración de proyectos reales.
- Testing, linting, CI y estrategia de migración desde JavaScript.
- Cheat sheet para consulta diaria.
- Aplicación original preservada como laboratorio funcional.

## Nueva documentación

```text
docs/
├── 01-fundamentos-entorno.md
├── 02-sistema-de-tipos.md
├── 03-funciones-objetos-clases.md
├── 04-narrowing-tipos-avanzados.md
├── 05-utility-types-apis.md
├── 06-modulos-dom-aplicaciones.md
├── 07-typescript-profesional.md
└── cheatsheet.md
```

## Enfoque

La documentación evita presentar TypeScript como “JavaScript con anotaciones”. El foco está puesto en:

- modelado de dominio;
- contratos explícitos;
- eliminación de estados inválidos;
- validación de boundaries;
- seguridad de tipos;
- mantenibilidad;
- decisiones de arquitectura;
- prácticas de ingeniería aplicables en equipos.

## Compatibilidad

La aplicación educativa existente se conserva como ejemplo práctico. No se elimina el código histórico ni el funcionamiento basado en DOM y `localStorage`.

## Autor

**Alejandro Di Stefano**  
GitHub: https://github.com/Drako01

## Release sugerida en GitHub

- **Tag:** `v2.0.0`
- **Title:** `TypeScript Guide v2.0.0 — Professional Edition`
- **Target:** `main`, luego de mergear el PR de profesionalización.
