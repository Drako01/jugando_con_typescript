# 07 — TypeScript profesional

> Objetivo: llevar TypeScript desde “compila” a una práctica sostenible en equipos, CI/CD y proyectos de producción.

## 1. `strict` como baseline

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

`strict` activa un conjunto de validaciones que hacen que el sistema de tipos sea mucho más útil.

En proyectos nuevos debería ser el punto de partida. En proyectos heredados puede activarse gradualmente.

## 2. Opciones estrictas adicionales

### `noUncheckedIndexedAccess`

```json
"noUncheckedIndexedAccess": true
```

Con:

```ts
const items = ["a", "b"];
const first = items[0];
```

El tipo pasa a contemplar `undefined`, porque el índice podría no existir.

### `exactOptionalPropertyTypes`

Distingue mejor entre una propiedad ausente y una propiedad cuyo valor es explícitamente `undefined`.

### `noImplicitOverride`

Obliga a marcar overrides de miembros heredados.

### `noFallthroughCasesInSwitch`

Ayuda a evitar fallthrough accidental.

No activar opciones al azar en una codebase grande: medir errores, migrar y documentar la política.

## 3. Type assertions

```ts
const input = document.querySelector("#email") as HTMLInputElement;
```

`as` no convierte ni valida. Sólo modifica lo que el compilador cree.

Antes de usar una assertion, evaluar:

- ¿puedo hacer narrowing?
- ¿puedo cambiar la API para que infiera mejor?
- ¿el dato viene de una frontera externa que debería validar?

## 4. Non-null assertion

```ts
const root = document.getElementById("root")!;
```

El `!` dice “sé que no es null”. Si la suposición es falsa, el runtime falla.

Usarlo sólo cuando la invariante esté realmente garantizada.

## 5. No abusar de tipos explícitos

Evitar ruido:

```ts
const active: boolean = true;
```

Preferible cuando es obvio:

```ts
const active = true;
```

En cambio, anotar contratos públicos puede ser beneficioso:

```ts
export function calculateTotal(items: Item[]): Money {
  // ...
}
```

## 6. Tipos de dominio

Evitar primitive obsession cuando existen reglas relevantes.

```ts
type Currency = "ARS" | "USD";

type Money = {
  amount: number;
  currency: Currency;
};
```

Para invariantes fuertes pueden utilizarse value objects.

## 7. Estados imposibles

Código débil:

```ts
type RequestState = {
  loading: boolean;
  data?: User;
  error?: Error;
};
```

Permite combinaciones contradictorias.

Mejor:

```ts
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: Error };
```

Diseñar tipos para eliminar estados inválidos reduce validaciones dispersas.

## 8. Linting

TypeScript chequea tipos; un linter controla otras reglas de calidad.

En proyectos profesionales suele utilizarse ESLint con soporte TypeScript.

Ejemplos de reglas útiles:

- imports inconsistentes;
- promises no esperadas;
- variables sin usar;
- assertions riesgosas;
- uso de `any`;
- convenciones del equipo.

El linter no debería convertirse en una colección de reglas cosméticas que bloquean más de lo que ayudan.

## 9. Formatting

Un formatter automático reduce discusiones irrelevantes sobre estilo.

El formato debe ser determinista y ejecutable en CI.

## 10. Testing

TypeScript no sustituye tests.

El compilador puede verificar:

```ts
sumar("1", 2); // error de tipo
```

Pero no puede demostrar que:

```ts
sumar(1, 2) === 3
```

si la implementación está equivocada.

Necesitamos tests para comportamiento.

## 11. Tests de tipos

Librerías y APIs genéricas pueden necesitar tests que comprueben inferencia o errores esperados.

```ts
// @ts-expect-error argumento inválido intencional
fn("incorrecto");
```

`@ts-expect-error` es preferible a ignorar errores indiscriminadamente cuando estamos probando un caso negativo.

## 12. Evitar `@ts-ignore`

```ts
// @ts-ignore
```

Silencia un error aunque posteriormente deje de ser necesario.

En casos inevitables, documentar el motivo y preferir mecanismos verificables como `@ts-expect-error`.

## 13. `.d.ts`

