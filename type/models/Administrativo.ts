import { Persona } from './Persona.js';

export class Administrativo extends Persona {
    area: string;

    constructor(
        id: number, 
        nombre: string, 
        apellido: string, 
        nacimiento: Date, 
        dni: number, 
        area: string, 
        email?: string
    ) {
        super(id, nombre, apellido, nacimiento, dni, 'Administrativo', email);
        this.area = area;
    }

    mostrarDatos(): string {
        return `Administrativo: ${this.nombre} ${this.apellido}, Área: ${this.area}, Edad: ${this.calcularEdad()}`;
    }
}