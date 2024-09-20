import { Curso } from "../models/Curso.js";
export function agregarAlLocalStorage(key, value) {
    const existingData = localStorage.getItem(key);
    let dataArray = JSON.parse(existingData || '[]');
    try {
        dataArray = existingData ? JSON.parse(existingData) : [];
    }
    catch (e) {
        console.error('Error parsing JSON from localStorage:', e);
        dataArray = [];
    }
    if (!Array.isArray(dataArray)) {
        dataArray = [];
    }
    const valorExiste = dataArray.some((item) => item.nombre === value.nombre);
    if (!valorExiste) {
        const formattedValue = Object.assign(Object.assign({}, value), { nacimiento: value.nacimiento instanceof Date ? value.nacimiento.toISOString().split('T')[0] : value.nacimiento, registro: value.registro instanceof Date ? value.registro.toISOString().split('T')[0] : value.registro });
        dataArray.push(formattedValue);
        localStorage.setItem(key, JSON.stringify(dataArray));
    }
    else {
        console.log(`El elemento con el nombre "${value.nombre}" ya existe y no será agregado.`);
    }
}
export function cargarCategoriasDesdeLS() {
    const categoriasAlmacenadas = JSON.parse(localStorage.getItem("Categorias") || '[]');
    const selectCategorias = document.getElementById('categoriaCurso');
    selectCategorias.innerHTML = '';
    if (categoriasAlmacenadas) {
        categoriasAlmacenadas.forEach((categoria) => {
            const option = document.createElement('option');
            option.value = categoria.categoria;
            option.text = categoria.categoria;
            selectCategorias.appendChild(option);
        });
    }
}
export function cargarCursosDesdeLS() {
    const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]');
    const selectCursos = document.getElementById('cursosAlumno');
    selectCursos.innerHTML = '<option value="" disabled>Seleccione 1 o más Cursos</option>';
    if (cursosAlmacenados) {
        cursosAlmacenados.forEach((curso) => {
            const option = document.createElement('option');
            option.value = curso.comision;
            option.text = `${curso.nombre} - Comisión: ${curso.comision}`;
            selectCursos.appendChild(option);
        });
    }
}
export function actualizarCantidadAlumnosPorCurso() {
    const alumnosAlmacenados = JSON.parse(localStorage.getItem("Alumnos") || '[]');
    const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]').map((cursoData) => new Curso(cursoData.id, cursoData.nombre, cursoData.inicio, cursoData.finalizacion, cursoData.estado, cursoData.cantidadAlumnos, cursoData.categoria, cursoData.profesores.length > 0 ? cursoData.profesores[0] : undefined, cursoData.comision));
    cursosAlmacenados.forEach(curso => {
        curso.cantidadAlumnos = 0;
        curso.alumnos = [];
    });
    alumnosAlmacenados.forEach(alumno => {
        alumno.cursos.forEach(comision => {
            const curso = cursosAlmacenados.find(curso => curso.comision.toString() === comision.toString());
            if (curso) {
                curso.agregarAlumno(alumno);
            }
        });
    });
    localStorage.setItem("Cursos", JSON.stringify(cursosAlmacenados));
}
export function cargarCursosLS() {
    const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]');
    // Convertir cada objeto recuperado del localStorage a una instancia de Curso
    return cursosAlmacenados.map((curso) => new Curso(curso.id, curso.nombre, curso.inicio, curso.finalizacion, curso.estado, curso.cantidadAlumnos, curso.categoria, curso.profesores ? curso.profesores[0] : undefined, curso.comision));
}
export function actualizarCursosConAlumnos(cursosSeleccionados) {
    const cursosAlmacenados = JSON.parse(localStorage.getItem("Cursos") || '[]');
    cursosSeleccionados.forEach(comisionSeleccionada => {
        // Agregar el tipo explícito 'Curso' para 'curso'
        const curso = cursosAlmacenados.find((curso) => curso.comision === comisionSeleccionada);
        if (curso) {
            curso.cantidadAlumnos = (curso.cantidadAlumnos || 0) + 1; // Incrementa la cantidad de alumnos
        }
    });
    localStorage.setItem("Cursos", JSON.stringify(cursosAlmacenados)); // Guardar los cursos actualizados
}
export function cargarProfesoresDesdeLS() {
    const profesoresAlmacenados = JSON.parse(localStorage.getItem("Profesores") || '[]');
    const selectProfesores = document.getElementById('profesorCurso');
    selectProfesores.innerHTML = '<option value="">--Selecciona un Profesor--</option>';
    if (profesoresAlmacenados) {
        const profesoresActivos = profesoresAlmacenados.filter((profesor) => profesor.estado === true);
        profesoresActivos.forEach((profesor) => {
            const option = document.createElement('option');
            option.value = JSON.stringify(profesor.id);
            option.text = `${profesor.nombre} ${profesor.apellido}`;
            selectProfesores.appendChild(option);
        });
    }
}
export function generarMatricula(nombre, apellido, alumnosAlmacenados) {
    const iniciales = nombre.charAt(0).toUpperCase() + apellido.charAt(0).toUpperCase();
    let matricula;
    let matriculaExiste;
    do {
        const numeroAleatorio = ('000' + Math.floor(Math.random() * 100 + 1)).slice(-3);
        matricula = `${iniciales}${numeroAleatorio}`;
        matriculaExiste = alumnosAlmacenados.some((alumno) => alumno.matricula === matricula);
    } while (matriculaExiste);
    return matricula;
}
export function generarComision(cursosAlmacenados) {
    const ultimoCurso = cursosAlmacenados[cursosAlmacenados.length - 1];
    const comisionAleatoria = Math.floor(Math.random() * 1000 + 1000) + 1;
    return ultimoCurso ? ultimoCurso.id + comisionAleatoria : comisionAleatoria;
}
export function listarEnTabla(key, containerElement) {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (data.length === 0) {
        containerElement.innerHTML = `<p>No hay datos disponibles para ${key}.</p>`;
        return;
    }
    // Filtramos las claves, excluyendo siempre la clave 'role'
    const filteredKeys = Object.keys(data[0]).filter(keyName => keyName !== 'role' &&
        !(key === 'Cursos' && keyName === 'alumnos'));
    let table = `
    <h2>Tabla de ${key}</h2>
    <table class="table table-striped table-bordered">
        <thead class="thead-dark">
            <tr class='table-tittle'>
                ${filteredKeys.map(keyName => `<th scope="col">${keyName.toUpperCase()}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${data.map((item, index) => `<tr>${Object.entries(item)
        // Filtramos la clave 'role' para que no aparezca en el tbody
        .filter(([keyName]) => keyName !== 'role')
        .map(([keyName, value], valueIndex) => {
        if (key === 'Cursos' && keyName === 'alumnos') {
            return '';
        }
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            if (value.hasOwnProperty('comision')) {
                return `<td>${value.comision}</td>`;
            }
            return `<td>${value.categoria || ''}</td>`;
        }
        else if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object') {
                if (value[0].hasOwnProperty('nombre') && value[0].hasOwnProperty('apellido')) {
                    return `<td>${value.map(v => `${v.nombre ? v.nombre : ''} ${v.apellido ? v.apellido : ''}`).join(', ')}</td>`;
                }
                else if (value[0].hasOwnProperty('comision')) {
                    return `<td>${value.map(v => v.comision).join(', ')}</td>`;
                }
            }
            return `<td>${value}</td>`;
        }
        else if (typeof value === 'boolean') {
            return `<td> 
                            <input type="checkbox" ${value ? 'checked' : ''} 
                                onchange="actualizarEstado('${key}', ${index}, ${valueIndex}, 
                                this.checked, document.getElementById('${containerElement.id}'))"> 
                            <span style="color: ${value ? 'green' : 'red'};">
                                ${value ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>`;
        }
        else {
            return key === 'Categorias' && keyName === 'categoria'
                ? `<td class='td-categoria'>${value}</td>`
                : `<td>${value}</td>`;
        }
    }).join('')}</tr>`).join('')}
        </tbody>
    </table>`;
    containerElement.innerHTML = table;
}
window.actualizarEstado = function actualizarEstado(key, itemIndex, valueIndex, nuevoEstado, containerElement) {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (data[itemIndex]) {
        const keys = Object.keys(data[itemIndex]);
        const keyToUpdate = keys[valueIndex];
        data[itemIndex][keyToUpdate] = nuevoEstado;
        localStorage.setItem(key, JSON.stringify(data));
    }
    listarEnTabla(key, containerElement);
};
