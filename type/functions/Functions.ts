import { Categoria } from "../models/Categoria.js";
import { Curso } from "../models/Curso.js";
import { Profesor } from "../models/Profesor.js";
import { Alumno } from "../models/Alumno.js";

type StorageKey = "Alumnos" | "Profesores" | "Cursos" | "Categorias";

function readArray<T>(key: StorageKey): T[] {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    try {
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed as T[] : [];
    } catch (error) {
        console.error(`No se pudo leer ${key} desde localStorage:`, error);
        return [];
    }
}

function writeArray<T>(key: StorageKey, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value: unknown): string {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function agregarAlLocalStorage(key: StorageKey, value: { nombre: string; nacimiento?: Date | string; registro?: Date | string }): void {
    const data = readArray<typeof value>(key);
    const exists = data.some(item => item.nombre?.toLowerCase() === value.nombre.toLowerCase());

    if (exists) {
        console.info(`El elemento "${value.nombre}" ya existe en ${key}.`);
        return;
    }

    const formattedValue = {
        ...value,
        nacimiento: value.nacimiento instanceof Date ? value.nacimiento.toISOString().split("T")[0] : value.nacimiento,
        registro: value.registro instanceof Date ? value.registro.toISOString().split("T")[0] : value.registro
    };

    writeArray(key, [...data, formattedValue]);
}

export function cargarCategoriasDesdeLS(): void {
    const categorias = readArray<Categoria>("Categorias");
    const select = document.getElementById("categoriaCurso") as HTMLSelectElement | null;
    if (!select) return;

    select.innerHTML = categorias.length ? "" : '<option value="" disabled selected>Creá una categoría primero</option>';
    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.categoria;
        option.textContent = categoria.categoria;
        select.appendChild(option);
    });
}

export function cargarCursosDesdeLS(): void {
    const cursos = readArray<Curso>("Cursos");
    const select = document.getElementById("cursosAlumno") as HTMLSelectElement | null;
    if (!select) return;

    select.innerHTML = '<option value="" disabled>Seleccione 1 o más cursos</option>';
    cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = String(curso.comision);
        option.textContent = `${curso.nombre} · Comisión ${curso.comision}`;
        select.appendChild(option);
    });
}

export function cargarProfesoresDesdeLS(): void {
    const profesores = readArray<Profesor>("Profesores").filter(profesor => profesor.estado === true);
    const select = document.getElementById("profesorCurso") as HTMLSelectElement | null;
    if (!select) return;

    select.innerHTML = '<option value="">Seleccioná un profesor</option>';
    profesores.forEach(profesor => {
        const option = document.createElement("option");
        option.value = String(profesor.id);
        option.textContent = `${profesor.nombre} ${profesor.apellido}`;
        select.appendChild(option);
    });
}

export function actualizarCantidadAlumnosPorCurso(): void {
    const alumnos = readArray<Alumno>("Alumnos");
    const cursos = readArray<Curso>("Cursos").map(curso => new Curso(
        curso.id,
        curso.nombre,
        curso.inicio,
        curso.finalizacion,
        curso.estado,
        0,
        curso.categoria,
        curso.profesores?.[0],
        curso.comision
    ));

    cursos.forEach(curso => { curso.alumnos = []; });
    alumnos.forEach(alumno => {
        alumno.cursos.forEach(comision => {
            const curso = cursos.find(item => String(item.comision) === String(comision));
            if (curso) curso.agregarAlumno(alumno);
        });
    });

    writeArray("Cursos", cursos);
}

export function cargarCursosLS(): Curso[] {
    return readArray<Curso>("Cursos").map(curso => new Curso(
        curso.id,
        curso.nombre,
        curso.inicio,
        curso.finalizacion,
        curso.estado,
        curso.cantidadAlumnos,
        curso.categoria,
        curso.profesores?.[0],
        curso.comision
    ));
}

export function actualizarCursosConAlumnos(cursosSeleccionados: string[]): void {
    const cursos = readArray<Curso>("Cursos");
    cursosSeleccionados.forEach(comision => {
        const curso = cursos.find(item => String(item.comision) === String(comision));
        if (curso) curso.cantidadAlumnos = (curso.cantidadAlumnos || 0) + 1;
    });
    writeArray("Cursos", cursos);
}

