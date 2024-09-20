import { Persona } from './Persona.js';
export class Profesor extends Persona {
    constructor(id, nombre, apellido, nacimiento, dni, email) {
        super(id, nombre, apellido, nacimiento, dni, 'Profesor', email);
        this.cursos = [];
    }
    dictarCurso(curso) {
        this.cursos.push(curso);
        curso.asignarProfesor(this);
    }
    mostrarDatos() {
        return `Profesor: ${this.nombre} ${this.apellido}, Edad: ${this.calcularEdad()}`;
    }
}
