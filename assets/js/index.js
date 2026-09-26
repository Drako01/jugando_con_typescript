import { Alumno } from './models/Alumno.js';
import { Profesor } from './models/Profesor.js';
import { Curso } from './models/Curso.js';
import { Categoria } from './models/Categoria.js';
import { agregarAlLocalStorage, cargarCategoriasDesdeLS, cargarProfesoresDesdeLS, cargarCursosDesdeLS, generarMatricula, generarComision, listarEnTabla, actualizarCantidadAlumnosPorCurso } from './functions/Functions.js';
const labKeys = ['Categorias', 'Profesores', 'Cursos', 'Alumnos'];
function byId(id) {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`No se encontró el elemento #${id}`);
    return element;
}
function readArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(value) ? value : [];
    }
    catch {
        return [];
    }
}
function showToast(message, kind = 'info') {
    const region = document.querySelector('[data-toast-region]');
    if (!region)
        return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${kind}`;
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3400);
}
function refreshTables() {
    listarEnTabla('Alumnos', byId('data-section__alumnos'));
    listarEnTabla('Profesores', byId('data-section__profes'));
    listarEnTabla('Cursos', byId('data-section__cursos'));
    listarEnTabla('Categorias', byId('data-section__categorias'));
}
function refreshDependencies() {
    cargarCategoriasDesdeLS();
    cargarProfesoresDesdeLS();
    cargarCursosDesdeLS();
}
function refreshLab() {
    refreshDependencies();
    refreshTables();
    updateStorageInspector();
}
function resetForm(form) {
    form.reset();
}
function updateStorageInspector() {
    const output = document.querySelector('[data-storage-json]');
    if (!output)
        return;
    const snapshot = Object.fromEntries(labKeys.map((key) => {
        try {
            return [key, JSON.parse(localStorage.getItem(key) || '[]')];
        }
        catch {
            return [key, 'JSON inválido'];
        }
    }));
    output.textContent = JSON.stringify(snapshot, null, 2);
}
function seedLabData() {
    const categorias = [
        { id: 1, categoria: 'Frontend' },
        { id: 2, categoria: 'Backend' }
    ];
    const profesor = {
        id: 1,
        nombre: 'Lucía',
        apellido: 'Fernández',
        nacimiento: '1988-04-12',
        dni: 30111222,
        role: 'Profesor',
        email: 'lucia.fernandez@example.com',
        registro: new Date().toISOString(),
        estado: true,
        cursos: []
    };
    const curso = {
        id: 1,
        nombre: 'TypeScript Aplicado',
        inicio: '2026-10-05',
        finalizacion: '2026-12-15',
        estado: true,
        cantidadAlumnos: 1,
        categoria: categorias[0],
        alumnos: [],
        profesores: [profesor],
        comision: '4101'
    };
    profesor.cursos = [curso];
    const alumno = {
        id: 1,
        nombre: 'Martín',
        apellido: 'Gómez',
        nacimiento: '2001-08-20',
        dni: 42123456,
        role: 'Alumno',
        email: 'martin.gomez@example.com',
        registro: new Date().toISOString(),
        estado: true,
        matricula: 'MG101',
        cursos: ['4101']
    };
    localStorage.setItem('Categorias', JSON.stringify(categorias));
    localStorage.setItem('Profesores', JSON.stringify([profesor]));
    localStorage.setItem('Cursos', JSON.stringify([curso]));
    localStorage.setItem('Alumnos', JSON.stringify([alumno]));
    refreshLab();
    showToast('Escenario demo cargado. Ya podés explorar relaciones, tablas y storage.', 'success');
}
function clearLabData() {
    labKeys.forEach((key) => localStorage.removeItem(key));
    refreshLab();
    showToast('Laboratorio reiniciado. Tu progreso de aprendizaje se mantuvo intacto.', 'success');
}
function initLabTools() {
    const seedButton = document.querySelector('[data-lab-seed]');
    const inspectButton = document.querySelector('[data-lab-inspect]');
    const resetButton = document.querySelector('[data-lab-reset]');
    const inspector = document.querySelector('[data-storage-inspector]');
    const inspectorClose = document.querySelector('[data-storage-close]');
    const resetDialog = document.querySelector('[data-reset-dialog]');
    const resetConfirm = document.querySelector('[data-reset-confirm]');
    seedButton?.addEventListener('click', seedLabData);
    inspectButton?.addEventListener('click', () => {
        if (!inspector)
            return;
        updateStorageInspector();
        inspector.hidden = false;
        inspector.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    inspectorClose?.addEventListener('click', () => {
        if (inspector)
            inspector.hidden = true;
    });
    resetButton?.addEventListener('click', () => resetDialog?.showModal());
    resetConfirm?.addEventListener('click', () => {
        clearLabData();
        resetDialog?.close();
    });
}
function initCategoriaForm() {
    const form = byId('categoriaForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const categoria = byId('nombreCategoria').value.trim();
        if (!categoria) {
            showToast('Ingresá un nombre para la categoría.', 'danger');
            return;
        }
        const categorias = readArray('Categorias');
        const exists = categorias.some(item => item.categoria.toLowerCase() === categoria.toLowerCase());
        if (exists) {
            showToast('Esa categoría ya existe.', 'danger');
            return;
        }
        categorias.push(new Categoria(categorias.length + 1, categoria));
        localStorage.setItem('Categorias', JSON.stringify(categorias));
        resetForm(form);
        refreshLab();
        showToast('Categoría agregada correctamente.', 'success');
    });
}
function initProfesorForm() {
    const form = byId('profesorForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const nombre = byId('nombreProfesor').value.trim();
        const apellido = byId('apellidoProfesor').value.trim();
        const dni = Number(byId('dniProfesor').value);
        const nacimiento = new Date(byId('fechaNacProfesor').value);
        const email = byId('emailProfesor').value.trim();
        const profesores = readArray('Profesores');
        const exists = profesores.some(item => item.nombre.toLowerCase() === nombre.toLowerCase() &&
            item.apellido.toLowerCase() === apellido.toLowerCase());
        if (exists) {
            showToast('Ese profesor ya existe.', 'danger');
            return;
        }
        const profesor = new Profesor(profesores.length + 1, nombre, apellido, nacimiento, dni, email);
        agregarAlLocalStorage('Profesores', profesor);
        resetForm(form);
        refreshLab();
        showToast('Profesor agregado correctamente.', 'success');
    });
}
function initCursoForm() {
    const form = byId('cursoForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const nombre = byId('nombreCurso').value.trim();
        const inicio = new Date(byId('fechaInicioCurso').value);
        const finalizacion = new Date(byId('fechaFinCurso').value);
        const categoriaNombre = byId('categoriaCurso').value;
        const profesorId = Number(byId('profesorCurso').value);
        if (Number.isNaN(inicio.getTime()) || Number.isNaN(finalizacion.getTime()) || inicio >= finalizacion) {
            showToast('Revisá las fechas: la finalización debe ser posterior al inicio.', 'danger');
            return;
        }
        const categorias = readArray('Categorias');
        const profesores = readArray('Profesores');
        const cursos = readArray('Cursos');
        const categoria = categorias.find(item => item.categoria === categoriaNombre);
        const profesorData = profesores.find(item => item.id === profesorId);
        if (!categoria || !profesorData) {
            showToast('Primero necesitás una categoría y un profesor válidos.', 'danger');
            return;
        }
        const profesor = new Profesor(profesorData.id, profesorData.nombre, profesorData.apellido, new Date(profesorData.nacimiento), profesorData.dni, profesorData.email);
        const curso = new Curso(cursos.length + 1, nombre, inicio.toISOString().split('T')[0], finalizacion.toISOString().split('T')[0], true, 0, categoria, profesor, String(generarComision(cursos)));
        cursos.push(curso);
        localStorage.setItem('Cursos', JSON.stringify(cursos));
        const profesoresActualizados = profesores.map(item => item.id === profesor.id
            ? { ...item, cursos: [...(item.cursos || []), curso] }
            : item);
        localStorage.setItem('Profesores', JSON.stringify(profesoresActualizados));
        resetForm(form);
        refreshLab();
        showToast('Curso creado y relacionado con profesor/categoría.', 'success');
    });
}
function initAlumnoForm() {
    const form = byId('alumnoForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const nombre = byId('nombreAlumno').value.trim();
        const apellido = byId('apellidoAlumno').value.trim();
        const dni = Number(byId('dniAlumno').value);
        const nacimiento = new Date(byId('fechaNacAlumno').value);
        const email = byId('emailAlumno').value.trim();
        const cursos = Array.from(byId('cursosAlumno').selectedOptions)
            .map(option => option.value)
            .filter(Boolean);
        const alumnos = readArray('Alumnos');
        const exists = alumnos.some(item => item.nombre.toLowerCase() === nombre.toLowerCase() &&
            item.apellido.toLowerCase() === apellido.toLowerCase());
        if (exists) {
            showToast('Ese alumno ya existe.', 'danger');
            return;
        }
        if (!cursos.length) {
            showToast('Seleccioná al menos un curso para completar la inscripción.', 'danger');
            return;
        }
        const alumno = new Alumno(alumnos.length + 1, nombre, apellido, nacimiento, dni, generarMatricula(nombre, apellido, alumnos), email);
        alumno.inscribirse(cursos);
        agregarAlLocalStorage('Alumnos', alumno);
        actualizarCantidadAlumnosPorCurso();
        resetForm(form);
        refreshLab();
        showToast('Alumno inscripto correctamente.', 'success');
    });
}
function initFooter() {
    const footer = byId('footer');
    const content = footer.querySelector('.site-footer__content');
    if (!content || content.querySelector('[data-dynamic-copyright]'))
        return;
    const author = document.createElement('p');
    author.dataset.dynamicCopyright = 'true';
    author.innerHTML = `© ${new Date().getFullYear()} Alejandro Di Stefano · <a href="https://github.com/Drako01" target="_blank" rel="noreferrer">GitHub</a>`;
    content.appendChild(author);
}
function initLabEvents() {
    document.addEventListener('ats:lab-data-changed', () => {
        refreshLab();
        showToast('Registro eliminado y relaciones actualizadas.', 'success');
    });
}
function init() {
    refreshLab();
    initCategoriaForm();
    initProfesorForm();
    initCursoForm();
    initAlumnoForm();
    initLabTools();
    initLabEvents();
    initFooter();
}
document.addEventListener('DOMContentLoaded', init);
//# sourceMappingURL=index.js.map