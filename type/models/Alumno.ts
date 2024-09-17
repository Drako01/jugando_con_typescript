import { Persona } from "./Persona.js";
import { Curso } from "./Curso.js";

export class Alumno extends Persona {
    matricula: string;
    cursos: Curso[];

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        fechaNac: Date,
        dni: number,
        matricula: string,
        email?: string
    ) {
        super(id, nombre, apellido, fechaNac, dni, "Alumno", email);
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
