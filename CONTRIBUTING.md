# Contributing to ArmoTuSitio.com Lab

Gracias por querer contribuir.

Este repositorio acepta mejoras de código, contenido educativo, UX/UI, accesibilidad, responsive, documentación y nuevos ejercicios.

El objetivo es mantener una plataforma simple de estudiar, técnicamente correcta y fácil de ejecutar sin introducir complejidad innecesaria.

---

## Antes de empezar

1. Revisá los issues abiertos para evitar trabajo duplicado.
2. Para cambios grandes, abrí primero un issue describiendo la propuesta.
3. Mantené cada Pull Request enfocado en un único objetivo.
4. No mezcles refactors masivos con nuevas features salvo que sea imprescindible.
5. Respetá la arquitectura existente basada en TypeScript + SASS + HTML estático.

---

## Flujo de contribución

### 1. Fork

Hacé un fork del repositorio desde GitHub.

### 2. Cloná tu fork

~~~bash
git clone https://github.com/TU_USUARIO/jugando_con_typescript.git
cd jugando_con_typescript
npm ci
~~~

### 3. Creá una rama

Usá nombres descriptivos:

~~~bash
git switch -c feat/nombre-de-la-mejora
~~~

Convenciones recomendadas:

- <code>feat/...</code> para nuevas funcionalidades
- <code>fix/...</code> para correcciones
- <code>docs/...</code> para documentación
- <code>refactor/...</code> para refactors sin cambio funcional
- <code>style/...</code> para cambios visuales
- <code>test/...</code> para tests o validaciones

---

## Desarrollo

### Validar TypeScript

~~~bash
npm run typecheck
~~~

### Build completo

~~~bash
npm run build
~~~

### SASS en modo watch

~~~bash
npm run styles:watch
~~~

### TypeScript en modo watch

~~~bash
npm run watch
~~~

Antes de abrir un Pull Request deben pasar, como mínimo:

~~~bash
npm run typecheck
npm run build
~~~

---

## Criterios de código

### TypeScript

- mantené <code>strict</code> compatible;
- evitá <code>any</code> salvo justificación clara;
- preferí <code>unknown</code> para datos externos;
- no dupliques contratos si pueden derivarse;
- separá dominio, persistencia y presentación cuando corresponda;
- evitá assertions innecesarias;
- no rompas la compatibilidad del laboratorio con GitHub Pages.

### SASS / SCSS

- mantené la arquitectura modular existente;
- preferí <code>@use</code>;
- evitá nesting profundo;
- reutilizá tokens y mixins existentes antes de crear otros;
- verificá desktop, tablet y mobile;
- respetá <code>prefers-reduced-motion</code> y estados de foco.

### HTML y accesibilidad

- usá HTML semántico;
- mantené navegación por teclado;
- asociá labels correctamente;
- no elimines focus visible;
- usá ARIA sólo cuando sea necesario;
- cuidá contraste y legibilidad.

---

## Contenido educativo

Si agregás o modificás una lección:

- mantené el lenguaje claro y técnicamente preciso;
- explicá el porqué, no sólo la sintaxis;
- incluí ejemplos pequeños y verificables;
- evitá presentar atajos inseguros como buenas prácticas;
- relacioná el contenido con el laboratorio cuando tenga sentido;
- actualizá <code>type/learning/catalog.ts</code> si cambia metadata, búsqueda, nivel, duración u objetivos.

---

## UX/UI

La plataforma tiene una identidad visual propia.

Antes de introducir un patrón nuevo:

1. revisá si ya existe un componente visual equivalente;
2. reutilizá tokens del sistema;
3. evitá inconsistencias de tamaño, spacing y tipografía;
4. comprobá responsive;
5. no introduzcas frameworks de UI sin discusión previa.

---

## Commits

Preferí mensajes breves y descriptivos.

Ejemplos:

~~~text
feat: add TypeScript practice challenge
fix: preserve course progress after refresh
docs: clarify contribution workflow
style: improve mobile course navigation
~~~

No es obligatorio usar Conventional Commits estrictamente, pero mantener esta estructura facilita el historial.

---

## Abrir un Pull Request

El PR debe apuntar a <code>main</code>.

Incluí:

- qué problema resuelve;
- qué cambió;
- cómo lo validaste;
- screenshots si modifica UX/UI;
- cualquier limitación o decisión relevante.

Un ejemplo de descripción:

~~~text
## Objetivo
Agrega búsqueda por título dentro del laboratorio.

## Cambios
- nuevo filtro tipado
- estado vacío cuando no hay coincidencias
- ajustes responsive

## Validación
- npm run typecheck
- npm run build
- prueba manual desktop/mobile
~~~

GitHub Actions ejecutará automáticamente el typecheck y el build sobre Pull Requests contra <code>main</code>.

No es necesario modificar <code>gh-pages</code>: el deploy se genera automáticamente después de integrar cambios en <code>main</code>.

---

## Qué conviene evitar

- subir <code>node_modules</code>;
- commitear assets generados manualmente cuando el build los produce;
- modificar <code>gh-pages</code> directamente;
- agregar dependencias sin necesidad real;
- introducir frameworks que oculten los conceptos que el proyecto intenta enseñar;
- mezclar cambios no relacionados dentro del mismo PR;
- desactivar validaciones para hacer pasar el CI.

---

## Reportar bugs

Al abrir un issue, incluí cuando sea posible:

- comportamiento esperado;
- comportamiento actual;
- pasos para reproducir;
- navegador y viewport;
- screenshots o logs;
- commit o URL donde aparece el problema.

---

## Licencia de las contribuciones

Al enviar una contribución aceptás que quede publicada bajo la misma licencia MIT del repositorio.

Ver [LICENCE](./LICENCE).

---

Gracias por ayudar a mejorar **ArmoTuSitio.com Lab**.
