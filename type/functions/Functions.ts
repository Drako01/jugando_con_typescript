import { Categoria } from "../models/Categoria";
import { Curso } from "../models/Curso";
import { Profesor } from "../models/Profesor";
import { Alumno } from "../models/Alumno";

export function agregarAlLocalStorage(key: string, value: any) {
    const existingData = localStorage.getItem(key);

    let dataArray = JSON.parse(existingData || '[]');
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
        const formattedValue = {
            ...value,
            fechaNac: value.fechaNac instanceof Date ? value.fechaNac.toISOString().split('T')[0] : value.fechaNac,
            fechaRegistro: value.fechaRegistro instanceof Date ? value.fechaRegistro.toISOString().split('T')[0] : value.fechaRegistro
        };

        dataArray.push(formattedValue);
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
            option.value = JSON.stringify(profesor.id); 
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

export function listarEnTabla<T extends object>(key: string, containerElement: HTMLElement) {
    const data: T[] = JSON.parse(localStorage.getItem(key) || '[]');

    if (data.length === 0) {
        containerElement.innerHTML = `<p>No hay datos disponibles para ${key}.</p>`;
        return;
    }

    let table = `<table class="table table-striped table-bordered">
        <thead class="thead-dark">
            <tr>${Object.keys(data[0]).map(key => `<th scope="col">${key}</th>`).join('')}</tr>
        </thead>
        <tbody>
            ${data.map((item: T) => 
                `<tr>${Object.values(item).map(value => {
                    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                        return `<td>${(value as any).categoria || 'Objeto sin nombre'}</td>`;
                    } else if (Array.isArray(value)) {
                        return `<td>${value.map(v => `${v.nombre ? v.nombre : ''} ${v.apellido ? v.apellido : ''}`).join(', ')}</td>`;
                    } else {
                        return `<td>${value}</td>`;
                    }
                }).join('')}</tr>`
            ).join('')}
        </tbody>
    </table>`;


    containerElement.innerHTML = table;
}



