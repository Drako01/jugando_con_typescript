export type CourseId = "typescript" | "sass" | "practice";
export type LearningLevel = "Fundamentos" | "Intermedio" | "Avanzado" | "Profesional";

export interface LessonMeta {
  id: string;
  title: string;
  level: LearningLevel;
  minutes: number;
  objectives: string[];
  keywords: string[];
  labHref?: string;
}

export interface CourseMeta {
  id: CourseId;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  accent: string;
  lessons: LessonMeta[];
}

const levelFor = (index: number): LearningLevel => {
  if (index <= 3) return "Fundamentos";
  if (index <= 6) return "Intermedio";
  if (index <= 9) return "Avanzado";
  return "Profesional";
};

const lesson = (
  course: "ts" | "sass",
  index: number,
  title: string,
  minutes: number,
  objectives: string[],
  keywords: string[],
  labHref?: string
): LessonMeta => ({
  id: `${course}-${String(index).padStart(2, "0")}`,
  title,
  level: levelFor(index),
  minutes,
  objectives,
  keywords,
  labHref
});

export const courses: CourseMeta[] = [
  {
    id: "typescript",
    title: "TypeScript Profesional",
    shortTitle: "TypeScript",
    description: "Del sistema de tipos a arquitectura, boundaries y prácticas de producción.",
    href: "./learn-typescript.html",
    accent: "#60a5fa",
    lessons: [
      lesson("ts",1,"Modelo mental",8,["Diferenciar compile time de runtime","Entender qué aporta el sistema de tipos"],["tipos","compile time","runtime"]),
      lesson("ts",2,"Tipos y contratos",12,["Usar primitives, unions e interfaces","Dejar que la inferencia trabaje a favor"],["interface","type","union","inferencia"],"./index.html#formularios"),
      lesson("ts",3,"Funciones y objetos",12,["Diseñar firmas claras","Modelar entradas y salidas"],["funciones","objetos","return"],"./index.html#formularios"),
      lesson("ts",4,"Narrowing",10,["Reducir unions con evidencia","Usar guards y discriminated unions"],["narrowing","guards","union"]),
      lesson("ts",5,"Genéricos y utilities",14,["Preservar información con generics","Derivar contratos con Utility Types"],["generic","partial","pick","omit","record"]),
      lesson("ts",6,"DOM y módulos",14,["Tipar DOM y eventos","Usar módulos ES de forma segura"],["dom","eventos","modules","queryselector"],"./index.html#formularios"),
      lesson("ts",7,"Arquitectura real",12,["Separar dominio, persistencia y UI","Reconocer responsabilidades"],["arquitectura","dominio","storage"],"./index.html#formularios"),
      lesson("ts",8,"Strict y tsconfig",10,["Configurar strict","Comprender opciones críticas del compilador"],["strict","tsconfig","compiler"]),
      lesson("ts",9,"Clases y dominio",12,["Encapsular invariantes","Elegir clase vs interface"],["clases","poo","dominio"]),
      lesson("ts",10,"Async y errores",14,["Modelar Promise<T>","Tratar errores como unknown"],["async","await","promise","error"]),
      lesson("ts",11,"Boundaries y DTOs",14,["Validar datos externos","Separar DTO de dominio"],["dto","api","unknown","localstorage"],"./index.html#resultados"),
      lesson("ts",12,"TypeScript profesional",12,["Definir criterios de calidad","Integrar typecheck, tests y CI"],["ci","testing","any","production"])
    ]
  },
  {
    id: "sass",
    title: "SASS Profesional",
    shortTitle: "SASS",
    description: "De SCSS básico a un sistema visual modular, accesible y mantenible.",
    href: "./learn-sass.html",
    accent: "#e879b2",
    lessons: [
      lesson("sass",1,"Qué resuelve SASS",8,["Comprender el rol del preprocesador","Diferenciar SCSS de CSS final"],["scss","css","preprocesador"]),
      lesson("sass",2,"Variables y nesting",10,["Crear tokens útiles","Controlar profundidad de nesting"],["variables","nesting","tokens"]),
      lesson("sass",3,"Partials y módulos",10,["Organizar responsabilidades","Usar @use en lugar de @import"],["partials","use","modules"]),
      lesson("sass",4,"Mixins y funciones",12,["Reutilizar patrones","Elegir mixin vs función"],["mixins","functions"]),
      lesson("sass",5,"Responsive",12,["Diseñar mobile-first","Definir breakpoints por contenido"],["responsive","mobile first","media queries"],"./index.html#formularios"),
      lesson("sass",6,"Arquitectura",12,["Separar base, layout y componentes","Evitar sobrearquitectura"],["architecture","bem","components"]),
      lesson("sass",7,"Build profesional",10,["Compilar de forma reproducible","Entender CSS como artefacto final"],["build","sass cli","production"]),
      lesson("sass",8,"Maps y loops",12,["Usar colecciones con criterio","Generar patrones sin inflar CSS"],["maps","loops","each"]),
      lesson("sass",9,"Design tokens",10,["Centralizar decisiones visuales","Diseñar tokens semánticos"],["design tokens","variables"]),
      lesson("sass",10,"Custom Properties",12,["Combinar build time y runtime","Preparar theming"],["css variables","custom properties","theme"]),
      lesson("sass",11,"Accesibilidad",10,["Diseñar focus visible","Respetar reduced motion"],["a11y","focus","reduced motion"]),
      lesson("sass",12,"Performance",10,["Controlar especificidad","Auditar el CSS compilado"],["performance","specificity","css"])
    ]
  }
];

export const practiceMeta = {
  id: "practice" as const,
  title: "Modo práctica",
  href: "./practice.html",
  total: 8
};

export const glossary = [
  { term: "any", course: "TypeScript", definition: "Desactiva gran parte de la seguridad del sistema de tipos. Conviene encapsularlo y reducirlo." },
  { term: "unknown", course: "TypeScript", definition: "Tipo seguro para datos que todavía no fueron validados. Obliga a hacer narrowing antes de usarlos." },
  { term: "narrowing", course: "TypeScript", definition: "Proceso de reducir un tipo amplio a uno más específico usando evidencia en runtime." },
  { term: "DTO", course: "TypeScript", definition: "Contrato de transporte. Puede diferir del modelo de dominio y suele mapearse explícitamente." },
  { term: "generic", course: "TypeScript", definition: "Parámetro de tipo que permite reutilizar lógica conservando información estática." },
  { term: "@use", course: "SASS", definition: "Sistema moderno de módulos de SASS. Hace explícitas dependencias y evita contaminación global." },
  { term: "mixin", course: "SASS", definition: "Bloque reutilizable de declaraciones que puede aceptar argumentos y generar CSS." },
  { term: "design token", course: "SASS", definition: "Decisión de diseño reutilizable: color, espacio, radio, tipografía o sombra." },
  { term: "nesting", course: "SASS", definition: "Anidación de selectores. Es útil con moderación; demasiada profundidad aumenta acoplamiento y especificidad." },
  { term: "Custom Property", course: "CSS/SASS", definition: "Variable CSS que existe en runtime y permite herencia, theming y cambios dinámicos." }
];

export const totalLearningUnits =
  courses.reduce((total, course) => total + course.lessons.length, 0) + practiceMeta.total;