export function generarMatricula(nombre: string, apellido: string, alumnos: Alumno[]): string {
    const initials = `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
    let matricula: string;

    do {
        const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
        matricula = `${initials}${random}`;
    } while (alumnos.some(alumno => alumno.matricula === matricula));

    return matricula;
}

export function generarComision(cursos: Curso[]): number {
    const existing = new Set(cursos.map(curso => Number(curso.comision)));
    let comision: number;
    do {
        comision = Math.floor(Math.random() * 9000) + 1000;
    } while (existing.has(comision));
    return comision;
}

function formatCell(key: string, keyName: string, value: unknown, index: number, valueIndex: number, containerId: string): string {
    if (typeof value === "boolean") {
        const stateClass = value ? "status--active" : "status--inactive";
        const stateLabel = value ? "Activo" : "Inactivo";
        return `<td><input type="checkbox" ${value ? "checked" : ""} aria-label="Cambiar estado" onchange="actualizarEstado('${key}', ${index}, ${valueIndex}, this.checked, document.getElementById('${containerId}'))"><span class="status ${stateClass}">${stateLabel}</span></td>`;
    }

    if (Array.isArray(value)) {
        const text = value.map(item => {
            if (typeof item === "object" && item !== null && "nombre" in item) {
                const record = item as { nombre?: string; apellido?: string; comision?: string | number };
                return record.comision ?? `${record.nombre ?? ""} ${record.apellido ?? ""}`.trim();
            }
            return item;
        }).join(", ");
        return `<td>${escapeHtml(text || "—")}</td>`;
    }

    if (typeof value === "object" && value !== null) {
        const record = value as { categoria?: string; comision?: string | number };
        return `<td>${escapeHtml(record.comision ?? record.categoria ?? "—")}</td>`;
    }

    const className = key === "Categorias" && keyName === "categoria" ? ' class="td-categoria"' : "";
    return `<td${className}>${escapeHtml(value === "" ? "—" : value)}</td>`;
}

export function listarEnTabla<T extends object>(key: StorageKey, containerElement: HTMLElement): void {
    const data = readArray<T>(key);

    if (data.length === 0) {
        containerElement.innerHTML = `<div class="data-panel__header"><h2>${key}</h2><span>0 registros</span></div><p>Todavía no hay datos disponibles.</p>`;
        return;
    }

    const keys = Object.keys(data[0]).filter(keyName => keyName !== "role" && !(key === "Cursos" && keyName === "alumnos"));
    const rows = data.map((item, index) => {
        const cells = Object.entries(item)
            .filter(([keyName]) => keyName !== "role" && !(key === "Cursos" && keyName === "alumnos"))
            .map(([keyName, value], valueIndex) => formatCell(key, keyName, value, index, valueIndex, containerElement.id))
            .join("");
        return `<tr>${cells}</tr>`;
    }).join("");

    containerElement.innerHTML = `
        <div class="data-panel__header"><h2>${key}</h2><span>${data.length} ${data.length === 1 ? "registro" : "registros"}</span></div>
        <div class="table-scroll" role="region" aria-label="Tabla de ${key}" tabindex="0">
            <table class="data-table">
                <thead><tr>${keys.map(keyName => `<th scope="col">${escapeHtml(keyName)}</th>`).join("")}</tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

(window as typeof window & { actualizarEstado?: Function }).actualizarEstado = function actualizarEstado(
    key: StorageKey,
    itemIndex: number,
    valueIndex: number,
    nuevoEstado: boolean,
    containerElement: HTMLElement | null
): void {
    const data = readArray<Record<string, unknown>>(key);
    const item = data[itemIndex];
    if (!item || !containerElement) return;

    const keys = Object.keys(item).filter(keyName => keyName !== "role");
    const keyToUpdate = keys[valueIndex];
    if (!keyToUpdate) return;

    item[keyToUpdate] = nuevoEstado;
    writeArray(key, data);
    listarEnTabla(key, containerElement);
};
