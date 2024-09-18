import { Persona } from './Persona.js';
import { Curso } from './Curso.js';

export class Profesor extends Persona {
    cursos: Curso[];

    constructor(
        id: number, 
        nombre: string, 
        apellido: string, 
        fechaNac: Date, 
        dni: number, 
        email?: string
    ) {
        super(id, nombre, apellido, fechaNac, dni, 'Profesor', email);        
        this.cursos = [];
    }

    dictarCurso(curso: Curso) {
        this.cursos.push(curso);
        // curso.asignarProfesor(this); 
    }

    mostrarDatos(): string {
        return `Profesor: ${this.nombre} ${this.apellido}, Edad: ${this.calcularEdad()}`;
    }
}