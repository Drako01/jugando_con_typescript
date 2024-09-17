import { Persona } from './Persona.js';

export class Alumno extends Persona {
    matricula: string;

    constructor(id: number, nombre: string, apellido: string, fechaNac: Date, dni: number, matricula: string, email?: string) {
        super(id, nombre, apellido, fechaNac, dni, 'Alumno', email);
        this.matricula = matricula;
    }

    mostrarDatos(): string {
        return `Alumno: ${this.nombre} ${this.apellido}, Matrícula: ${this.matricula}, Edad: ${this.calcularEdad()}`;
    }
}