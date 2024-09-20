export class Persona {
    constructor(id, nombre, apellido, nacimiento, dni, role, email, direccion, telefono, nacionalidad, estadoCivil, genero, registro, estado = true) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacimiento = nacimiento;
        this.dni = dni;
        this.role = role;
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nacionalidad = nacionalidad;
        this.estadoCivil = estadoCivil;
        this.genero = genero;
        this.registro = registro || new Date();
        this.estado = estado;
    }
    calcularEdad() {
        const hoy = new Date();
        let edad = hoy.getFullYear() - this.nacimiento.getFullYear();
        const mes = hoy.getMonth() - this.nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < this.nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }
}
