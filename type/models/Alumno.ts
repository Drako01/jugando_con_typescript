import { Persona } from "./Persona.js";
import { Curso } from "./Curso.js";

export class Alumno extends Persona {
    matricula: string;
    cursos: string[];

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        nacimiento: Date,
        dni: number,
        matricula: string,
        email?: string
    ) {
        super(id, nombre, apellido, nacimiento, dni, "Alumno", email);
        this.matricula = matricula;
        this.cursos = [];
    }

    inscribirse(comisiones: string[]) {
        this.cursos = comisiones;  
    }

    mostrarDatos(): string {
        return `Alumno: ${this.nombre} ${this.apellido}, Matrícula: ${this.matricula
            }, Edad: ${this.calcularEdad()}`;
    }
}
