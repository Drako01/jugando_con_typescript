import { Persona } from './Persona.js';
export class Administrativo extends Persona {
    area;
    constructor(id, nombre, apellido, nacimiento, dni, area, email) {
        super(id, nombre, apellido, nacimiento, dni, 'Administrativo', email);
        this.area = area;
    }
    mostrarDatos() {
        return `Administrativo: ${this.nombre} ${this.apellido}, Área: ${this.area}, Edad: ${this.calcularEdad()}`;
    }
}
//# sourceMappingURL=Administrativo.js.map