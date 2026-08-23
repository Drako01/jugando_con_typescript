# 08 — SASS profesional: de CSS a un sistema de estilos mantenible

> Parte de la guía **TypeScript + SASS Professional Guide** de Alejandro Di Stefano.

Este capítulo usa la propia interfaz del laboratorio como caso real. El objetivo no es aprender sintaxis aislada: es entender **cómo organizar estilos que puedan crecer sin convertirse en un archivo CSS inmanejable**.

---

## 1. ¿Qué es SASS?

SASS es un preprocesador de CSS. Permite escribir una sintaxis más expresiva y luego compilarla a CSS estándar, que es lo que finalmente interpreta el navegador.

En este repositorio se utiliza la sintaxis **SCSS**, que es compatible visualmente con CSS:

```scss
$primary: #3178c6;

.button {
  background: $primary;

  &:hover {
    filter: brightness(1.1);
  }
}
```

El navegador no recibe ese archivo. El proceso de build genera:

```css
.button { background: #3178c6; }
.button:hover { filter: brightness(1.1); }
```

---

## 2. ¿Qué problema resuelve?

En proyectos pequeños es normal comenzar con un único `styles.css`. El problema aparece cuando crecen:

- colores repetidos en decenas de reglas;
- breakpoints inconsistentes;
- selectores difíciles de rastrear;
- estilos duplicados entre componentes;
- archivos de miles de líneas;
- cambios visuales que requieren editar muchos lugares.

SASS aporta herramientas para convertir los estilos en un **sistema**.

---

## 3. Estructura utilizada en el proyecto

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

Los archivos que comienzan con `_` son **partials**. No se compilan de forma independiente: se consumen desde otros módulos.

`styles.scss` es el entry point:

```scss
@use 'base/reset';
@use 'layout/header';
@use 'layout/main';
@use 'components/forms';
@use 'components/tables';
@use 'layout/footer';
```

### ¿Por qué `@use` y no `@import`?

`@use` es el sistema moderno de módulos de SASS. Evita varios problemas históricos de `@import`, como contaminación global de variables y carga repetida de archivos.

---

## 4. Variables como design tokens

En `sass/base/_variables.scss` centralizamos decisiones visuales:

```scss
$color-bg: #08111f;
$color-surface: #0f1b2d;
$color-primary: #3178c6;
$color-primary-light: #60a5fa;
$color-accent: #cf649a;

$radius-sm: 10px;
$radius-md: 16px;
$radius-lg: 24px;

$bp-tablet: 900px;
$bp-mobile: 640px;
```

Esto permite cambiar la identidad visual desde un único lugar.

### Regla práctica

Una variable tiene sentido cuando representa una **decisión de diseño reutilizable**, no sólo porque SASS permite crear variables.

Bien:

```scss
$color-primary: #3178c6;
$radius-card: 24px;
```

Menos útil:

```scss
$margin-del-boton-de-alta: 13px;
```

---

## 5. Nesting

SCSS permite anidar reglas:

```scss
.site-footer {
  background: #07101d;

  p {
    margin: 0;
  }

  a {
    font-weight: 700;

    &:hover {
      color: white;
    }
  }
}
```

El operador `&` representa al selector padre.

### Evitar nesting excesivo

Esto es válido, pero no recomendable:

```scss
.app {
  .content {
    .card {
      .header {
        .title {
          span {}
        }
      }
    }
  }
}
```

Genera selectores rígidos y difíciles de mantener. En este proyecto se usan clases explícitas como:

```text
.form-card
.form-card__header
.form-card__icon
```

La idea toma principios de BEM sin convertirlo en una obligación dogmática.

---

## 6. Mixins

Un mixin encapsula un patrón reutilizable.

Ejemplo del proyecto:

```scss
@mixin card-surface {
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
}
```

Uso:

```scss
.form-card {
  @include card-surface;
  padding: 28px;
}
```

### Cuándo usar mixins

Úsalos para patrones como:

- responsive breakpoints;
- focus rings;
- superficies de cards;
- layouts recurrentes;
- estilos que requieren varias declaraciones coordinadas.

No conviertas cada propiedad en un mixin.

---

## 7. Responsive mediante mixins

En `_mixins.scss`:

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

Luego un componente puede definir su adaptación cerca de su estilo principal:

```scss
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@include tablet {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
```

Esto hace que la regla responsive sea fácil de localizar.

---

## 8. Mobile-first vs desktop-first

Este laboratorio utiliza principalmente un enfoque desktop-first para que la evolución respecto del proyecto original resulte evidente:

```scss
.steps {
  grid-template-columns: repeat(4, 1fr);
}

@include tablet {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include mobile {
  .steps {
    grid-template-columns: 1fr;
  }
}
```

En productos grandes suele ser útil evaluar mobile-first:

