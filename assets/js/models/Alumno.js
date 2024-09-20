import { Persona } from "./Persona.js";
export class Alumno extends Persona {
    constructor(id, nombre, apellido, nacimiento, dni, matricula, email) {
        super(id, nombre, apellido, nacimiento, dni, "Alumno", email);
        this.matricula = matricula;
        this.cursos = [];
    }
    inscribirse(comisiones) {
        this.cursos = comisiones;
    }
    mostrarDatos() {
        return `Alumno: ${this.nombre} ${this.apellido}, Matrícula: ${this.matricula}, Edad: ${this.calcularEdad()}`;
    }
}
