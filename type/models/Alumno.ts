import { Persona } from "./Persona.js";
import { Curso } from "./Curso.js";

export class Alumno extends Persona {
    matricula: string;
    cursos: Curso[];

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        nacimiento: Date,
        dni: number,
        matricula: any,
        email?: string
    ) {
        super(id, nombre, apellido, nacimiento, dni, "Alumno", email);
        this.matricula = matricula;
        this.cursos = [];
    }

    inscribirse(curso: Curso) {
        this.cursos.push(curso);
        curso.agregarAlumno(this);  
    }

    mostrarDatos(): string {
        return `Alumno: ${this.nombre} ${this.apellido}, Matrícula: ${this.matricula
            }, Edad: ${this.calcularEdad()}`;
    }
}