```scss
.card-grid {
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

No existe un dogma universal. Lo importante es que el equipo adopte una estrategia consistente.

---

## 9. Grid y Flexbox

SASS no reemplaza CSS moderno. Lo organiza.

### Grid

Se usa cuando importa la distribución bidimensional:

```scss
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}
```

### Flexbox

Se usa para alineaciones en un eje:

```scss
.form-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
}
```

Un error frecuente es intentar resolver todo con una sola herramienta.

---

## 10. Formularios profesionales

Los controles deben tener estados visuales claros:

```scss
.field input,
.field select {
  border: 1px solid $color-border;
  transition: border-color $transition;

  &:focus {
    border-color: $color-primary-light;
    @include focus-ring;
  }
}
```

Esto mejora:

- accesibilidad;
- navegación por teclado;
- feedback visual;
- consistencia del producto.

Nunca elimines un `outline` sin ofrecer un reemplazo visible.

---

## 11. Tablas responsive

Una tabla de datos extensa no debería destruir el layout mobile.

Patrón usado:

```html
<div class="table-scroll">
  <table class="data-table">...</table>
</div>
```

```scss
.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  min-width: 760px;
}
```

El contenido mantiene legibilidad y el usuario desplaza sólo la tabla.

---

## 12. Accesibilidad visual

El diseño profesional no es sólo estética.

Este laboratorio contempla:

- `:focus-visible` y focus rings;
- contraste suficiente;
- tamaños de controles cómodos;
- labels explícitos;
- tablas dentro de regiones desplazables;
- tipografía legible;
- estados activos/inactivos que no dependen únicamente del color.

---

## 13. Compilación

El repositorio incluye scripts reproducibles:

```bash
npm run styles
```

Compila:

```text
sass/styles.scss
        ↓
assets/css/styles.css
```

Durante desarrollo:

```bash
npm run styles:watch
```

Build completo:

```bash
npm run build
```

Ese comando compila TypeScript y SASS.

---

## 14. ¿Por qué se versiona también el CSS compilado?

En este repositorio tiene sentido porque el laboratorio puede abrirse como sitio estático sin requerir un servidor Node en producción.

Por eso se conservan ambos:

```text
sass/                 → fuente educativa
assets/css/styles.css → artefacto ejecutable en navegador
```

En una aplicación con Vite, Next.js, Angular u otro bundler, normalmente el CSS generado sería responsabilidad del pipeline de build.

---

## 15. SASS y CSS Custom Properties

No son rivales.

SASS se resuelve en build time:

```scss
$primary: #3178c6;
```

Las Custom Properties viven en runtime:

```css
:root {
  --primary: #3178c6;
}
```

CSS variables son ideales para:

- theming;
- dark/light mode;
- valores modificables desde JavaScript;
- herencia dinámica.

SASS variables son útiles para:

- cálculos de build;
- tokens privados del sistema;
- mixins;
- generación de reglas.

En sistemas complejos es normal usar ambas.

---

## 16. Funciones y cálculos

SASS permite operaciones:

```scss
$base-space: 8px;

.card {
  padding: $base-space * 3;
}
```

También existen módulos como:

```scss
@use 'sass:color';

.button:hover {
  background: color.adjust($color-primary, $lightness: 8%);
}
```

Esto es preferible a utilidades globales antiguas que SASS está deprecando progresivamente.

---

## 17. Arquitectura recomendada para proyectos mayores

Una evolución posible:

```text
sass/
├── abstracts/
│   ├── _tokens.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
├── layout/
├── pages/
├── themes/
└── styles.scss
```

No copies arquitecturas gigantes para una landing de tres componentes. La arquitectura debe acompañar al tamaño real del producto.

---

## 18. Errores comunes

### Usar SASS sólo para nesting

Si el proyecto sólo reemplaza:

```css
.card .header .title {}
```

por nesting, no está aprovechando el preprocesador.

### Crear demasiadas variables

No todo valor debe convertirse en token.

### Selectores excesivamente específicos

Cuanto más específico el selector, más difícil será sobrescribirlo.

### Mezclar estructura y hacks

Si un componente necesita diez `!important`, normalmente hay un problema de arquitectura.

### No compilar en CI

El código SASS puede contener errores aunque el CSS previamente generado siga funcionando. Por eso el build debe validar ambas capas.

---

## 19. Ejercicio sugerido

Implementá un modo claro utilizando Custom Properties y mantené SASS para la estructura del sistema.

Objetivos:

1. agregar tokens de tema;
2. crear un botón de cambio de tema;
3. persistir la preferencia en `localStorage`;
4. tipar esa preferencia con TypeScript;
5. respetar `prefers-color-scheme` como valor inicial.

Este ejercicio conecta los dos aprendizajes del repositorio: **TypeScript + SASS/CSS**.

---

## 20. Checklist de SASS profesional

- [ ] Entry point claro.
- [ ] Partials por responsabilidad.
- [ ] `@use` en lugar del antiguo `@import`.
- [ ] Tokens centralizados.
- [ ] Mixins sólo cuando existe reutilización real.
- [ ] Nesting corto y controlado.
- [ ] Responsive consistente.
- [ ] Focus states visibles.
- [ ] CSS generado por un script reproducible.
- [ ] Build validado en CI.
- [ ] Fuente SCSS y artefacto CSS coherentes.

---

## Siguiente paso

Volvé a la aplicación y abrí en paralelo:

```text
index.html
sass/base/_variables.scss
sass/components/_forms.scss
sass/layout/_main.scss
assets/css/styles.css
```

La mejor forma de aprender SASS en este repositorio es observar **cómo una decisión conceptual en SCSS termina materializándose en la interfaz real**.

---

**Autor:** [Alejandro Di Stefano](https://github.com/Drako01)
