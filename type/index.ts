import { Alumno } from './models/Alumno.js';
import { Profesor } from './models/Profesor.js';
import { Curso } from './models/Curso.js';
import { Categoria } from './models/Categoria.js';

// Crear algunas categorías
const categoriaProgramacion = new Categoria(1, 'Programación');
const categoriaDiseno = new Categoria(2, 'Diseño');

// Array de categorías para facilitar la búsqueda
const categorias: Categoria[] = [categoriaProgramacion, categoriaDiseno];

// Manejar la adición de un Alumno
document.getElementById('alumnoForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = (document.getElementById('nombreAlumno') as HTMLInputElement).value;
    const apellido = (document.getElementById('apellidoAlumno') as HTMLInputElement).value;
    const dni = parseInt((document.getElementById('dniAlumno') as HTMLInputElement).value);
    const fechaNac = new Date((document.getElementById('fechaNacAlumno') as HTMLInputElement).value);
    const matricula = (document.getElementById('matriculaAlumno') as HTMLInputElement).value;

    const alumno = new Alumno(Date.now(), nombre, apellido, fechaNac, dni, matricula);
    console.log(alumno.mostrarDatos());
});

// Manejar la adición de un Profesor
document.getElementById('profesorForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = (document.getElementById('nombreProfesor') as HTMLInputElement).value;
    const apellido = (document.getElementById('apellidoProfesor') as HTMLInputElement).value;
    const dni = parseInt((document.getElementById('dniProfesor') as HTMLInputElement).value);
    const fechaNac = new Date((document.getElementById('fechaNacProfesor') as HTMLInputElement).value);
    const especialidad = (document.getElementById('especialidadProfesor') as HTMLInputElement).value;

    const profesor = new Profesor(Date.now(), nombre, apellido, fechaNac, dni, especialidad);
    console.log(profesor.mostrarDatos());
});

// Manejar la adición de un Curso
document.getElementById('cursoForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = (document.getElementById('nombreCurso') as HTMLInputElement).value;
    const fechaInicio = new Date((document.getElementById('fechaInicioCurso') as HTMLInputElement).value);
    const fechaFinalizacion = new Date((document.getElementById('fechaFinCurso') as HTMLInputElement).value);
    const categoriaSeleccionada = (document.getElementById('categoriaCurso') as HTMLSelectElement).value;

    // Buscar el objeto Categoria correspondiente
    const categoria = categorias.find(cat => cat.categoria === categoriaSeleccionada);

    if (categoria) {
        const curso = new Curso(Date.now(), nombre, fechaInicio, fechaFinalizacion, true, 0, categoria);
        console.log(curso.mostrarDetalles());
    } else {
        console.error('Categoría no encontrada');
    }
});
