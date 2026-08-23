# 03 — Funciones, objetos y clases

> Objetivo: definir contratos claros para comportamiento y dominio, y entender cuándo usar OOP, composición y funciones.

## Funciones

```ts
function sumar(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const sumar = (a: number, b: number): number => a + b;
```

## Parámetros opcionales

```ts
function saludar(nombre: string, apellido?: string): string {
  return apellido ? `${nombre} ${apellido}` : nombre;
}
```

Los opcionales deben ubicarse después de los requeridos salvo patrones especiales.

## Valores por defecto

```ts
function paginar(page = 1, pageSize = 20) {
  return { page, pageSize };
}
```

TypeScript infiere `number`.

## Rest parameters

```ts
function sumarTodos(...valores: number[]): number {
  return valores.reduce((acc, value) => acc + value, 0);
}
```

## Function types

```ts
type Comparador<T> = (a: T, b: T) => number;
```

Ejemplo:

```ts
const porPrecio: Comparador<Producto> = (a, b) => a.precio - b.precio;
```

## Callbacks

```ts
function ejecutar(callback: () => void): void {
  callback();
}
```

Evitar `Function` como tipo: es demasiado amplio y pierde información sobre parámetros y retorno.

## Overloads

```ts
function parse(value: string): number;
function parse(value: number): string;
function parse(value: string | number): string | number {
  return typeof value === "string"
    ? Number(value)
    : String(value);
}
```

Los overloads son útiles cuando distintas entradas producen retornos claramente relacionados. No deben usarse para tapar una API confusa.

## Objetos como parámetros

En vez de:

```ts
function crearUsuario(nombre: string, email: string, edad: number, activo: boolean) {}
```

Puede ser más escalable:

```ts
type CrearUsuarioInput = {
  nombre: string;
  email: string;
  edad: number;
  activo?: boolean;
};

function crearUsuario(input: CrearUsuarioInput) {}
```

Mejora legibilidad, evolución y autocompletado.

## Classes

```ts
class Usuario {
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

### Modificadores

- `public`: accesible desde afuera;
- `private`: accesible dentro de la clase;
- `protected`: clase y subclases;
- `readonly`: no reasignable luego de inicializar.

Los modificadores TypeScript son principalmente garantías estáticas. Para privacidad real de JavaScript también existen campos `#private`.

## Getters y setters

```ts
class Cuenta {
  private _saldo = 0;

  get saldo(): number {
    return this._saldo;
  }

  depositar(importe: number): void {
    if (importe <= 0) throw new Error("Importe inválido");
    this._saldo += importe;
  }
}
```

En dominio, un método explícito como `depositar()` suele comunicar mejor la intención que un setter genérico.

## Herencia

```ts
abstract class Persona {
  constructor(public nombre: string) {}

  abstract describir(): string;
}

class Profesor extends Persona {
  describir(): string {
    return `Profesor: ${this.nombre}`;
  }
}
```

## Abstract classes

Permiten definir comportamiento común y miembros obligatorios.

Son útiles cuando existe realmente una relación jerárquica. No deberían ser la herramienta por defecto para reutilizar código.

## Implements

```ts
interface Serializable {
  serialize(): string;
}

class Pedido implements Serializable {
  serialize(): string {
    return JSON.stringify(this);
  }
}
```

`implements` verifica que la clase cumpla el contrato.

## Composición sobre herencia

En muchos diseños, composición produce menos acoplamiento:

```ts
interface Logger {
  info(message: string): void;
}

class UserService {
  constructor(private readonly logger: Logger) {}

  create(): void {
    this.logger.info("Creating user");
  }
}
```

La clase depende de un contrato, no de una implementación concreta.

## Structural typing

TypeScript usa tipado estructural.

```ts
interface ConNombre {
  nombre: string;
}

const value = { nombre: "Ana", edad: 30 };

function imprimir(item: ConNombre) {}

imprimir(value); // válido
```

Importa la forma del objeto, no que haya declarado explícitamente implementar una interfaz.

## Clases y datos provenientes de JSON

Un punto frecuente:

```ts
class Usuario {
  saludar() {
    return "hola";
  }
}

const raw = JSON.parse('{"id":1}');
```

`raw` no se convierte automáticamente en una instancia de `Usuario`. JSON contiene datos, no prototipos ni métodos.

Para rehidratar modelos hay que construir instancias explícitamente o usar otra estrategia de dominio.

Esto es relevante para el laboratorio del repo, que guarda entidades en `localStorage`.

## Value Objects

Para dominios complejos, encapsular invariantes puede ser mejor que pasar primitivos libres:

```ts
class Email {
  private constructor(public readonly value: string) {}

  static create(value: string): Email {
    if (!value.includes("@")) throw new Error("Email inválido");
    return new Email(value);
  }
}
```

## Checklist

- [ ] tipifico parámetros y retornos públicos;
- [ ] prefiero contratos de objeto para funciones con muchos argumentos;
- [ ] entiendo `public`, `private`, `protected` y `readonly`;
- [ ] uso herencia sólo cuando representa el dominio;
- [ ] considero composición para reducir acoplamiento;
- [ ] sé que JSON no reconstruye instancias de clases.

[← Sistema de tipos](02-sistema-de-tipos.md) · [Siguiente: Narrowing y tipos avanzados →](04-narrowing-tipos-avanzados.md)
