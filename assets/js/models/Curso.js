export class Curso {
    constructor(id, nombre, inicio, finalizacion, estado = true, cantidadAlumnos = 0, categoria, profesor, comision) {
        this.id = id;
        this.nombre = nombre;
        this.inicio = inicio;
        this.finalizacion = finalizacion;
        this.estado = estado;
        this.cantidadAlumnos = cantidadAlumnos;
        this.categoria = categoria;
        this.alumnos = [];
        this.profesores = profesor ? [profesor] : [];
        this.comision = comision;
    }
    agregarAlumno(alumno) {
        this.alumnos.push(alumno);
        this.cantidadAlumnos = this.alumnos.length;
    }
    asignarProfesor(profesor) {
        this.profesores.push(profesor);
    }
    mostrarDetalles() {
        return `Curso: ${this.nombre}, Alumnos: ${this.cantidadAlumnos}, Profesores: ${this.profesores.length}`;
    }
}