Los archivos de declaración describen tipos de JavaScript existente.

```ts
declare module "legacy-lib" {
  export function parse(value: string): unknown;
}
```

Para librerías propias, TypeScript puede emitir declaraciones:

```json
"declaration": true
```

## 14. `@types`

Muchas librerías JavaScript publican tipos mediante paquetes `@types/*` mantenidos en DefinitelyTyped.

Ejemplo conceptual:

```bash
npm install --save-dev @types/node
```

No instalar `@types` si la librería ya incluye sus propios tipos.

## 15. Node y browser no son el mismo entorno

El `lib`, los tipos globales y la resolución de módulos dependen del runtime.

Browser conoce:

- `document`;
- `window`;
- DOM APIs.

Node conoce otras APIs mediante sus type definitions.

Una configuración correcta debe reflejar dónde corre el programa.

## 16. Monorepos y Project References

Para codebases grandes, TypeScript soporta project references:

```json
{
  "references": [
    { "path": "../core" },
    { "path": "../api" }
  ]
}
```

Pueden mejorar límites, build incremental y arquitectura, pero añaden complejidad. No son necesarios para una app pequeña.

## 17. Migrar JavaScript a TypeScript

Estrategia gradual:

```text
JavaScript existente
      ↓
allowJs + checkJs donde convenga
      ↓
renombrar módulos críticos a .ts
      ↓
reducir any
      ↓
activar strict progresivamente
      ↓
endurecer configuración
```

No es necesario reescribir un sistema completo para obtener valor.

## 18. `any` budget

En migraciones puede resultar práctico aceptar `any` temporalmente, pero debe existir una política:

- justificar;
- encapsular;
- registrar deuda;
- reducir con el tiempo.

Un `any` en un boundary puede propagarse por toda la aplicación.

## 19. Validación en boundaries

Tratar como `unknown` inicialmente:

- APIs externas;
- `JSON.parse`;
- DB drivers cuando el esquema no está garantizado;
- variables de entorno;
- localStorage;
- archivos;
- mensajes externos.

Después validar y recién entonces convertir en tipos de dominio.

## 20. CI recomendado

Pipeline conceptual:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

Si el typecheck sólo ocurre en la notebook de un desarrollador, no es una garantía del repositorio.

## 21. Publicar librerías TypeScript

Una librería necesita pensar en:

- JavaScript emitido;
- ESM/CommonJS según soporte;
- `exports`;
- archivos `.d.ts`;
- source maps;
- compatibilidad de `target`;
- versionado semántico;
- breaking changes de tipos.

Cambiar un tipo público puede ser un breaking change aunque el JavaScript siga funcionando.

## 22. Performance del type checker

Codebases grandes pueden degradar su experiencia por:

- unions gigantes;
- tipos recursivos complejos;
- exceso de conditional types;
- inclusión accidental de carpetas enormes;
- monorepos mal segmentados.

Los tipos también tienen costo de mantenimiento y compilación.

## 23. Review checklist

Antes de aprobar código TypeScript:

- ¿hay `any` nuevo sin justificación?
- ¿las assertions son necesarias?
- ¿los estados están bien modelados?
- ¿se validan datos externos?
- ¿hay duplicación de contratos?
- ¿los generics preservan información real?
- ¿los nombres de tipos representan el dominio?
- ¿los errores esperables están modelados?
- ¿el código compila con la configuración del repo?

## 24. Señal de madurez

TypeScript maduro no significa “muchos tipos complejos”.

Significa:

- contratos claros;
- inferencia aprovechada;
- boundaries validados;
- poco `any`;
- configuración estricta;
- APIs fáciles de consumir;
- tipos que siguen al dominio;
- CI que impide regresiones.

## Checklist final

- [ ] uso TypeScript como herramienta de diseño, no sólo sintaxis;
- [ ] diferencio typecheck, lint y tests;
- [ ] tengo políticas para `any` y assertions;
- [ ] valido boundaries;
- [ ] integro el compilador en CI;
- [ ] considero los tipos públicos parte del contrato versionado.

[← Módulos y aplicaciones](06-modulos-dom-aplicaciones.md) · [Cheat Sheet →](cheatsheet.md)
