import { Categoria } from "../models/Categoria";
import { Curso } from "../models/Curso";
import { Profesor } from "../models/Profesor";
import { Alumno } from "../models/Alumno";

export function agregarAlLocalStorage(key: string, value: any) {
    const existingData = localStorage.getItem(key);

    let dataArray = JSON.parse(localStorage.getItem(key) || '[]');
    try {
        dataArray = existingData ? JSON.parse(existingData) : [];
    } catch (e) {
        console.error('Error parsing JSON from localStorage:', e);
        dataArray = [];
    }

    if (!Array.isArray(dataArray)) {
        dataArray = [];
    }

    const valorExiste = dataArray.some((item: any) => item.nombre === value.nombre);

    
    if (!valorExiste) {
        // Agregar solo el nuevo valor
        dataArray.push(value);
        localStorage.setItem(key, JSON.stringify(dataArray));
    } else {
        console.log(`El elemento con el nombre "${value.nombre}" ya existe y no será agregado.`);
    }
}

export function cargarCategoriasDesdeLS() {
    const categoriasAlmacenadas = JSON.parse(localStorage.getItem("Categorias") || '[]');
    const selectCategorias = document.getElementById('categoriaCurso') as HTMLSelectElement;

    selectCategorias.innerHTML = '';
    if(categoriasAlmacenadas){
        categoriasAlmacenadas.forEach((categoria: Categoria) => {
            const option = document.createElement('option');
            option.value = categoria.categoria;
            option.text = categoria.categoria; 
            selectCategorias.appendChild(option);
        });
    }
}

export function cargarCursosDesdeLS() {
    const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]');
    const selectCursos = document.getElementById('cursosProfesor') as HTMLSelectElement;

    selectCursos.innerHTML = '<option value="">--Selecciona una Categoria--</option>';
    if(cursosAlmacenados){
        cursosAlmacenados.forEach((curso: Curso) => {
            console.log(curso);
            const option = document.createElement('option');
            option.value = curso.nombre;
            option.text = curso.nombre; 
            selectCursos.appendChild(option);
        });
    }
}

export function cargarProfesoresDesdeLS() {
    const profesoresAlmacenados = JSON.parse(localStorage.getItem("Profesores") || '[]');
    const selectProfesores = document.getElementById('profesorCurso') as HTMLSelectElement;

    selectProfesores.innerHTML = '<option value="">--Selecciona un Profesor--</option>';
    
    if(profesoresAlmacenados){
        profesoresAlmacenados.forEach((profesor: Profesor) => {
            const option = document.createElement('option');
            option.value = JSON.stringify(profesor); 
            option.text = `${profesor.nombre} ${profesor.apellido}`;
            selectProfesores.appendChild(option);
        });
    }
}

export function generarMatricula(nombre: string, apellido: string, alumnosAlmacenados: Alumno[]): string {
    const iniciales = nombre.charAt(0).toUpperCase() + apellido.charAt(0).toUpperCase();
    let matricula: any;
    let matriculaExiste;

    do {
        const numeroAleatorio = ('000' + Math.floor(Math.random() * 100 + 1)).slice(-3); 
        matricula = `${iniciales}${numeroAleatorio}`;
        matriculaExiste = alumnosAlmacenados.some((alumno: Alumno) => alumno.matricula === matricula);
    } while (matriculaExiste);

    return matricula;
}

export function generarComision(cursosAlmacenados: Curso[]): number {
    const ultimoCurso = cursosAlmacenados[cursosAlmacenados.length - 1];
    const comisionAleatoria = Math.floor(Math.random() * 1000 + 1000) + 1;
    return ultimoCurso ? ultimoCurso.id + comisionAleatoria : comisionAleatoria;
}