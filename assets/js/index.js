var _a, _b, _c, _d;
import { Alumno } from './models/Alumno.js';
import { Profesor } from './models/Profesor.js';
import { Curso } from './models/Curso.js';
import { Categoria } from './models/Categoria.js';
import { agregarAlLocalStorage, cargarCategoriasDesdeLS, cargarProfesoresDesdeLS, cargarCursosDesdeLS, generarMatricula, generarComision, listarEnTabla, actualizarCantidadAlumnosPorCurso } from './functions/Functions.js';
window.onload = () => {
    cargarCategoriasDesdeLS();
    cargarCursosDesdeLS();
};
cargarProfesoresDesdeLS();
// Verificación y adición de Alumno
(_a = document.getElementById('alumnoForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreAlumno').value.trim();
    const apellido = document.getElementById('apellidoAlumno').value.trim();
    const dni = parseInt(document.getElementById('dniAlumno').value);
    const email = document.getElementById('emailAlumno').value.trim();
    const cursosSeleccionados = Array.from(document.getElementById('cursosAlumno').selectedOptions).map(option => option.value);
    const alumnosAlmacenados = JSON.parse(localStorage.getItem("Alumnos") || '[]');
    const alumnoExiste = alumnosAlmacenados.some((alumno) => alumno.nombre.toLowerCase() === nombre.toLowerCase() &&
        alumno.apellido.toLowerCase() === apellido.toLowerCase());
    if (!alumnoExiste) {
        const nuevoId = alumnosAlmacenados.length + 1;
        const fechaNac = new Date(document.getElementById('fechaNacAlumno').value);
        const matricula = generarMatricula(nombre, apellido, alumnosAlmacenados);
        const alumno = new Alumno(nuevoId, nombre, apellido, fechaNac, dni, matricula, email);
        alumno.inscribirse(cursosSeleccionados);
        alumnosAlmacenados.push(alumno);
        agregarAlLocalStorage("Alumnos", alumno);
        actualizarCantidadAlumnosPorCurso();
    }
    else {
        console.error(`El alumno ${nombre} ${apellido} ya existe.`);
    }
});
// Manejar la adición de un Profesor
(_b = document.getElementById('profesorForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
    const nombre = document.getElementById('nombreProfesor').value;
    const apellido = document.getElementById('apellidoProfesor').value;
    const dni = parseInt(document.getElementById('dniProfesor').value);
    const fechaNac = new Date(document.getElementById('fechaNacProfesor').value);
    const email = document.getElementById('emailProfesor').value.trim();
    const profesoresAlmacenados = JSON.parse(localStorage.getItem("Profesores") || '[]');
    const profesorExiste = profesoresAlmacenados.some((profesor) => profesor.nombre.toLowerCase() === nombre.toLowerCase() && profesor.apellido.toLowerCase() === apellido.toLowerCase());
    if (!profesorExiste) {
        const nuevoId = profesoresAlmacenados.length + 1;
        const profesor = new Profesor(nuevoId, nombre, apellido, fechaNac, dni, email);
        profesoresAlmacenados.push(profesor);
        agregarAlLocalStorage('Profesores', profesor);
    }
    else {
        console.log(`El profesor ${nombre} ${apellido} ya existe.`);
    }
});
// Manejar la adición de un Curso
(_c = document.getElementById('cursoForm')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreCurso').value.trim();
    const fechaInicio = new Date(document.getElementById('fechaInicioCurso').value);
    const fechaFinalizacion = new Date(document.getElementById('fechaFinCurso').value);
    const categoriaSeleccionada = document.getElementById('categoriaCurso').value;
    const profesorSeleccionadoId = parseInt(document.getElementById('profesorCurso').value);
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFinalizacion.getTime())) {
        console.error('Fechas inválidas');
        return;
    }
    if (fechaInicio >= fechaFinalizacion) {
        console.error('La fecha de inicio debe ser anterior a la de finalización');
        return;
    }
    const categoriasAlmacenadas = JSON.parse(localStorage.getItem("Categorias") || '[]');
    const categoria = categoriasAlmacenadas.find((cat) => cat.categoria === categoriaSeleccionada);
    const profesAlmacenados = JSON.parse(localStorage.getItem("Profesores") || '[]');
    const profeData = profesAlmacenados.find((p) => p.id === profesorSeleccionadoId);
    if (!profeData) {
        console.error('Profesor no encontrado');
        return;
    }
    const profe = new Profesor(profeData.id, profeData.nombre, profeData.apellido, new Date(profeData.fechaNac), profeData.dni, profeData.email);
    if (categoria) {
        const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]');
        const nuevoId = cursosAlmacenados.length + 1;
        const nuevaComision = generarComision(cursosAlmacenados);
        const fechaInicioFormatted = fechaInicio.toISOString().split('T')[0];
        const fechaFinalizacionFormatted = fechaFinalizacion.toISOString().split('T')[0];
        const curso = new Curso(nuevoId, nombre, fechaInicioFormatted, fechaFinalizacionFormatted, true, 0, categoria);
        profe.dictarCurso(curso);
        curso.comision = nuevaComision;
        const cursoSinProfesores = Object.assign(Object.assign({}, curso), { profesores: curso.profesores.map(p => ({
                id: p.id,
                nombre: p.nombre,
                apellido: p.apellido
            })) });
        cursosAlmacenados.push(cursoSinProfesores);
        localStorage.setItem("Cursos", JSON.stringify(cursosAlmacenados));
        const profesorActualizado = profesAlmacenados.map((p) => {
            if (p.id === profe.id) {
                return Object.assign(Object.assign({}, p), { cursos: [...p.cursos, cursoSinProfesores] });
            }
            return p;
        });
        localStorage.setItem("Profesores", JSON.stringify(profesorActualizado));
    }
    else {
        console.error('Categoría no encontrada');
    }
});
// Manejar la adición de una Categoria
(_d = document.getElementById('categoriaForm')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', (e) => {
    const categoria = document.getElementById('nombreCategoria').value.trim();
    const categoriasAlmacenadas = JSON.parse(localStorage.getItem("Categorias") || '[]');
    const categoriaExiste = categoriasAlmacenadas.some((cat) => cat.categoria.toLowerCase() === categoria.toLowerCase());
    if (!categoriaExiste) {
        const nuevoId = categoriasAlmacenadas.length + 1;
        const categoriaAgregada = new Categoria(nuevoId, categoria);
        categoriasAlmacenadas.push(categoriaAgregada);
        localStorage.setItem("Categorias", JSON.stringify(categoriasAlmacenadas));
        cargarCategoriasDesdeLS();
    }
    else {
        console.log(`La categoría "${categoria}" ya existe.`);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const sectionCursos = document.getElementById('data-section__cursos');
    const sectionCategorias = document.getElementById('data-section__categorias');
    const sectionAlumnos = document.getElementById('data-section__profes');
    const sectionProfesores = document.getElementById('data-section__alumnos');
    if (sectionCursos) {
        listarEnTabla('Cursos', sectionCursos);
    }
    if (sectionCategorias) {
        listarEnTabla('Categorias', sectionCategorias);
    }
    if (sectionAlumnos) {
        listarEnTabla('Alumnos', sectionAlumnos);
    }
    if (sectionProfesores) {
        listarEnTabla('Profesores', sectionProfesores);
    }
});
const footer = document.getElementById("footer");
const parrafoFooter = document.createElement("p");
const anioActual = new Date().getFullYear();
if (footer) {
    parrafoFooter.innerHTML = `Alejandro Di Stefano | Drako01 - ${anioActual}`;
    footer.appendChild(parrafoFooter);
}
