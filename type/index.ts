import { Alumno } from './models/Alumno.js';
import { Profesor } from './models/Profesor.js';
import { Curso } from './models/Curso.js';
import { Categoria } from './models/Categoria.js';
import {
    agregarAlLocalStorage,
    cargarCategoriasDesdeLS,
    cargarProfesoresDesdeLS,
    cargarCursosDesdeLS,
    generarMatricula,
    generarComision,
    listarEnTabla,
    actualizarCantidadAlumnosPorCurso
} from './functions/Functions.js';

function byId<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) throw new Error(`No se encontró el elemento #${id}`);
    return element as T;
}

function readArray<T>(key: string): T[] {
    try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function refreshTables(): void {
    listarEnTabla('Alumnos', byId('data-section__alumnos'));
    listarEnTabla('Profesores', byId('data-section__profes'));
    listarEnTabla('Cursos', byId('data-section__cursos'));
    listarEnTabla('Categorias', byId('data-section__categorias'));
}

function refreshDependencies(): void {
    cargarCategoriasDesdeLS();
    cargarProfesoresDesdeLS();
    cargarCursosDesdeLS();
}

function resetForm(form: HTMLFormElement): void {
    form.reset();
}

function initCategoriaForm(): void {
    const form = byId<HTMLFormElement>('categoriaForm');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const categoria = byId<HTMLInputElement>('nombreCategoria').value.trim();
        if (!categoria) return;

        const categorias = readArray<Categoria>('Categorias');
        const exists = categorias.some(item => item.categoria.toLowerCase() === categoria.toLowerCase());

        if (!exists) {
            categorias.push(new Categoria(categorias.length + 1, categoria));
            localStorage.setItem('Categorias', JSON.stringify(categorias));
            resetForm(form);
            refreshDependencies();
            refreshTables();
        }
    });
}

function initProfesorForm(): void {
    const form = byId<HTMLFormElement>('profesorForm');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const nombre = byId<HTMLInputElement>('nombreProfesor').value.trim();
        const apellido = byId<HTMLInputElement>('apellidoProfesor').value.trim();
        const dni = Number(byId<HTMLInputElement>('dniProfesor').value);
        const nacimiento = new Date(byId<HTMLInputElement>('fechaNacProfesor').value);
        const email = byId<HTMLInputElement>('emailProfesor').value.trim();
        const profesores = readArray<Profesor>('Profesores');

        const exists = profesores.some(item =>
            item.nombre.toLowerCase() === nombre.toLowerCase() &&
            item.apellido.toLowerCase() === apellido.toLowerCase()
        );

        if (!exists) {
            const profesor = new Profesor(profesores.length + 1, nombre, apellido, nacimiento, dni, email);
            agregarAlLocalStorage('Profesores', profesor);
            resetForm(form);
            refreshDependencies();
            refreshTables();
        }
    });
}

function initCursoForm(): void {
    const form = byId<HTMLFormElement>('cursoForm');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const nombre = byId<HTMLInputElement>('nombreCurso').value.trim();
        const inicio = new Date(byId<HTMLInputElement>('fechaInicioCurso').value);
        const finalizacion = new Date(byId<HTMLInputElement>('fechaFinCurso').value);
        const categoriaNombre = byId<HTMLSelectElement>('categoriaCurso').value;
        const profesorId = Number(byId<HTMLSelectElement>('profesorCurso').value);

        if (Number.isNaN(inicio.getTime()) || Number.isNaN(finalizacion.getTime()) || inicio >= finalizacion) return;

        const categorias = readArray<Categoria>('Categorias');
        const profesores = readArray<Profesor>('Profesores');
        const cursos = readArray<Curso>('Cursos');
        const categoria = categorias.find(item => item.categoria === categoriaNombre);
        const profesorData = profesores.find(item => item.id === profesorId);

        if (!categoria || !profesorData) return;

        const profesor = new Profesor(
            profesorData.id,
            profesorData.nombre,
            profesorData.apellido,
            new Date(profesorData.nacimiento),
            profesorData.dni,
            profesorData.email
        );

        const curso = new Curso(
            cursos.length + 1,
            nombre,
            inicio.toISOString().split('T')[0],
            finalizacion.toISOString().split('T')[0],
            true,
            0,
            categoria,
            profesor,
            String(generarComision(cursos))
        );

        profesor.dictarCurso(curso);
        cursos.push({ ...curso, profesores: curso.profesores.map(item => ({ ...item, cursos: [] })) } as Curso);
        localStorage.setItem('Cursos', JSON.stringify(cursos));

        const profesoresActualizados = profesores.map(item => item.id === profesor.id
            ? { ...item, cursos: [...(item.cursos || []), curso] }
            : item
        );
        localStorage.setItem('Profesores', JSON.stringify(profesoresActualizados));

        resetForm(form);
        refreshDependencies();
        refreshTables();
    });
}

function initAlumnoForm(): void {
    const form = byId<HTMLFormElement>('alumnoForm');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const nombre = byId<HTMLInputElement>('nombreAlumno').value.trim();
        const apellido = byId<HTMLInputElement>('apellidoAlumno').value.trim();
        const dni = Number(byId<HTMLInputElement>('dniAlumno').value);
        const nacimiento = new Date(byId<HTMLInputElement>('fechaNacAlumno').value);
        const email = byId<HTMLInputElement>('emailAlumno').value.trim();
        const cursos = Array.from(byId<HTMLSelectElement>('cursosAlumno').selectedOptions).map(option => option.value);
        const alumnos = readArray<Alumno>('Alumnos');

        const exists = alumnos.some(item =>
            item.nombre.toLowerCase() === nombre.toLowerCase() &&
            item.apellido.toLowerCase() === apellido.toLowerCase()
        );

        if (!exists) {
            const alumno = new Alumno(
                alumnos.length + 1,
                nombre,
                apellido,
                nacimiento,
                dni,
                generarMatricula(nombre, apellido, alumnos),
                email
            );
            alumno.inscribirse(cursos);
            agregarAlLocalStorage('Alumnos', alumno);
            actualizarCantidadAlumnosPorCurso();
            resetForm(form);
            refreshDependencies();
            refreshTables();
        }
    });
}

function initFooter(): void {
    const footer = byId<HTMLElement>('footer');
    const content = footer.querySelector('.site-footer__content');
    if (!content) return;

    const author = document.createElement('p');
    author.innerHTML = `© ${new Date().getFullYear()} Alejandro Di Stefano · <a href="https://github.com/Drako01" target="_blank" rel="noreferrer">GitHub</a>`;
    content.appendChild(author);
}

function init(): void {
    refreshDependencies();
    refreshTables();
    initCategoriaForm();
    initProfesorForm();
    initCursoForm();
    initAlumnoForm();
    initFooter();
}

document.addEventListener('DOMContentLoaded', init);
