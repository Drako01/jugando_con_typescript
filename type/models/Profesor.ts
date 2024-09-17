import { Persona } from './Persona.js';

export class Profesor extends Persona {
    especialidad: string;

    constructor(id: number, nombre: string, apellido: string, fechaNac: Date, dni: number, especialidad: string, email?: string) {
        super(id, nombre, apellido, fechaNac, dni, 'Profesor', email);
        this.especialidad = especialidad;
    }

    mostrarDatos(): string {
        return `Profesor: ${this.nombre} ${this.apellido}, Especialidad: ${this.especialidad}, Edad: ${this.calcularEdad()}`;
    }
}