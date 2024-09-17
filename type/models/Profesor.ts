import { Persona } from './Persona.js';
import { Curso } from './Curso.js';

export class Profesor extends Persona {
    especialidad: string;
    cursos: Curso[];

    constructor(
        id: number, 
        nombre: string, 
        apellido: string, 
        fechaNac: Date, 
        dni: number, 
        especialidad: string, 
        email?: string
    ) {
        super(id, nombre, apellido, fechaNac, dni, 'Profesor', email);
        this.especialidad = especialidad;
        this.cursos = [];
    }

    dictarCurso(curso: Curso) {
        this.cursos.push(curso);
        curso.asignarProfesor(this); 
    }

    mostrarDatos(): string {
        return `Profesor: ${this.nombre} ${this.apellido}, Especialidad: ${this.especialidad}, Edad: ${this.calcularEdad()}`;
    }
}