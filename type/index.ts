import { Alumno } from './models/Alumno.js';
import { Profesor } from './models/Profesor.js';
import { Curso } from './models/Curso.js';
import { Categoria } from './models/Categoria.js';
import {
    agregarAlLocalStorage,
    cargarCategoriasDesdeLS,
    cargarProfesoresDesdeLS,
    generarMatricula,
    generarComision,
    listarEnTabla
} from './functions/Functions.js';

window.onload = () => {
    cargarCategoriasDesdeLS();
};
cargarProfesoresDesdeLS();
// Verificación y adición de Alumno
document.getElementById('alumnoForm')?.addEventListener('submit', (e) => {

    const nombre = (document.getElementById('nombreAlumno') as HTMLInputElement).value.trim();
    const apellido = (document.getElementById('apellidoAlumno') as HTMLInputElement).value.trim();
    const dni = parseInt((document.getElementById('dniAlumno') as HTMLInputElement).value);

    const alumnosAlmacenados = JSON.parse(localStorage.getItem("Alumnos") || '[]');

    // Verificar si ya existe un alumno con el mismo nombre y apellido
    const alumnoExiste = alumnosAlmacenados.some((alumno: Alumno) => alumno.nombre.toLowerCase() === nombre.toLowerCase() && alumno.apellido.toLowerCase() === apellido.toLowerCase());

    if (!alumnoExiste) {
        const nuevoId = alumnosAlmacenados.length + 1;
        const fechaNac = new Date((document.getElementById('fechaNacAlumno') as HTMLInputElement).value);
        const matricula = generarMatricula(nombre, apellido, alumnosAlmacenados); // Asignar una matrícula única
        const alumno = new Alumno(nuevoId, nombre, apellido, fechaNac, dni, matricula);

        alumnosAlmacenados.push(alumno);
        localStorage.setItem("Alumnos", JSON.stringify(alumnosAlmacenados));
        agregarAlLocalStorage("Alumnos", alumno);

    } else {
        console.log(`El alumno ${nombre} ${apellido} ya existe.`);
    }
});

// Manejar la adición de un Profesor
document.getElementById('profesorForm')?.addEventListener('submit', (e) => {

    const nombre = (document.getElementById('nombreProfesor') as HTMLInputElement).value;
    const apellido = (document.getElementById('apellidoProfesor') as HTMLInputElement).value;
    const dni = parseInt((document.getElementById('dniProfesor') as HTMLInputElement).value);
    const fechaNac = new Date((document.getElementById('fechaNacProfesor') as HTMLInputElement).value);

    const profesoresAlmacenados = JSON.parse(localStorage.getItem("Profesores") || '[]');

    const profesorExiste = profesoresAlmacenados.some((profesor: Profesor) => profesor.nombre.toLowerCase() === nombre.toLowerCase() && profesor.apellido.toLowerCase() === apellido.toLowerCase());

    if (!profesorExiste) {
        const nuevoId = profesoresAlmacenados.length + 1;

        const profesor = new Profesor(nuevoId, nombre, apellido, fechaNac, dni);

        profesoresAlmacenados.push(profesor);
        agregarAlLocalStorage('Profesores', profesor);

    } else {
        console.log(`El profesor ${nombre} ${apellido} ya existe.`);
    }

});

// Manejar la adición de un Curso
document.getElementById('cursoForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = (document.getElementById('nombreCurso') as HTMLInputElement).value.trim();
    const fechaInicio = new Date((document.getElementById('fechaInicioCurso') as HTMLInputElement).value);
    const fechaFinalizacion = new Date((document.getElementById('fechaFinCurso') as HTMLInputElement).value);
    const categoriaSeleccionada = (document.getElementById('categoriaCurso') as HTMLSelectElement).value;
    const profesorSeleccionadoId = parseInt((document.getElementById('profesorCurso') as HTMLSelectElement).value);

    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFinalizacion.getTime())) {
        console.error('Fechas inválidas');
        return;
    }
    if (fechaInicio >= fechaFinalizacion) {
        console.error('La fecha de inicio debe ser anterior a la de finalización');
        return;
    }

    const categoriasAlmacenadas = JSON.parse(localStorage.getItem("Categorias") || '[]');
    const categoria = categoriasAlmacenadas.find((cat: Categoria) => cat.categoria === categoriaSeleccionada);

    const profesAlmacenados = JSON.parse(localStorage.getItem("Profesores") || '[]');

    const profeData = profesAlmacenados.find((p: any) => p.id === profesorSeleccionadoId);

    if (!profeData) {
        console.error('Profesor no encontrado');
        return;
    }

    const profe = new Profesor(
        profeData.id,
        profeData.nombre,
        profeData.apellido,
        new Date(profeData.fechaNac),
        profeData.dni,
        profeData.email
    );

    if (categoria) {
        const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]');
        const nuevoId = cursosAlmacenados.length + 1;
        const nuevaComision = generarComision(cursosAlmacenados);

        const curso = new Curso(nuevoId, nombre, fechaInicio, fechaFinalizacion, true, 0, categoria);

        profe.dictarCurso(curso);  
        curso.comision = nuevaComision;

        const cursoSinProfesores = {
            ...curso,
            profesores: curso.profesores.map(p => ({
                id: p.id,
                nombre: p.nombre,
                apellido: p.apellido
            })) 
        };

        cursosAlmacenados.push(cursoSinProfesores);
        localStorage.setItem("Cursos", JSON.stringify(cursosAlmacenados));

        const profesorActualizado = profesAlmacenados.map((p: any) => {
            if (p.id === profe.id) {
                return {
                    ...p,
                    cursos: [...p.cursos, cursoSinProfesores] 
                };
            }
            return p;
        });

        localStorage.setItem("Profesores", JSON.stringify(profesorActualizado));

    } else {
        console.error('Categoría no encontrada');
    }
});

// Manejar la adición de una Categoria
document.getElementById('categoriaForm')?.addEventListener('submit', (e) => {

    const categoria = (document.getElementById('nombreCategoria') as HTMLInputElement).value.trim();

    const categoriasAlmacenadas = JSON.parse(localStorage.getItem("Categorias") || '[]');

    const categoriaExiste = categoriasAlmacenadas.some((cat: Categoria) => cat.categoria.toLowerCase() === categoria.toLowerCase());

    if (!categoriaExiste) {
        const nuevoId = categoriasAlmacenadas.length + 1;
        const categoriaAgregada = new Categoria(nuevoId, categoria);

        categoriasAlmacenadas.push(categoriaAgregada);
        localStorage.setItem("Categorias", JSON.stringify(categoriasAlmacenadas));

        cargarCategoriasDesdeLS();
    } else {
        console.log(`La categoría "${categoria}" ya existe.`);
    }
});

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
